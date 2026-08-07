import { NextResponse } from "next/server";

import { resetPasswordSchema } from "@/db/validation/password-reset";
import { resetPassword } from "@/server/services/auth/reset-password";
import { PasswordResetError } from "@/server/services/auth/verify-password-reset-otp";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    const result = resetPasswordSchema.safeParse(body);

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

    await resetPassword({
      resetToken: result.data.resetToken,
      newPassword: result.data.newPassword,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your password has been reset successfully.",
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

    console.error("Reset password error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to reset the password.",
      },
      {
        status: 500,
      },
    );
  }
}
