import { db } from "@/db";
import { REQUEST_LEAVE_STATUS } from "@/db/constants/request-leave-status";
import { requestLeaveApprovalTable, requestLeaveTable } from "@/db/schema";

import { and, eq } from "drizzle-orm";

type RejectRequestLeaveParams = {
  requestLeaveId: string;
  reviewerId: string;
  approvalLevel: 1 | 2;
  comment: string;
};

export async function rejectRequestLeaveService({
  requestLeaveId,
  reviewerId,
  approvalLevel,
  comment,
}: RejectRequestLeaveParams) {
  const rejectionComment = comment.trim();

  if (!rejectionComment) {
    throw new Error("A comment is required when rejecting a leave request.");
  }

  return db.transaction(async (tx) => {
    const requestLeave = await tx.query.requestLeaveTable.findFirst({
      where: eq(requestLeaveTable.id, requestLeaveId),
    });

    if (!requestLeave) {
      throw new Error("Leave request not found.");
    }

    if (
      requestLeave.status === REQUEST_LEAVE_STATUS.APPROVED ||
      requestLeave.status === REQUEST_LEAVE_STATUS.REJECTED ||
      requestLeave.status === REQUEST_LEAVE_STATUS.CANCELLED
    ) {
      throw new Error("This leave request has already been finalized.");
    }

    if (
      approvalLevel === 1 &&
      requestLeave.status !== REQUEST_LEAVE_STATUS.PENDING_FIRST_APPROVAL
    ) {
      throw new Error("This leave request is not waiting for first approval.");
    }

    if (
      approvalLevel === 2 &&
      requestLeave.status !== REQUEST_LEAVE_STATUS.PENDING_SECOND_APPROVAL
    ) {
      throw new Error("This leave request is not waiting for second approval.");
    }

    if (approvalLevel === 2) {
      const firstApproval = await tx.query.requestLeaveApprovalTable.findFirst({
        where: and(
          eq(requestLeaveApprovalTable.requestLeaveId, requestLeaveId),
          eq(requestLeaveApprovalTable.approvalLevel, 1),
          eq(requestLeaveApprovalTable.status, "approved"),
        ),
      });

      if (!firstApproval) {
        throw new Error(
          "The first approval must be completed before the second review.",
        );
      }
    }

    const existingReview = await tx.query.requestLeaveApprovalTable.findFirst({
      where: and(
        eq(requestLeaveApprovalTable.requestLeaveId, requestLeaveId),
        eq(requestLeaveApprovalTable.approvalLevel, approvalLevel),
      ),
    });

    if (existingReview) {
      throw new Error(
        `Approval level ${approvalLevel} has already reviewed this leave request.`,
      );
    }

    const [rejection] = await tx
      .insert(requestLeaveApprovalTable)
      .values({
        requestLeaveId,
        reviewerId,
        approvalLevel,
        status: "rejected",
        comment: rejectionComment,
        reviewedAt: new Date(),
      })
      .returning();

    if (!rejection) {
      throw new Error("Failed to save the rejection.");
    }

    const [updatedRequestLeave] = await tx
      .update(requestLeaveTable)
      .set({
        status: REQUEST_LEAVE_STATUS.REJECTED,
        reviewedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(requestLeaveTable.id, requestLeaveId))
      .returning();

    if (!updatedRequestLeave) {
      throw new Error("Failed to reject the leave request.");
    }

    return {
      rejection,
      requestLeave: updatedRequestLeave,
    };
  });
}
