// src/app/api/auth/forgot-password/verify/route.ts

import { and, eq, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/db";
import {
  passwordResetRequests,
  passwordResetTokens,
} from "@/db/schema/password-reset";

import {
  generateResetToken,
  hashResetToken,
  OTP_MAX_ATTEMPTS,
  RESET_TOKEN_EXPIRATION_MINUTES,
  verifyOtp,
} from "@/lib/auth/password-reset";

const schema = z.object({
  requestId: z.string().uuid(),

  otp: z.string().regex(/^\d{6}$/, "OTP must contain exactly six digits."),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message:
            result.error.issues[0]?.message ?? "Invalid verification code.",
        },
        {
          status: 400,
        },
      );
    }

    const { requestId, otp } = result.data;

    const resetRequest = await db.query.passwordResetRequests.findFirst({
      where: and(
        eq(passwordResetRequests.id, requestId),
        isNull(passwordResetRequests.usedAt),
      ),
    });

    if (!resetRequest) {
      return NextResponse.json(
        {
          message: "The verification request is invalid or has expired.",
        },
        {
          status: 400,
        },
      );
    }

    if (resetRequest.verifiedAt) {
      return NextResponse.json(
        {
          message: "This code has already been verified.",
        },
        {
          status: 400,
        },
      );
    }

    if (resetRequest.expiresAt < new Date()) {
      return NextResponse.json(
        {
          message:
            "The verification code has expired. Please request a new code.",
        },
        {
          status: 400,
        },
      );
    }

    if (resetRequest.attempts >= OTP_MAX_ATTEMPTS) {
      return NextResponse.json(
        {
          message: "Too many failed attempts. Please request a new code.",
        },
        {
          status: 429,
        },
      );
    }

    const valid = verifyOtp(resetRequest.userId, otp, resetRequest.otpHash);

    if (!valid) {
      const attempts = resetRequest.attempts + 1;

      await db
        .update(passwordResetRequests)
        .set({
          attempts,
          updatedAt: new Date(),
        })
        .where(eq(passwordResetRequests.id, resetRequest.id));

      const remaining = Math.max(OTP_MAX_ATTEMPTS - attempts, 0);

      return NextResponse.json(
        {
          message: `Invalid verification code. ${remaining} attempt(s) remaining.`,
        },
        {
          status: 400,
        },
      );
    }

    const now = new Date();

    await db
      .update(passwordResetRequests)
      .set({
        verifiedAt: now,
        updatedAt: now,
      })
      .where(eq(passwordResetRequests.id, resetRequest.id));

    const resetToken = generateResetToken();

    const tokenHash = hashResetToken(resetToken);

    const tokenExpiresAt = new Date(
      now.getTime() + RESET_TOKEN_EXPIRATION_MINUTES * 60 * 1000,
    );

    await db.insert(passwordResetTokens).values({
      userId: resetRequest.userId,
      requestId: resetRequest.id,
      tokenHash,
      expiresAt: tokenExpiresAt,
    });

    return NextResponse.json({
      message: "Verification successful.",
      resetToken,
    });
  } catch (error) {
    console.error("OTP verification error:", error);

    return NextResponse.json(
      {
        message: "Something went wrong. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}
