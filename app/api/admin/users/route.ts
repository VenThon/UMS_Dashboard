import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { requireRole } from "@/lib/auth/require-role";
import { USER_ROLE } from "@/db/types/user.type";
import { createUserSchema } from "@/db/validation/users";

export async function GET() {
  const { error } = await requireRole([USER_ROLE.ADMIN]);

  if (error) return error;

  const users = await db.query.usersTable.findMany({
    columns: {
      password: false,
    },
  });

  return NextResponse.json({
    message: "Users fetched successfully",
    data: users,
  });
}

export async function POST(req: Request) {
  const { error } = await requireRole([USER_ROLE.ADMIN]);

  if (error) return error;

  const body = await req.json();

  const parsed = createUserSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 12);

  const newUser = await db
    .insert(usersTable)
    .values({
      username: parsed.data.username,
      email: parsed.data.email,
      password: hashedPassword,
      role: parsed.data.role,
      team: parsed.data.team,
      phoneNumber:parsed.data.phoneNumber,
      isActive: true,
    })
    .returning({
      id: usersTable.id,
      username: usersTable.username,
      email: usersTable.email,
      role: usersTable.role,
      team: usersTable.team,
      phoneNumber: usersTable.phoneNumber,
      isActive: usersTable.isActive,
    });

  return NextResponse.json({
    message: "User created successfully",
    data: newUser[0],
  });
}