import { db } from "@/db";
import { REQUEST_LEAVE_STATUS } from "@/db/constants/request-leave-status";
import { requestLeaveApprovalTable, requestLeaveTable } from "@/db/schema";
import type { CreateRequestLeaveValue } from "@/db/validation/leave-request";

import { and, eq, gte, lte, ne } from "drizzle-orm";

type ResubmitRequestLeaveParams = {
  id: string;
  userId: string;
  values: Omit<CreateRequestLeaveValue, "status">;
};

export async function resubmitRequestLeaveService({
  id,
  userId,
  values,
}: ResubmitRequestLeaveParams) {
  return db.transaction(async (tx) => {
    const requestLeave = await tx.query.requestLeaveTable.findFirst({
      where: and(
        eq(requestLeaveTable.id, id),
        eq(requestLeaveTable.userId, userId),
      ),
    });

    if (!requestLeave) {
      throw new Error(
        "Leave request not found, or you do not have permission to resubmit it.",
      );
    }

    if (requestLeave.status !== REQUEST_LEAVE_STATUS.REJECTED) {
      throw new Error("Only rejected leave requests can be resubmitted.");
    }

    if (values.endDate < values.startDate) {
      throw new Error("End date must be on or after the start date.");
    }

    const overlappingRequest = await tx.query.requestLeaveTable.findFirst({
      where: and(
        eq(requestLeaveTable.userId, userId),
        ne(requestLeaveTable.id, id),
        lte(requestLeaveTable.startDate, values.endDate),
        gte(requestLeaveTable.endDate, values.startDate),
      ),
    });

    if (overlappingRequest) {
      throw new Error(
        "You already have another leave request that overlaps with these dates.",
      );
    }

    await tx
      .delete(requestLeaveApprovalTable)
      .where(eq(requestLeaveApprovalTable.requestLeaveId, id));

    const [updatedRequestLeave] = await tx
      .update(requestLeaveTable)
      .set({
        leaveType: values.leaveType,
        startDate: values.startDate,
        endDate: values.endDate,
        durationType: values.durationType,
        reason: values.reason,
        status: REQUEST_LEAVE_STATUS.PENDING_FIRST_APPROVAL,
        reviewedAt: null,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(requestLeaveTable.id, id),
          eq(requestLeaveTable.userId, userId),
          eq(requestLeaveTable.status, REQUEST_LEAVE_STATUS.REJECTED),
        ),
      )
      .returning();

    if (!updatedRequestLeave) {
      throw new Error("Failed to resubmit the leave request.");
    }

    return updatedRequestLeave;
  });
}
