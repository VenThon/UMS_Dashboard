import { db } from "@/db";
import { REQUEST_LEAVE_STATUS } from "@/db/constants/request-leave-status";
import { requestLeaveTable } from "@/db/schema";
import type { UpdateRequestLeaveValue } from "@/db/validation/leave-request";

import { and, eq, gte, lte, ne } from "drizzle-orm";

type UpdateRequestLeaveParams = {
  id: string;
  userId: string;
  values: UpdateRequestLeaveValue;
};

export async function updateRequestLeaveService({
  id,
  userId,
  values,
}: UpdateRequestLeaveParams) {
  const requestLeave = await db.query.requestLeaveTable.findFirst({
    where: and(
      eq(requestLeaveTable.id, id),
      eq(requestLeaveTable.userId, userId),
    ),
  });

  if (!requestLeave) {
    throw new Error(
      "Leave request not found, or you do not have permission to update it.",
    );
  }

  if (requestLeave.status === REQUEST_LEAVE_STATUS.APPROVED) {
    throw new Error("An approved leave request cannot be updated.");
  }

  if (requestLeave.status === REQUEST_LEAVE_STATUS.CANCELLED) {
    throw new Error("A cancelled leave request cannot be updated.");
  }

  const startDate = values.startDate ?? requestLeave.startDate;
  const endDate = values.endDate ?? requestLeave.endDate;

  if (endDate < startDate) {
    throw new Error("End date must be on or after the start date.");
  }

  const overlappingRequest = await db.query.requestLeaveTable.findFirst({
    where: and(
      eq(requestLeaveTable.userId, userId),
      ne(requestLeaveTable.id, id),
      lte(requestLeaveTable.startDate, endDate),
      gte(requestLeaveTable.endDate, startDate),
    ),
  });

  if (overlappingRequest) {
    throw new Error(
      "You already have another leave request that overlaps with these dates.",
    );
  }

  const [updatedRequestLeave] = await db
    .update(requestLeaveTable)
    .set({
      leaveType: values.leaveType,
      startDate: values.startDate,
      endDate: values.endDate,
      durationType: values.durationType,
      reason: values.reason,

      status: REQUEST_LEAVE_STATUS.PENDING_FIRST_APPROVAL,
      approvedById: null,
      approverComment: null,
      reviewedAt: null,
      updatedAt: new Date(),
    })
    .where(
      and(eq(requestLeaveTable.id, id), eq(requestLeaveTable.userId, userId)),
    )
    .returning();

  if (!updatedRequestLeave) {
    throw new Error("Failed to update the leave request.");
  }

  return updatedRequestLeave;
}
