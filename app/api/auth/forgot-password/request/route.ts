// src/app/api/auth/forgot-password/request/route.ts

import crypto from "node:crypto";

import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { passwordResetRequests } from "@/db/schema/password-reset";

import {
  generateOtp,
  hashOtp,
  OTP_EXPIRATION_MINUTES,
  OTP_RESEND_COOLDOWN_SECONDS,
} from "@/lib/auth/password-reset";

import { sendPasswordResetOtp } from "@/lib/mail";

const schema = z.object({
  email: z.string().trim().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    const email = result.data.email.toLowerCase();

    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });

    // Don't expose whether the email exists.
    if (!user) {
      return NextResponse.json({
        message:
          "If this email is registered, a verification code has been sent.",
        requestId: crypto.randomUUID(),
      });
    }

    // 1. Generate OTP
    const otp = generateOtp();

    // 2. Hash OTP before saving it
    const otpHash = hashOtp(user.id, otp);

    const now = new Date();

    // OTP expires in 10 minutes
    const expiresAt = new Date(
      now.getTime() + OTP_EXPIRATION_MINUTES * 60 * 1000,
    );

    // User must wait before requesting another OTP
    const resendAvailableAt = new Date(
      now.getTime() + OTP_RESEND_COOLDOWN_SECONDS * 1000,
    );

    // 3. Store the hashed OTP
    const [resetRequest] = await db
      .insert(passwordResetRequests)
      .values({
        userId: user.id,
        otpHash,
        expiresAt,
        resendAvailableAt,
      })
      .returning({
        id: passwordResetRequests.id,
      });

    // 4. Development: show OTP in terminal
    if (process.env.NODE_ENV === "development") {
      console.log("");
      console.log("====================================");
      console.log("PASSWORD RESET - DEVELOPMENT");
      console.log("Email:", user.email);
      console.log("OTP:", otp);
      console.log("Expires:", expiresAt);
      console.log("Request ID:", resetRequest.id);
      console.log("====================================");
      console.log("");
    } else {
      // Production: send OTP by email
      await sendPasswordResetOtp({
        email: user.email,
        otp,
      });
    }

    // 5. Return request ID to the frontend
    return NextResponse.json({
      message:
        "If this email is registered, a verification code has been sent.",

      requestId: resetRequest.id,
    });
  } catch (error) {
    console.error("Request password reset error:", error);

    return NextResponse.json(
      {
        message: "Something went wrong. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}
