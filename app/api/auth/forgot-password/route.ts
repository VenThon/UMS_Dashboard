import { NextResponse } from "next/server";

import { forgotPasswordSchema } from "@/db/validation/password-reset";
import { requestPasswordReset } from "@/server/services/auth/request-password-reset";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    const result = forgotPasswordSchema.safeParse(body);

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

    await requestPasswordReset({
      email: result.data.email,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "If an account exists with this email, a verification code has been sent.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Forgot password error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to process the password reset request.",
      },
      {
        status: 500,
      },
    );
  }
}
