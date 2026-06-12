import { NextResponse } from "next/server";
import { count, eq, inArray } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { requireRole } from "@/lib/auth/require-role";
import { USER_ROLE } from "@/db/types/user.type";

export async function GET() {
  const { error } = await requireRole([USER_ROLE.ADMIN]);

  if (error) return error;

  const [totalUsers] = await db.select({ count: count() }).from(usersTable);

  const [totalActiveUsers] = await db
    .select({ count: count() })
    .from(usersTable)
    .where(eq(usersTable.isActive, true));

  const [totalInactiveUsers] = await db
    .select({ count: count() })
    .from(usersTable)
    .where(eq(usersTable.isActive, false));

  const [totalManagementTeam] = await db
    .select({ count: count() })
    .from(usersTable)
    .where(
      inArray(usersTable.role, [
        USER_ROLE.IT_MANAGER,
        USER_ROLE.PROJECT_MANAGER,
      ]),
    );

  return NextResponse.json({
    totalUsers: totalUsers.count,
    totalRoles: Object.keys(USER_ROLE).length,
    totalActiveUsers: totalActiveUsers.count,
    totalInactiveUsers: totalInactiveUsers.count,
    totalManagementTeam: totalManagementTeam.count,
  });
}
