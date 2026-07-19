import { db } from "@/db";
import { REQUEST_LEAVE_STATUS } from "@/db/constants/request-leave-status";
import { requestLeaveTable } from "@/db/schema";
import type { ResubmitRequestLeaveValue } from "@/db/validation/leave-request";

import { and, eq, gte, lte, ne } from "drizzle-orm";

type ResubmitRequestLeaveParams = {
  id: string;
  userId: string;
  values: ResubmitRequestLeaveValue;
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
      throw new Error("Another leave request overlaps with these dates.");
    }

    const [resubmittedRequest] = await tx
      .update(requestLeaveTable)
      .set({
        leaveType: values.leaveType,
        startDate: values.startDate,
        endDate: values.endDate,
        durationType: values.durationType,
        reason: values.reason,

        revision: requestLeave.revision + 1,
        status: REQUEST_LEAVE_STATUS.PENDING_FIRST_APPROVAL,

        reviewedAt: null,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(requestLeaveTable.id, id),
          eq(requestLeaveTable.userId, userId),
          eq(requestLeaveTable.status, REQUEST_LEAVE_STATUS.REJECTED),
          eq(requestLeaveTable.revision, requestLeave.revision),
        ),
      )
      .returning();

    if (!resubmittedRequest) {
      throw new Error(
        "The leave request changed before it could be resubmitted.",
      );
    }

    return resubmittedRequest;
  });
}
