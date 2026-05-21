
import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable } from "@/db/schema";

export async function GET() {
  const users = await db.select().from(usersTable);

  return NextResponse.json({
    message: "Database connected successfully",
    data: users,
  });
}