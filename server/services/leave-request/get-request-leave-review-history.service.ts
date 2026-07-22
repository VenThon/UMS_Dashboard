import { db } from "@/db";
import {
  requestLeaveApprovalTable,
  requestLeaveTable,
  usersTable,
} from "@/db/schema";
import { REVIEW_REQUEST_LEAVE_ROLES } from "@/utils/general-request/request-leave-permission";

import { eq } from "drizzle-orm";

type GetRequestLeaveReviewHistoryParams = {
  requestLeaveId: string;
  currentUserId: string;
  currentUserRole: string;
};

export async function getRequestLeaveReviewHistoryService({
  requestLeaveId,
  currentUserId,
  currentUserRole,
}: GetRequestLeaveReviewHistoryParams) {
  const requestLeave = await db.query.requestLeaveTable.findFirst({
    where: eq(requestLeaveTable.id, requestLeaveId),
  });

  if (!requestLeave) {
    throw new Error("Leave request not found.");
  }

  const isOwner = requestLeave.userId === currentUserId;

  const isReviewer = REVIEW_REQUEST_LEAVE_ROLES.includes(
    currentUserRole as (typeof REVIEW_REQUEST_LEAVE_ROLES)[number],
  );

  if (!isOwner && !isReviewer) {
    throw new Error("You do not have permission to view this review history.");
  }

  return db
    .select({
      id: requestLeaveApprovalTable.id,
      requestLeaveId: requestLeaveApprovalTable.requestLeaveId,
      reviewerId: requestLeaveApprovalTable.reviewerId,
      reviewerName: usersTable.username,
      approvalLevel: requestLeaveApprovalTable.approvalLevel,
      revision: requestLeaveApprovalTable.revision,
      status: requestLeaveApprovalTable.status,
      comment: requestLeaveApprovalTable.comment,
      reviewedAt: requestLeaveApprovalTable.reviewedAt,
    })
    .from(requestLeaveApprovalTable)
    .leftJoin(
      usersTable,
      eq(requestLeaveApprovalTable.reviewerId, usersTable.id),
    )
    .where(eq(requestLeaveApprovalTable.requestLeaveId, requestLeaveId))
    .orderBy(
      requestLeaveApprovalTable.revision,
      requestLeaveApprovalTable.approvalLevel,
      requestLeaveApprovalTable.reviewedAt,
    );
}
