// src/app/api/admin/users/[id]/route.ts

import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
// import { USER_ROLE } from "@/constants/role";
import { requireRole } from "@/lib/auth/require-role";
import { USER_ROLE } from "@/db/types/user.type";
import { updateUserSchema } from "@/db/validation/users";
// import { updateUserSchema } from "@/lib/validation/user";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireRole([USER_ROLE.ADMIN]);

  if (error) return error;

  const { id } = await params;
  const body = await req.json();

  const parsed = updateUserSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const updatedUser = await db
    .update(usersTable)
    .set({
      ...parsed.data,
      updatedAt: new Date(),
    })
    .where(eq(usersTable.id, id))
    .returning({
      id: usersTable.id,
      username: usersTable.username,
      email: usersTable.email,
      role: usersTable.role,
      isActive: usersTable.isActive,
    });

  return NextResponse.json({
    message: "User updated successfully",
    data: updatedUser[0],
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireRole([USER_ROLE.ADMIN]);

  if (error) return error;

  const { id } = await params;

  await db.delete(usersTable).where(eq(usersTable.id, id));

  return NextResponse.json({
    message: "User deleted successfully",
  });
}