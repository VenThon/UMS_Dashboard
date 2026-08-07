import { NextResponse } from "next/server";

import type { UserRole } from "@/db/types/user.type";

import { getUserFromRequest } from "./verify";

export async function requireRole(roles: readonly UserRole[]) {
  const user = await getUserFromRequest();

  if (!user) {
    return {
      user: null,
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  if (!roles.includes(user.role as UserRole)) {
    return {
      user: null,
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return {
    user,
    error: null,
  };
}
