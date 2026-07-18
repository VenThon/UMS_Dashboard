import { db } from "@/db";
import { REQUEST_LEAVE_STATUS } from "@/db/constants/request-leave-status";
import { requestLeaveApprovalTable, requestLeaveTable } from "@/db/schema";

import { and, eq } from "drizzle-orm";

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

    if (
      requestLeave.status === REQUEST_LEAVE_STATUS.APPROVED ||
      requestLeave.status === REQUEST_LEAVE_STATUS.REJECTED ||
      requestLeave.status === REQUEST_LEAVE_STATUS.CANCELLED
    ) {
      throw new Error("This leave request has already been finalized.");
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

    if (approvalLevel === 1) {
      if (requestLeave.status !== REQUEST_LEAVE_STATUS.PENDING_FIRST_APPROVAL) {
        throw new Error(
          "This leave request is not waiting for first approval.",
        );
      }
    }

    if (approvalLevel === 2) {
      if (
        requestLeave.status !== REQUEST_LEAVE_STATUS.PENDING_SECOND_APPROVAL
      ) {
        throw new Error(
          "This leave request is not waiting for second approval.",
        );
      }

      const firstApproval = await tx.query.requestLeaveApprovalTable.findFirst({
        where: and(
          eq(requestLeaveApprovalTable.requestLeaveId, requestLeaveId),
          eq(requestLeaveApprovalTable.approvalLevel, 1),
          eq(requestLeaveApprovalTable.status, "approved"),
        ),
      });

      if (!firstApproval) {
        throw new Error(
          "The first approval must be completed before the second approval.",
        );
      }
    }

    const [approval] = await tx
      .insert(requestLeaveApprovalTable)
      .values({
        requestLeaveId,
        reviewerId,
        approvalLevel,
        status: "approved",
        comment: comment?.trim() || null,
        reviewedAt: new Date(),
      })
      .returning();

    if (!approval) {
      throw new Error("Failed to save the approval.");
    }

    const nextStatus =
      approvalLevel === 1
        ? REQUEST_LEAVE_STATUS.PENDING_SECOND_APPROVAL
        : REQUEST_LEAVE_STATUS.APPROVED;

    const [updatedRequestLeave] = await tx
      .update(requestLeaveTable)
      .set({
        status: nextStatus,
        reviewedAt: approvalLevel === 2 ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(requestLeaveTable.id, requestLeaveId))
      .returning();

    if (!updatedRequestLeave) {
      throw new Error("Failed to update the leave request status.");
    }

    return {
      approval,
      requestLeave: updatedRequestLeave,
    };
  });
}
