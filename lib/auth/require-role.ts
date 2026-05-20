
import { NextResponse } from "next/server";
import { getUserFromRequest } from "./verify";
import { UserRole } from "@/db/types/user.type";


export async function requireRole(roles: UserRole[]) {
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