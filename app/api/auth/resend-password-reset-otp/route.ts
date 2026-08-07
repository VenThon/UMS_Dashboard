import { NextResponse } from "next/server";

import { resendResetOtpSchema } from "@/db/validation/password-reset";
import { resendPasswordResetOtp } from "@/server/services/auth/resend-password-reset-otp";
import { PasswordResetError } from "@/server/services/auth/verify-password-reset-otp";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    const result = resendResetOtpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data.",
          errors: result.error.flatten().fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    await resendPasswordResetOtp({
      email: result.data.email,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "If the account exists, a new verification code has been sent.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    if (error instanceof PasswordResetError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: error.statusCode,
        },
      );
    }

    console.error("Resend reset OTP error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to resend the verification code.",
      },
      {
        status: 500,
      },
    );
  }
}
