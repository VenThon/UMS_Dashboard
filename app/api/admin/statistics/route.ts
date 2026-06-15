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

  const [totalDevelopmentTeam] = await db
    .select({ count: count() })
    .from(usersTable)
    .where(
      inArray(usersTable.role, [
        USER_ROLE.LEAD_FRONTEND,
        USER_ROLE.LEAD_BACKEND,
        USER_ROLE.FRONTEND_DEVELOPER,
        USER_ROLE.BACKEND_DEVELOPER,
        USER_ROLE.FULLSTACK_DEVELOPER,
        USER_ROLE.MOBILE_DEVELOPER,
      ]),
    );

  const [totalBusinessAnalysisTeam] = await db
    .select({ count: count() })
    .from(usersTable)
    .where(
      inArray(usersTable.role, [
        USER_ROLE.BUSINESS_ANALYSIS,
        USER_ROLE.SYSTEM_ANALYSIS,
        USER_ROLE.PRODUCT_OWNER,
      ]),
    );

  const [totalInfrastructureTeam] = await db
    .select({ count: count() })
    .from(usersTable)
    .where(
      inArray(usersTable.role, [
        USER_ROLE.LEAD_INFRASTRUCTUR,
        USER_ROLE.DEVOPS_ENGINEER,
        USER_ROLE.CLOUD_ENGINEER,
        USER_ROLE.DATABASE_ADMINISTRARION,
        USER_ROLE.NETWORK_ENGINEER,
        USER_ROLE.SECURITY_ENGINEER,
      ]),
    );

  return NextResponse.json({
    totalUsers: totalUsers.count,
    totalRoles: Object.keys(USER_ROLE).length,
    totalActiveUsers: totalActiveUsers.count,
    totalInactiveUsers: totalInactiveUsers.count,
    totalManagementTeam: totalManagementTeam.count,
    totalDevelopmentTeam: totalDevelopmentTeam.count,
    totalBusinessAnalysisTeam: totalBusinessAnalysisTeam.count,
    totalInfrastructureTeam: totalInfrastructureTeam.count,
  });
}
