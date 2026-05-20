// src/app/api/auth/login/route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { generateAccessToken } from "@/lib/auth/jwt";
import { logInSchema } from "@/db/validation/auth";

export async function POST(req: Request) {
  const body = await req.json();

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
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  if (!user.isActive) {
    return NextResponse.json({ error: "User is inactive" }, { status: 403 });
  }

  const isValidPassword = await bcrypt.compare(
    parsed.data.password,
    user.password,
  );

  if (!isValidPassword) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = generateAccessToken({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role as any,
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
    path: "/",
    maxAge: 60 * 60,
  });

  return res;
}