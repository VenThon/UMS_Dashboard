import { NextResponse } from "next/server";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { USER_ROLE } from "@/db/types/user.type";
import { updateUserSchema } from "@/db/validation/users";
import { requireRole } from "@/lib/auth/require-role";

import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireRole([USER_ROLE.ADMIN]);
  if (error) return error;

  const { id } = await params;

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, id),
    columns: {
      id: true,
      username: true,
      email: true,
      role: true,
      team: true,
      phoneNumber: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

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
      { message: "Invalid input", error: parsed.error.flatten() },
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
      team: usersTable.team,
      phoneNumber: usersTable.phoneNumber,
      isActive: usersTable.isActive,
      updatedAt: usersTable.updatedAt,
    });

  if (!updatedUser[0]) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

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

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, id),
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  if (user.role === USER_ROLE.ADMIN) {
    return NextResponse.json(
      { message: "Admin account cannot be deleted" },
      { status: 403 },
    );
  }

  await db.delete(usersTable).where(eq(usersTable.id, id));

  return NextResponse.json({
    message: "User deleted successfully",
  });
}
