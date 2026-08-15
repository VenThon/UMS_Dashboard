// src/app/api/auth/forgot-password/reset/route.ts

import bcrypt from "bcryptjs";
import { and, eq, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/db";

import {
  passwordResetRequests,
  passwordResetTokens,
} from "@/db/schema/password-reset";

import { hashResetToken } from "@/lib/auth/password-reset";
import { usersTable } from "@/db/schema";

const passwordSchema = z
  .string()
  .min(8, "Password must contain at least 8 characters.")
  .regex(/[a-z]/, "Password must contain a lowercase letter.")
  .regex(/[A-Z]/, "Password must contain an uppercase letter.")
  .regex(/\d/, "Password must contain a number.")
  .regex(/[^A-Za-z0-9]/, "Password must contain a special character.");

const schema = z
  .object({
    resetToken: z.string().min(1),

    password: passwordSchema,

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: result.error.issues[0]?.message ?? "Invalid password.",
        },
        {
          status: 400,
        },
      );
    }

    const { resetToken, password } = result.data;

    const tokenHash = hashResetToken(resetToken);

    const resetTokenRecord = await db.query.passwordResetTokens.findFirst({
      where: and(
        eq(passwordResetTokens.tokenHash, tokenHash),
        isNull(passwordResetTokens.usedAt),
      ),
    });

    if (!resetTokenRecord) {
      return NextResponse.json(
        {
          message: "The password reset session is invalid or has expired.",
        },
        {
          status: 400,
        },
      );
    }

    if (resetTokenRecord.expiresAt < new Date()) {
      return NextResponse.json(
        {
          message:
            "The password reset session has expired. Please start again.",
        },
        {
          status: 400,
        },
      );
    }

    const resetRequest = await db.query.passwordResetRequests.findFirst({
      where: eq(passwordResetRequests.id, resetTokenRecord.requestId),
    });

    if (!resetRequest?.verifiedAt) {
      return NextResponse.json(
        {
          message: "OTP verification is required.",
        },
        {
          status: 400,
        },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const now = new Date();

    await db.transaction(async (tx) => {
      /*
       * Update password
       */
      await tx
        .update(usersTable)
        .set({
          password: passwordHash,
          updatedAt: now,
        })
        .where(eq(usersTable.id, resetTokenRecord.userId));
      /*
       * Invalidate reset token
       */
      await tx
        .update(passwordResetTokens)
        .set({
          usedAt: now,
        })
        .where(eq(passwordResetTokens.id, resetTokenRecord.id));

      /*
       * Invalidate OTP request
       */
      await tx
        .update(passwordResetRequests)
        .set({
          usedAt: now,
          updatedAt: now,
        })
        .where(eq(passwordResetRequests.id, resetRequest.id));

      /*
       * Revoke all refresh tokens/sessions
       *
       * Change this part according to your auth implementation.
       */
    });

    return NextResponse.json({
      message: "Your password has been reset successfully.",
    });
  } catch (error) {
    console.error("Reset password error:", error);

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
