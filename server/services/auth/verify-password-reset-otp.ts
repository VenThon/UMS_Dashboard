import { db } from "@/db";
import { passwordResetRequests } from "@/db/schema/password-reset";
import { PASSWORD_RESET_CONFIG } from "@/lib/auth/password-reset-constants";
import {
  addMinutes,
  compareResetValue,
  generateResetToken,
  hashResetValue,
} from "@/lib/auth/password-reset-utils";

import { and, desc, eq, isNull } from "drizzle-orm";

type VerifyPasswordResetOtpParams = {
  email: string;
  otp: string;
};

export class PasswordResetError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = "PasswordResetError";
  }
}

export async function verifyPasswordResetOtp({
  email,
  otp,
}: VerifyPasswordResetOtpParams) {
  const normalizedEmail = email.trim().toLowerCase();
  const now = new Date();

  const resetRequest = await db.query.passwordResetRequests.findFirst({
    where: and(
      eq(passwordResetRequests.email, normalizedEmail),
      isNull(passwordResetRequests.usedAt),
    ),
    orderBy: [desc(passwordResetRequests.createdAt)],
  });

  if (!resetRequest) {
    throw new PasswordResetError(
      "The verification request is invalid or has expired.",
      400,
    );
  }

  if (resetRequest.verifiedAt) {
    throw new PasswordResetError(
      "This verification code has already been used.",
      400,
    );
  }

  if (
    resetRequest.failedAttempts >= PASSWORD_RESET_CONFIG.MAX_FAILED_ATTEMPTS
  ) {
    throw new PasswordResetError(
      "Too many failed attempts. Please request a new code.",
      429,
    );
  }

  if (resetRequest.otpExpiresAt.getTime() < now.getTime()) {
    throw new PasswordResetError("The verification code has expired.", 400);
  }

  const isOtpValid = compareResetValue(otp, resetRequest.otpHash);

  if (!isOtpValid) {
    await db
      .update(passwordResetRequests)
      .set({
        failedAttempts: resetRequest.failedAttempts + 1,
        updatedAt: now,
      })
      .where(eq(passwordResetRequests.id, resetRequest.id));

    throw new PasswordResetError("The verification code is incorrect.", 400);
  }

  const resetToken = generateResetToken();

  await db
    .update(passwordResetRequests)
    .set({
      verifiedAt: now,
      resetTokenHash: hashResetValue(resetToken),
      resetTokenExpiresAt: addMinutes(
        now,
        PASSWORD_RESET_CONFIG.RESET_TOKEN_EXPIRATION_MINUTES,
      ),
      updatedAt: now,
    })
    .where(eq(passwordResetRequests.id, resetRequest.id));

  return {
    resetToken,
    expiresInMinutes: PASSWORD_RESET_CONFIG.RESET_TOKEN_EXPIRATION_MINUTES,
  };
}
