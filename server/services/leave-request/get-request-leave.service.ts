import { db } from "@/db";
import type { RequestLeaveStatus } from "@/db/constants/request-leave-status";
import { requestLeaveTable } from "@/db/schema";

import { SQL, and, count, desc, eq } from "drizzle-orm";

type GetRequestLeaveListParams = {
  userId: string;
  page: number;
  pageSize: number;
  status?: RequestLeaveStatus;
};

export async function getRequestLeaveListService({
  userId,
  page,
  pageSize,
  status,
}: GetRequestLeaveListParams) {
  const safePage = Math.max(page, 1);
  const safePageSize = Math.min(Math.max(pageSize, 1), 100);
  const offset = (safePage - 1) * safePageSize;

  const conditions: SQL[] = [eq(requestLeaveTable.userId, userId)];

  if (status) {
    conditions.push(eq(requestLeaveTable.status, status));
  }

  const whereCondition = and(...conditions);

  const [items, totalResult] = await Promise.all([
    db
      .select()
      .from(requestLeaveTable)
      .where(whereCondition)
      .orderBy(desc(requestLeaveTable.createdAt))
      .limit(safePageSize)
      .offset(offset),

    db
      .select({
        total: count(),
      })
      .from(requestLeaveTable)
      .where(whereCondition),
  ]);

  const totalItems = totalResult[0]?.total ?? 0;
  const totalPages = Math.ceil(totalItems / safePageSize);

  return {
    data: items,
    pagination: {
      page: safePage,
      pageSize: safePageSize,
      totalItems,
      totalPages,
      hasNextPage: safePage < totalPages,
      hasPreviousPage: safePage > 1,
    },
  };
}
