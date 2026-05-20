// src/app/api/auth/profile/route.ts

import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth/verify";

export async function GET() {
  const user = await getUserFromRequest();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    message: "Profile fetched successfully",
    user,
  });
}