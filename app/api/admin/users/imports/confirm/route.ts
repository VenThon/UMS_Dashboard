import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { USER_ROLE } from "@/db/types/user.type";
import { importUserSchema } from "@/db/validation/users";
import { requireRole } from "@/lib/auth/require-role";

import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const { error } = await requireRole([USER_ROLE.ADMIN]);

  if (error) return error;

  const body = await request.json();

  const rows = body.rows;

  if (!Array.isArray(rows)) {
    return NextResponse.json({ message: "Rows are required" }, { status: 400 });
  }

  const usersToCreate = [];

  for (const row of rows) {
    const parsed = importUserSchema.safeParse(row);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid user data" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(parsed.data.password, 12);

    usersToCreate.push({
      username: parsed.data.username,
      email: parsed.data.email,
      password: hashedPassword,
      role: parsed.data.role,
      team: parsed.data.team,
      phoneNumber: parsed.data.phoneNumber,
    });
  }

  await db.insert(usersTable).values(usersToCreate);

  return NextResponse.json({
    message: "Users imported successfully",
    totalCreated: usersToCreate.length,
  });
}
