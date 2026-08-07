import { NextResponse } from "next/server";

import { verifyResetOtpSchema } from "@/db/validation/password-reset";
import {
  PasswordResetError,
  verifyPasswordResetOtp,
} from "@/server/services/auth/verify-password-reset-otp";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    const result = verifyResetOtpSchema.safeParse(body);

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

    const data = await verifyPasswordResetOtp({
      email: result.data.email,
      otp: result.data.otp,
    });

    return NextResponse.json(
      {
        success: true,
        message: "The verification code is valid.",
        data,
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

    console.error("Verify reset OTP error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to verify the code.",
      },
      {
        status: 500,
      },
    );
  }
}
