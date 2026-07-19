import { db } from "@/db";
import { REQUEST_LEAVE_STATUS } from "@/db/constants/request-leave-status";
import { requestLeaveApprovalTable, requestLeaveTable } from "@/db/schema";

import { eq } from "drizzle-orm";

type ApproveRequestLeaveParams = {
  requestLeaveId: string;
  reviewerId: string;
  approvalLevel: 1 | 2;
  comment?: string;
};

export async function approveRequestLeaveService({
  requestLeaveId,
  reviewerId,
  approvalLevel,
  comment,
}: ApproveRequestLeaveParams) {
  return db.transaction(async (tx) => {
    const requestLeave = await tx.query.requestLeaveTable.findFirst({
      where: eq(requestLeaveTable.id, requestLeaveId),
    });

    if (!requestLeave) {
      throw new Error("Leave request not found.");
    }

    const expectedStatus =
      approvalLevel === 1
        ? REQUEST_LEAVE_STATUS.PENDING_FIRST_APPROVAL
        : REQUEST_LEAVE_STATUS.PENDING_SECOND_APPROVAL;

    if (requestLeave.status !== expectedStatus) {
      throw new Error("This leave request is not waiting for your approval.");
    }

    const [review] = await tx
      .insert(requestLeaveApprovalTable)
      .values({
        requestLeaveId,
        reviewerId,
        approvalLevel,
        revision: requestLeave.revision,
        status: "approved",
        comment: comment?.trim() || null,
        reviewedAt: new Date(),
      })
      .returning();

    const nextStatus =
      approvalLevel === 1
        ? REQUEST_LEAVE_STATUS.PENDING_SECOND_APPROVAL
        : REQUEST_LEAVE_STATUS.APPROVED;

    const [approvedRequest] = await tx
      .update(requestLeaveTable)
      .set({
        status: nextStatus,
        updatedAt: new Date(),
      })
      .where(eq(requestLeaveTable.id, requestLeaveId))
      .returning();

    return {
      request: approvedRequest,
      review,
    };
  });
}
