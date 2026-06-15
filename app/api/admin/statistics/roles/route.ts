import { NextRequest, NextResponse } from "next/server";
import { sql, count, ne, and } from "drizzle-orm";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { requireRole } from "@/lib/auth/require-role";
import { USER_ROLE } from "@/db/types/user.type";

export async function GET(request: NextRequest) {
  const { error } = await requireRole([USER_ROLE.ADMIN]);

  if (error) return error;

  const year = request.nextUrl.searchParams.get("year");

  const statistics = await db
    .select({
      role: usersTable.role,
      total: count(),
    })
    .from(usersTable)
    .where(
      and(
        sql`EXTRACT(YEAR FROM ${usersTable.createdAt}) = ${Number(year)}`,
        ne(usersTable.role, USER_ROLE.ADMIN),
      ),
    )
    .groupBy(usersTable.role);

  return NextResponse.json({
    year: Number(year),
    data: statistics,
  });
}
