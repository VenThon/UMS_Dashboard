// Create security helper functions
import crypto from "crypto";

export function generateOtp(): string {
  return crypto.randomInt(100000, 1000000).toString();
}

export function generateResetToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function hashResetValue(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function compareResetValue(value: string, hashedValue: string): boolean {
  const incomingHash = hashResetValue(value);

  const incomingBuffer = Buffer.from(incomingHash, "hex");
  const storedBuffer = Buffer.from(hashedValue, "hex");

  if (incomingBuffer.length !== storedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(incomingBuffer, storedBuffer);
}

export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

export function addSeconds(date: Date, seconds: number): Date {
  return new Date(date.getTime() + seconds * 1000);
}
