import { db } from "@/db";
import { GENERAL_REQUEST_STATUS } from "@/db/constants/general-request";
import { generalRequestTable } from "@/db/schema";
import type { ResubmitGeneralRequestValue } from "@/db/validation/general-request";

import { and, eq } from "drizzle-orm";

type ResubmitGeneralRequestParams = {
  generalRequestId: string;
  userId: string;
  values: ResubmitGeneralRequestValue;
};

export async function resubmitGeneralRequestService({
  generalRequestId,
  userId,
  values,
}: ResubmitGeneralRequestParams) {
  return db.transaction(async (tx) => {
    const generalRequest = await tx.query.generalRequestTable.findFirst({
      where: and(
        eq(generalRequestTable.id, generalRequestId),
        eq(generalRequestTable.userId, userId),
      ),
    });

    if (!generalRequest) {
      throw new Error("General request not found or access denied.");
    }

    if (generalRequest.status !== GENERAL_REQUEST_STATUS.REJECTED) {
      throw new Error("Only rejected requests can be resubmitted.");
    }

    const [resubmittedRequest] = await tx
      .update(generalRequestTable)
      .set({
        requestType: values.requestType,
        title: values.title,
        description: values.description,
        reason: values.reason,
        expectedBenefit: values.expectedBenefit,
        priority: values.priority,
        requiredDate: values.requiredDate || null,
        estimatedCost:
          values.estimatedCost !== undefined
            ? values.estimatedCost.toString()
            : null,
        currency: values.currency ?? null,
        attachments: values.attachments ?? [],

        revision: generalRequest.revision + 1,
        status: GENERAL_REQUEST_STATUS.PENDING_FIRST_APPROVAL,

        reviewedById: null,
        reviewerComment: null,
        reviewedAt: null,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(generalRequestTable.id, generalRequestId),
          eq(generalRequestTable.userId, userId),
          eq(generalRequestTable.status, GENERAL_REQUEST_STATUS.REJECTED),
          eq(generalRequestTable.revision, generalRequest.revision),
        ),
      )
      .returning();

    if (!resubmittedRequest) {
      throw new Error("The request changed before it could be resubmitted.");
    }

    return resubmittedRequest;
  });
}
