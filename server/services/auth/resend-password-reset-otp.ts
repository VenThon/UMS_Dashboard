import { db } from "@/db";
import { passwordResetRequests } from "@/db/schema/password-reset";
import { usersTable } from "@/db/schema/users";
import { PASSWORD_RESET_CONFIG } from "@/lib/auth/password-reset-constants";
import {
  addMinutes,
  generateOtp,
  hashResetValue,
} from "@/lib/auth/password-reset-utils";
import { sendPasswordResetOtp } from "@/lib/email/send-password-reset-otp";

import { and, desc, eq, isNull } from "drizzle-orm";

import { PasswordResetError } from "./verify-password-reset-otp";

type ResendPasswordResetOtpParams = {
  email: string;
};

export async function resendPasswordResetOtp({
  email,
}: ResendPasswordResetOtpParams) {
  const normalizedEmail = email.trim().toLowerCase();
  const now = new Date();

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, normalizedEmail),
    columns: {
      id: true,
      email: true,
    },
  });

  if (!user) {
    return;
  }

  const resetRequest = await db.query.passwordResetRequests.findFirst({
    where: and(
      eq(passwordResetRequests.userId, user.id),
      isNull(passwordResetRequests.usedAt),
    ),
    orderBy: [desc(passwordResetRequests.createdAt)],
  });

  if (!resetRequest) {
    throw new PasswordResetError(
      "Please start a new password reset request.",
      400,
    );
  }

  if (resetRequest.verifiedAt) {
    throw new PasswordResetError("The code has already been verified.", 400);
  }

  if (resetRequest.resendCount >= PASSWORD_RESET_CONFIG.MAX_RESEND_COUNT) {
    throw new PasswordResetError(
      "You have requested too many verification codes.",
      429,
    );
  }

  const nextAllowedSendTime =
    resetRequest.lastSentAt.getTime() +
    PASSWORD_RESET_CONFIG.RESEND_COOLDOWN_SECONDS * 1000;

  if (now.getTime() < nextAllowedSendTime) {
    const remainingSeconds = Math.ceil(
      (nextAllowedSendTime - now.getTime()) / 1000,
    );

    throw new PasswordResetError(
      `Please wait ${remainingSeconds} seconds before requesting another code.`,
      429,
    );
  }

  const otp = generateOtp();

  await db
    .update(passwordResetRequests)
    .set({
      otpHash: hashResetValue(otp),
      otpExpiresAt: addMinutes(
        now,
        PASSWORD_RESET_CONFIG.OTP_EXPIRATION_MINUTES,
      ),
      failedAttempts: 0,
      resendCount: resetRequest.resendCount + 1,
      lastSentAt: now,
      updatedAt: now,
    })
    .where(eq(passwordResetRequests.id, resetRequest.id));

  await sendPasswordResetOtp({
    to: user.email,
    otp,
  });
}
