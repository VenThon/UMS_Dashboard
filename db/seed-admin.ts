// src/db/seed-admin.ts

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { USER_ROLE } from "./types/user.type";

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !username || !password) {
    throw new Error("Missing ADMIN env values");
  }

  const existingAdmin = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });

  if (existingAdmin) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await db.insert(usersTable).values({
    username,
    email,
    password: hashedPassword,
    role: USER_ROLE.ADMIN,
    isActive: true,
  });

  console.log("Admin created successfully");
}

seedAdmin();