// src/server/repositories/attendance-repository.ts
import { db } from "@/db";
import type {
  AttendanceAction,
  AttendanceStatus,
} from "@/db/constants/attendance";
import {
  attendanceHistoryTable,
  attendancesTable,
} from "@/db/schema/attendance";
import { usersTable } from "@/db/schema/users";
import type { AttendanceListQuery } from "@/db/validation/attendance";
import { createPaginationResult, getPagination } from "@/lib/pagination";

import {
  type SQL,
  and,
  asc,
  count,
  desc,
  eq,
  gte,
  ilike,
  lte,
  or,
} from "drizzle-orm";

export async function findAttendanceByUserAndDate(
  userId: string,
  attendanceDate: string,
) {
  const [attendance] = await db
    .select()
    .from(attendancesTable)
    .where(
      and(
        eq(attendancesTable.userId, userId),
        eq(attendancesTable.attendanceDate, attendanceDate),
      ),
    )
    .limit(1);

  return attendance ?? null;
}

export async function findAttendanceById(id: string) {
  const [attendance] = await db
    .select({
      id: attendancesTable.id,
      userId: attendancesTable.userId,
      userName: usersTable.username,
      userEmail: usersTable.email,
      attendanceDate: attendancesTable.attendanceDate,
      checkInAt: attendancesTable.checkInAt,
      checkOutAt: attendancesTable.checkOutAt,
      status: attendancesTable.status,
      lateMinutes: attendancesTable.lateMinutes,
      workedMinutes: attendancesTable.workedMinutes,
      note: attendancesTable.note,
      createdAt: attendancesTable.createdAt,
      updatedAt: attendancesTable.updatedAt,
    })
    .from(attendancesTable)
    .innerJoin(usersTable, eq(usersTable.id, attendancesTable.userId))
    .where(eq(attendancesTable.id, id))
    .limit(1);

  return attendance ?? null;
}

export async function createAttendance(values: {
  userId: string;
  attendanceDate: string;
  checkInAt: Date;
  status: AttendanceStatus;
  lateMinutes: number;
}) {
  const [attendance] = await db
    .insert(attendancesTable)
    .values(values)
    .returning();

  return attendance;
}

export async function updateAttendanceById(
  id: string,
  values: Partial<{
    checkInAt: Date | null;
    checkOutAt: Date | null;
    status: AttendanceStatus;
    lateMinutes: number;
    workedMinutes: number | null;
    note: string | null;
  }>,
) {
  const [attendance] = await db
    .update(attendancesTable)
    .set({
      ...values,
      updatedAt: new Date(),
    })
    .where(eq(attendancesTable.id, id))
    .returning();

  return attendance ?? null;
}

export async function createAttendanceHistory(values: {
  attendanceId: string;
  action: AttendanceAction;
  performedById: string;
  previousData?: unknown;
  newData?: unknown;
  description?: string;
}) {
  const [history] = await db
    .insert(attendanceHistoryTable)
    .values({
      attendanceId: values.attendanceId,
      action: values.action,
      performedById: values.performedById,
      previousData: values.previousData,
      newData: values.newData,
      description: values.description,
    })
    .returning();

  return history;
}

export async function getAttendanceHistory(attendanceId: string) {
  return db
    .select({
      id: attendanceHistoryTable.id,
      action: attendanceHistoryTable.action,
      description: attendanceHistoryTable.description,
      previousData: attendanceHistoryTable.previousData,
      newData: attendanceHistoryTable.newData,
      performedById: attendanceHistoryTable.performedById,
      performedByName: usersTable.username,
      createdAt: attendanceHistoryTable.createdAt,
    })
    .from(attendanceHistoryTable)
    .innerJoin(
      usersTable,
      eq(usersTable.id, attendanceHistoryTable.performedById),
    )
    .where(eq(attendanceHistoryTable.attendanceId, attendanceId))
    .orderBy(asc(attendanceHistoryTable.createdAt));
}

export async function getPaginatedAttendances(query: AttendanceListQuery) {
  const { page, pageSize, limit, offset } = getPagination(
    query.page,
    query.pageSize,
  );

  const conditions: SQL[] = [];

  if (query.status) {
    conditions.push(eq(attendancesTable.status, query.status));
  }

  if (query.userId) {
    conditions.push(eq(attendancesTable.userId, query.userId));
  }

  if (query.dateFrom) {
    conditions.push(gte(attendancesTable.attendanceDate, query.dateFrom));
  }

  if (query.dateTo) {
    conditions.push(lte(attendancesTable.attendanceDate, query.dateTo));
  }

  if (query.search) {
    conditions.push(
      or(
        ilike(usersTable.username, `%${query.search}%`),
        ilike(usersTable.email, `%${query.search}%`),
      )!,
    );
  }

  const whereCondition = conditions.length > 0 ? and(...conditions) : undefined;

  const data = await db
    .select({
      id: attendancesTable.id,
      userId: attendancesTable.userId,
      userName: usersTable.username,
      userEmail: usersTable.email,
      attendanceDate: attendancesTable.attendanceDate,
      checkInAt: attendancesTable.checkInAt,
      checkOutAt: attendancesTable.checkOutAt,
      status: attendancesTable.status,
      lateMinutes: attendancesTable.lateMinutes,
      workedMinutes: attendancesTable.workedMinutes,
      note: attendancesTable.note,
      createdAt: attendancesTable.createdAt,
      updatedAt: attendancesTable.updatedAt,
    })
    .from(attendancesTable)
    .innerJoin(usersTable, eq(usersTable.id, attendancesTable.userId))
    .where(whereCondition)
    .orderBy(
      desc(attendancesTable.attendanceDate),
      desc(attendancesTable.checkInAt),
    )
    .limit(limit)
    .offset(offset);

  const [totalResult] = await db
    .select({
      total: count(),
    })
    .from(attendancesTable)
    .innerJoin(usersTable, eq(usersTable.id, attendancesTable.userId))
    .where(whereCondition);

  return createPaginationResult({
    data,
    page,
    pageSize,
    totalItems: Number(totalResult?.total ?? 0),
  });
}
