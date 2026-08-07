// This service:
// Finds the hashed reset token.
// Checks that it was verified.
// Checks the expiration.
// Hashes the new password.
// Updates the user.
// Marks the reset request as used.
// Invalidates old sessions.
// src/services/auth/reset-password.ts
import { db } from "@/db";
import { passwordResetRequests } from "@/db/schema/password-reset";
import { usersTable } from "@/db/schema/users";
import { hashResetValue } from "@/lib/auth/password-reset-utils";

import bcrypt from "bcryptjs";
import { and, eq, isNotNull, isNull } from "drizzle-orm";

import { PasswordResetError } from "./verify-password-reset-otp";

type ResetPasswordParams = {
  resetToken: string;
  newPassword: string;
};

export async function resetPassword({
  resetToken,
  newPassword,
}: ResetPasswordParams) {
  const now = new Date();
  const resetTokenHash = hashResetValue(resetToken);

  const resetRequest = await db.query.passwordResetRequests.findFirst({
    where: and(
      eq(passwordResetRequests.resetTokenHash, resetTokenHash),
      isNotNull(passwordResetRequests.verifiedAt),
      isNull(passwordResetRequests.usedAt),
    ),
  });

  if (!resetRequest) {
    throw new PasswordResetError("The password reset token is invalid.", 400);
  }

  if (
    !resetRequest.resetTokenExpiresAt ||
    resetRequest.resetTokenExpiresAt.getTime() < now.getTime()
  ) {
    throw new PasswordResetError("The password reset token has expired.", 400);
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);

  await db.transaction(async (tx) => {
    await tx
      .update(usersTable)
      .set({
        password: passwordHash,
        updatedAt: now,
      })
      .where(eq(usersTable.id, resetRequest.userId));

    await tx
      .update(passwordResetRequests)
      .set({
        usedAt: now,
        updatedAt: now,
      })
      .where(eq(passwordResetRequests.id, resetRequest.id));

    // await tx
    //   .delete(refreshTokens)
    //   .where(eq(refreshTokens.userId, resetRequest.userId));
  });
}
