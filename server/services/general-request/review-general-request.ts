import { db } from "@/db";
import {
  GENERAL_REQUEST_APPROVAL_STATUS,
  GENERAL_REQUEST_STATUS,
  type GeneralRequestApprovalStatus,
} from "@/db/constants/general-request";
import { generalRequestApprovalTable, generalRequestTable } from "@/db/schema";

import { and, eq } from "drizzle-orm";

type ReviewGeneralRequestParams = {
  generalRequestId: string;
  reviewerId: string;
  approvalLevel: 1 | 2;
  reviewStatus: GeneralRequestApprovalStatus;
  comment?: string;
};

export async function reviewGeneralRequestService({
  generalRequestId,
  reviewerId,
  approvalLevel,
  reviewStatus,
  comment,
}: ReviewGeneralRequestParams) {
  return db.transaction(async (tx) => {
    const generalRequest = await tx.query.generalRequestTable.findFirst({
      where: eq(generalRequestTable.id, generalRequestId),
    });

    if (!generalRequest) {
      throw new Error("General request not found.");
    }

    const expectedRequestStatus =
      approvalLevel === 1
        ? GENERAL_REQUEST_STATUS.PENDING_FIRST_APPROVAL
        : GENERAL_REQUEST_STATUS.PENDING_SECOND_APPROVAL;

    if (generalRequest.status !== expectedRequestStatus) {
      throw new Error("This general request is not waiting for your review.");
    }

    if (
      reviewStatus === GENERAL_REQUEST_APPROVAL_STATUS.REJECTED &&
      !comment?.trim()
    ) {
      throw new Error("A rejection comment is required.");
    }

    const existingReview = await tx.query.generalRequestApprovalTable.findFirst(
      {
        where: and(
          eq(generalRequestApprovalTable.generalRequestId, generalRequestId),
          eq(generalRequestApprovalTable.revision, generalRequest.revision),
          eq(generalRequestApprovalTable.approvalLevel, approvalLevel),
        ),
      },
    );

    if (existingReview) {
      throw new Error(
        "This approval level has already reviewed this revision.",
      );
    }

    const now = new Date();

    const [review] = await tx
      .insert(generalRequestApprovalTable)
      .values({
        generalRequestId,
        reviewerId,
        approvalLevel,
        revision: generalRequest.revision,
        status: reviewStatus,
        comment: comment?.trim() || null,
        reviewedAt: now,
      })
      .returning();

    const nextStatus =
      reviewStatus === GENERAL_REQUEST_APPROVAL_STATUS.REJECTED
        ? GENERAL_REQUEST_STATUS.REJECTED
        : approvalLevel === 1
          ? GENERAL_REQUEST_STATUS.PENDING_SECOND_APPROVAL
          : GENERAL_REQUEST_STATUS.APPROVED;

    const [updatedRequest] = await tx
      .update(generalRequestTable)
      .set({
        status: nextStatus,
        reviewedById: reviewerId,
        reviewerComment: comment?.trim() || null,
        reviewedAt: now,
        updatedAt: now,
      })
      .where(
        and(
          eq(generalRequestTable.id, generalRequestId),
          eq(generalRequestTable.status, expectedRequestStatus),
          eq(generalRequestTable.revision, generalRequest.revision),
        ),
      )
      .returning();

    if (!updatedRequest) {
      throw new Error("The request changed before the review completed.");
    }

    return {
      request: updatedRequest,
      review,
    };
  });
}
