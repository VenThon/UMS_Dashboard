import { NextResponse } from "next/server";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { UserRole } from "@/db/types/user.type";
import { logInSchema } from "@/db/validation/auth";
import { generateAccessToken } from "@/lib/auth/jwt";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = logInSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          error: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { username, password } = parsed.data;

    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.username, username),
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 },
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { message: "User is inactive" },
        { status: 403 },
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 },
      );
    }

    const token = generateAccessToken({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role as UserRole,
    });

    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 },
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
