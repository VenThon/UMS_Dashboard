// src/lib/auth/password-reset.ts

import crypto from "node:crypto";

const OTP_LENGTH = 6;

export const OTP_EXPIRATION_MINUTES = 10;
export const OTP_RESEND_COOLDOWN_SECONDS = 60;
export const OTP_MAX_ATTEMPTS = 5;

export const RESET_TOKEN_EXPIRATION_MINUTES = 15;

export function generateOtp() {
  const min = 10 ** (OTP_LENGTH - 1);
  const max = 10 ** OTP_LENGTH;

  return crypto.randomInt(min, max).toString();
}

export function hashOtp(userId: string, otp: string) {
  const secret = process.env.PASSWORD_RESET_SECRET;

  if (!secret) {
    throw new Error("PASSWORD_RESET_SECRET is not configured");
  }

  return crypto
    .createHmac("sha256", secret)
    .update(`${userId}:${otp}`)
    .digest("hex");
}

export function verifyOtp(userId: string, otp: string, storedHash: string) {
  const hash = hashOtp(userId, otp);

  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(storedHash));
}

export function generateResetToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function hashResetToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
