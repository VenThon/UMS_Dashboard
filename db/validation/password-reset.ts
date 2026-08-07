import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .transform((email) => email.toLowerCase()),
});

export const verifyResetOtpSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .transform((email) => email.toLowerCase()),

  otp: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "The OTP must contain exactly six digits."),
});

export const resendResetOtpSchema = forgotPasswordSchema;

export const resetPasswordSchema = z
  .object({
    resetToken: z.string().min(32, "The reset token is invalid."),

    newPassword: z
      .string()
      .min(8, "The password must contain at least 8 characters.")
      .max(72, "The password must not exceed 72 characters.")
      .regex(/[A-Z]/, "The password must contain an uppercase letter.")
      .regex(/[a-z]/, "The password must contain a lowercase letter.")
      .regex(/[0-9]/, "The password must contain a number."),

    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "The passwords do not match.",
    path: ["confirmPassword"],
  });

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export type VerifyResetOtpInput = z.infer<typeof verifyResetOtpSchema>;

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
