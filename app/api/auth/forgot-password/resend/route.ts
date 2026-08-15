// src/app/api/auth/forgot-password/resend/route.ts

import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/db";
import { passwordResetRequests } from "@/db/schema/password-reset";

import {
  generateOtp,
  hashOtp,
  OTP_EXPIRATION_MINUTES,
  OTP_RESEND_COOLDOWN_SECONDS,
} from "@/lib/auth/password-reset";

import { sendPasswordResetOtp } from "@/lib/mail";
import { usersTable } from "@/db/schema";

const schema = z.object({
  requestId: z.string().uuid(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Invalid password reset request.",
        },
        {
          status: 400,
        },
      );
    }

    const resetRequest = await db.query.passwordResetRequests.findFirst({
      where: eq(passwordResetRequests.id, result.data.requestId),
    });

    if (!resetRequest || resetRequest.usedAt || resetRequest.verifiedAt) {
      return NextResponse.json(
        {
          message: "Invalid password reset request.",
        },
        {
          status: 400,
        },
      );
    }

    const now = new Date();

    if (resetRequest.resendAvailableAt > now) {
      const remainingSeconds = Math.ceil(
        (resetRequest.resendAvailableAt.getTime() - now.getTime()) / 1000,
      );

      return NextResponse.json(
        {
          message: `Please wait ${remainingSeconds} seconds before requesting another code.`,
          retryAfter: remainingSeconds,
        },
        {
          status: 429,
        },
      );
    }

    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, resetRequest.userId),
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid password reset request.",
        },
        {
          status: 400,
        },
      );
    }

    const otp = generateOtp();

    const expiresAt = new Date(
      now.getTime() + OTP_EXPIRATION_MINUTES * 60 * 1000,
    );

    const resendAvailableAt = new Date(
      now.getTime() + OTP_RESEND_COOLDOWN_SECONDS * 1000,
    );

    await db
      .update(passwordResetRequests)
      .set({
        otpHash: hashOtp(user.id, otp),

        // Reset failed attempts after issuing a new OTP
        attempts: 0,

        expiresAt,
        resendAvailableAt,
        updatedAt: now,
      })
      .where(eq(passwordResetRequests.id, resetRequest.id));

    await sendPasswordResetOtp({
      email: user.email,
      otp,
    });

    return NextResponse.json({
      message: "A new verification code has been sent.",
      cooldownSeconds: OTP_RESEND_COOLDOWN_SECONDS,
    });
  } catch (error) {
    console.error("Resend OTP error:", error);

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
