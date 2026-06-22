import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { USER_ROLE } from "@/db/types/user.type";
import { importUserSchema } from "@/db/validation/users";
import { requireRole } from "@/lib/auth/require-role";

import { inArray } from "drizzle-orm";
import * as XLSX from "xlsx";

type ImportUser = {
  username: string;
  email: string;
  password: string;
  role: string;
  team: string;
  countryCode?: string;
  phoneNumber?: string;
};

type ImportError = {
  row: number;
  field?: string;
  message: string;
};

const requiredColumns = [
  "username",
  "email",
  "password",
  "role",
  "team",
  "countryCode",
  "phoneNumber",
];

export async function POST(request: NextRequest) {
  const { error } = await requireRole([USER_ROLE.ADMIN]);

  if (error) return error;

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { message: "Excel file is required" },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];

  if (!sheetName) {
    return NextResponse.json(
      { message: "Excel file has no sheet" },
      { status: 400 },
    );
  }

  const worksheet = workbook.Sheets[sheetName];

  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
    defval: "",
  });

  if (rows.length === 0) {
    return NextResponse.json(
      { message: "Excel file is empty" },
      { status: 400 },
    );
  }

  const excelColumns = Object.keys(rows[0] ?? {});

  const missingColumns = requiredColumns.filter(
    (column) => !excelColumns.includes(column),
  );

  if (missingColumns.length > 0) {
    return NextResponse.json(
      {
        message: "Invalid Excel format",
        requiredColumns,
        missingColumns,
      },
      { status: 400 },
    );
  }

  const validRows: ImportUser[] = [];
  const errors: ImportError[] = [];

  const emails = rows
    .map((row) =>
      String(row.email || "")
        .trim()
        .toLowerCase(),
    )
    .filter(Boolean);

  const existingUsers = emails.length
    ? await db
        .select({ email: usersTable.email })
        .from(usersTable)
        .where(inArray(usersTable.email, emails))
    : [];

  const existingEmails = new Set(
    existingUsers.map((user) => user.email.toLowerCase()),
  );

  const seenEmails = new Set<string>();

  for (const [index, row] of rows.entries()) {
    const countryCode = String(row.countryCode || "").replace(/\D/g, "");
    const phoneNumber = String(row.phoneNumber || "").replace(/\D/g, "");
    const rowNumber = index + 2;

    const parsed = importUserSchema.safeParse({
      username: String(row.username || "").trim(),
      email: String(row.email || "")
        .trim()
        .toLowerCase(),
      password: String(row.password || ""),
      role: String(row.role || "").trim(),
      team: String(row.team || "").trim(),
      phoneNumber: `+${countryCode}${phoneNumber}`,
    });

    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        errors.push({
          row: rowNumber,
          field: issue.path.join("."),
          message: issue.message,
        });
      }

      continue;
    }

    if (seenEmails.has(parsed.data.email)) {
      errors.push({
        row: rowNumber,
        field: "email",
        message: "Duplicate email in Excel file",
      });

      continue;
    }

    if (existingEmails.has(parsed.data.email)) {
      errors.push({
        row: rowNumber,
        field: "email",
        message: "Email already exists",
      });

      continue;
    }

    seenEmails.add(parsed.data.email);
    validRows.push(parsed.data);
  }

  return NextResponse.json({
    totalRows: rows.length,
    validRows,
    errors,
  });
}
