import { db } from "@/db";
import { REVIEW_REPORT_STATUS } from "@/db/constants/daily-report-status";
import { REQUEST_LEAVE_STATUS } from "@/db/constants/request-leave-status";
import {
  ReviewRequestLeaveValue,
  requestLeaveApprovalTable,
  requestLeaveTable,
} from "@/db/schema";

import { and, eq } from "drizzle-orm";

type ReviewRequestLeaveParams = {
  requestLeaveId: string;
  reviewerId: string;
  approvalLevel: 1 | 2;
  values: ReviewRequestLeaveValue;
};

export async function reviewRequestLeaveService({
  requestLeaveId,
  reviewerId,
  approvalLevel,
  values,
}: ReviewRequestLeaveParams) {
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

    const existingReview = await tx.query.requestLeaveApprovalTable.findFirst({
      where: and(
        eq(requestLeaveApprovalTable.requestLeaveId, requestLeaveId),
        eq(requestLeaveApprovalTable.revision, requestLeave.revision),
        eq(requestLeaveApprovalTable.approvalLevel, approvalLevel),
      ),
    });

    if (existingReview) {
      throw new Error(
        `Approval level ${approvalLevel} has already reviewed this request.`,
      );
    }

    if (approvalLevel === 2) {
      const firstApproval = await tx.query.requestLeaveApprovalTable.findFirst({
        where: and(
          eq(requestLeaveApprovalTable.requestLeaveId, requestLeaveId),
          eq(requestLeaveApprovalTable.revision, requestLeave.revision),
          eq(requestLeaveApprovalTable.approvalLevel, 1),
          eq(requestLeaveApprovalTable.status, REVIEW_REPORT_STATUS.APPROVED),
        ),
      });

      if (!firstApproval) {
        throw new Error(
          "The first approval must be completed before the second approval.",
        );
      }
    }

    const [review] = await tx
      .insert(requestLeaveApprovalTable)
      .values({
        requestLeaveId,
        reviewerId,
        approvalLevel,
        revision: requestLeave.revision,
        status: values.status,
        comment: values.comment?.trim() || null,
        reviewedAt: new Date(),
      })
      .returning();

    if (!review) {
      throw new Error("Failed to save the leave request review.");
    }

    if (values.status === REVIEW_REPORT_STATUS.REJECTED) {
      const [rejectedRequest] = await tx
        .update(requestLeaveTable)
        .set({
          status: REQUEST_LEAVE_STATUS.REJECTED,
          reviewedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(requestLeaveTable.id, requestLeaveId),
            eq(requestLeaveTable.status, requestLeave.status),
          ),
        )
        .returning();

      if (!rejectedRequest) {
        throw new Error(
          "The leave request status changed before rejection was completed.",
        );
      }

      return {
        review,
        requestLeave: rejectedRequest,
      };
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
      .where(
        and(
          eq(requestLeaveTable.id, requestLeaveId),
          eq(requestLeaveTable.status, requestLeave.status),
        ),
      )
      .returning();

    if (!updatedRequestLeave) {
      throw new Error(
        "The leave request status changed before approval was completed.",
      );
    }

    return {
      review,
      requestLeave: updatedRequestLeave,
    };
  });
}

// type GetRequestLeaveReviewHistoryParams = {
//   requestLeaveId: string;
//   currentUserId: string;
//   currentUserRole: string;
// };

// export async function getRequestLeaveReviewHistoryService({
//   requestLeaveId,
//   currentUserId,
//   currentUserRole,
// }: GetRequestLeaveReviewHistoryParams) {
//   const requestLeave = await db.query.requestLeaveTable.findFirst({
//     where: eq(requestLeaveTable.id, requestLeaveId),
//   });

//   if (!requestLeave) {
//     throw new Error("Leave request not found.");
//   }

//   const isOwner = requestLeave.userId === currentUserId;

//   const isReviewer = REVIEW_REQUEST_LEAVE_ROLES.includes(
//     currentUserRole as never,
//   );

//   if (!isOwner && !isReviewer) {
//     throw new Error("You do not have permission to view this review history.");
//   }

//   return db.query.requestLeaveApprovalTable.findMany({
//     where: eq(requestLeaveApprovalTable.requestLeaveId, requestLeaveId),
//     orderBy: (table, { asc }) => [
//       asc(table.approvalLevel),
//       asc(table.reviewedAt),
//     ],
//   });
// }

// type GetRequestLeaveReviewHistoryParams = {
//   requestLeaveId: string;
//   currentUserId: string;
//   currentUserRole: string;
// };

// export async function getRequestLeaveReviewHistoryService({
//   requestLeaveId,
//   currentUserId,
//   currentUserRole,
// }: GetRequestLeaveReviewHistoryParams) {
//   const requestLeave = await db.query.requestLeaveTable.findFirst({
//     where: eq(requestLeaveTable.id, requestLeaveId),
//   });

//   if (!requestLeave) {
//     throw new Error("Leave request not found.");
//   }

//   const isOwner = requestLeave.userId === currentUserId;

//   const isReviewer = REVIEW_REQUEST_LEAVE_ROLES.includes(
//     currentUserRole as (typeof REVIEW_REQUEST_LEAVE_ROLES)[number],
//   );

//   if (!isOwner && !isReviewer) {
//     throw new Error("You do not have permission to view this review history.");
//   }

//   return db
//     .select({
//       id: requestLeaveApprovalTable.id,
//       requestLeaveId: requestLeaveApprovalTable.requestLeaveId,
//       reviewerId: requestLeaveApprovalTable.reviewerId,
//       reviewerName: usersTable.username,
//       approvalLevel: requestLeaveApprovalTable.approvalLevel,
//       revision: requestLeaveApprovalTable.revision,
//       status: requestLeaveApprovalTable.status,
//       comment: requestLeaveApprovalTable.comment,
//       reviewedAt: requestLeaveApprovalTable.reviewedAt,
//     })
//     .from(requestLeaveApprovalTable)
//     .leftJoin(
//       usersTable,
//       eq(requestLeaveApprovalTable.reviewerId, usersTable.id),
//     )
//     .where(eq(requestLeaveApprovalTable.requestLeaveId, requestLeaveId))
//     .orderBy(
//       requestLeaveApprovalTable.revision,
//       requestLeaveApprovalTable.approvalLevel,
//       requestLeaveApprovalTable.reviewedAt,
//     );
// }
