import { db } from "@/db";
import { requestLeaveTable } from "@/db/schema";
import type { CreateRequestLeaveValue } from "@/db/validation/leave-request";

import { and, eq, gte, lte } from "drizzle-orm";

type CreateRequestLeaveServiceParams = {
  userId: string;
  values: CreateRequestLeaveValue;
};

export async function createRequestLeaveService({
  values,
  userId,
}: CreateRequestLeaveServiceParams) {
  const overlappingLeaveRequest = await db.query.requestLeaveTable.findFirst({
    where: and(
      eq(requestLeaveTable.userId, userId),
      lte(requestLeaveTable.startDate, values.endDate),
      gte(requestLeaveTable.endDate, values.startDate),
    ),
  });

  if (overlappingLeaveRequest) {
    throw new Error(
      "You already have a leave request that overlaps with these dates.",
    );
  }

  const [leaveRequest] = await db
    .insert(requestLeaveTable)
    .values({
      userId,
      leaveType: values.leaveType,
      startDate: values.startDate,
      endDate: values.endDate,
      durationType: values.durationType,
      reason: values.reason,
      status: values.status,
    })
    .returning();

  if (!leaveRequest) {
    throw new Error("Failed to create the leave request.");
  }

  return leaveRequest;
}
