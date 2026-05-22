import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { generateAccessToken } from "@/lib/auth/jwt";
import { logInSchema } from "@/db/validation/auth";
import { UserRole } from "@/db/types/user.type";

export async function POST(req: Request) {
  try {
    const body = await req.json();
  console.log("Error from Body",body)
    const parsed = logInSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.username, parsed.data.username),
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 },
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { error: "User is inactive" },
        { status: 403 },
      );
    }

    const isValidPassword = await bcrypt.compare(
      parsed.data.password,
      user.password,
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 },
      );
    }

    const token = generateAccessToken({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role as UserRole,
    });

    const res = NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}