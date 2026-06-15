import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { UnderTeamEnum } from "@/db/types/team.type";
import { USER_ROLE, UserRoleEnum } from "@/db/types/user.type";
import { createUserSchema } from "@/db/validation/users";
import { requireRole } from "@/lib/auth/require-role";

import bcrypt from "bcryptjs";
import { and, eq, ilike, or } from "drizzle-orm";
import z from "zod";

const UserSearchParamSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(30).default(10),
  nameSearch: z.string().default(""),
  role: UserRoleEnum.optional().catch(undefined),
  team: UnderTeamEnum.optional().catch(undefined),
});

export async function GET(request: NextRequest) {
  const { error } = await requireRole([USER_ROLE.ADMIN]);
  if (error) return error;

  const searchParams = Object.fromEntries(request.nextUrl.searchParams);

  const validationInput = UserSearchParamSchema.safeParse(searchParams);

  if (!validationInput.success) {
    return NextResponse.json(
      { error: validationInput.error.flatten() },
      { status: 400 },
    );
  }

  const { page, pageSize, nameSearch, role, team } = validationInput.data;

  const conditions = [];

  if (nameSearch) {
    conditions.push(
      or(
        ilike(usersTable.username, `%${nameSearch}%`),
        ilike(usersTable.email, `%${nameSearch}%`),
      ),
    );
  }

  if (role) {
    conditions.push(eq(usersTable.role, role));
  }

  if (team) {
    conditions.push(eq(usersTable.team, team));
  }

  const whereCondition = conditions.length > 0 ? and(...conditions) : undefined;

  const users = await db.query.usersTable.findMany({
    columns: {
      password: false,
    },
    where: whereCondition,
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });

  return NextResponse.json({
    message: "Users fetched successfully",
    data: users,
    pagination: {
      page,
      pageSize,
    },
  });
}

export async function POST(req: Request) {
  const { error } = await requireRole([USER_ROLE.ADMIN]);

  if (error) return error;

  const body = await req.json();

  const parsed = createUserSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 12);

  const newUser = await db
    .insert(usersTable)
    .values({
      username: parsed.data.username,
      email: parsed.data.email,
      password: hashedPassword,
      role: parsed.data.role,
      team: parsed.data.team,
      phoneNumber: parsed.data.phoneNumber,
      isActive: true,
    })
    .returning({
      id: usersTable.id,
      username: usersTable.username,
      email: usersTable.email,
      role: usersTable.role,
      team: usersTable.team,
      phoneNumber: usersTable.phoneNumber,
      isActive: usersTable.isActive,
    });

  return NextResponse.json({
    message: "User created successfully",
    data: newUser[0],
  });
}
