import { db } from "@/db";
import {
  generalRequestApprovalTable,
  generalRequestTable,
  usersTable,
} from "@/db/schema";
import { USER_ROLE, type UserRole } from "@/db/types/user.type";

import { asc, eq } from "drizzle-orm";

type GetGeneralRequestReviewsParams = {
  generalRequestId: string;
  currentUserId: string;
  currentUserRole: UserRole;
};

export async function getGeneralRequestReviewsService({
  generalRequestId,
  currentUserId,
  currentUserRole,
}: GetGeneralRequestReviewsParams) {
  const generalRequest = await db.query.generalRequestTable.findFirst({
    where: eq(generalRequestTable.id, generalRequestId),
  });

  if (!generalRequest) {
    throw new Error("General request not found.");
  }

  const isOwner = generalRequest.userId === currentUserId;

  const isReviewer =
    currentUserRole === USER_ROLE.LEAD_FRONTEND ||
    currentUserRole === USER_ROLE.IT_MANAGER;

  if (!isOwner && !isReviewer) {
    throw new Error("You do not have permission to view the review history.");
  }

  return db
    .select({
      id: generalRequestApprovalTable.id,
      generalRequestId: generalRequestApprovalTable.generalRequestId,
      reviewerId: generalRequestApprovalTable.reviewerId,
      reviewerName: usersTable.username,
      approvalLevel: generalRequestApprovalTable.approvalLevel,
      revision: generalRequestApprovalTable.revision,
      status: generalRequestApprovalTable.status,
      comment: generalRequestApprovalTable.comment,
      reviewedAt: generalRequestApprovalTable.reviewedAt,
    })
    .from(generalRequestApprovalTable)
    .leftJoin(
      usersTable,
      eq(generalRequestApprovalTable.reviewerId, usersTable.id),
    )
    .where(eq(generalRequestApprovalTable.generalRequestId, generalRequestId))
    .orderBy(
      asc(generalRequestApprovalTable.revision),
      asc(generalRequestApprovalTable.approvalLevel),
      asc(generalRequestApprovalTable.reviewedAt),
    );
}
