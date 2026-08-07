import { db } from "@/db";
import { usersTable } from "@/db/schema/index";
import { passwordResetRequests } from "@/db/schema/password-reset";
import { PASSWORD_RESET_CONFIG } from "@/lib/auth/password-reset-constants";
import {
  addMinutes,
  generateOtp,
  hashResetValue,
} from "@/lib/auth/password-reset-utils";
import { sendPasswordResetOtp } from "@/lib/email/send-password-reset-otp";

import { and, eq, isNull } from "drizzle-orm";

type RequestPasswordResetParams = {
  email: string;
};

export async function requestPasswordReset({
  email,
}: RequestPasswordResetParams) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, normalizedEmail),
    columns: {
      id: true,
      email: true,
    },
  });

  /*
   * Do not tell the client whether the email exists.
   * This protects against email enumeration attacks.
   */
  if (!user) {
    return;
  }

  const now = new Date();
  const otp = generateOtp();
  const otpHash = hashResetValue(otp);

  await db.transaction(async (tx) => {
    // Invalidate previous active reset requests.
    await tx
      .update(passwordResetRequests)
      .set({
        usedAt: now,
        updatedAt: now,
      })
      .where(
        and(
          eq(passwordResetRequests.userId, user.id),
          isNull(passwordResetRequests.usedAt),
        ),
      );

    await tx.insert(passwordResetRequests).values({
      userId: user.id,
      email: normalizedEmail,
      otpHash,
      otpExpiresAt: addMinutes(
        now,
        PASSWORD_RESET_CONFIG.OTP_EXPIRATION_MINUTES,
      ),
      failedAttempts: 0,
      resendCount: 0,
      lastSentAt: now,
      createdAt: now,
      updatedAt: now,
    });
  });

  await sendPasswordResetOtp({
    to: user.email,
    otp,
  });
}
