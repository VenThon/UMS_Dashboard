import { db } from "@/db";
import { GENERAL_REQUEST_STATUS } from "@/db/constants/general-request";
import { generalRequestTable } from "@/db/schema";
import type { UpdateGeneralRequestValue } from "@/db/validation/general-request";

import { and, eq, inArray } from "drizzle-orm";

type UpdateGeneralRequestParams = {
  generalRequestId: string;
  userId: string;
  values: UpdateGeneralRequestValue;
};

export async function updateGeneralRequestService({
  generalRequestId,
  userId,
  values,
}: UpdateGeneralRequestParams) {
  const [updatedRequest] = await db
    .update(generalRequestTable)
    .set({
      requestType: values.requestType,
      title: values.title,
      description: values.description,
      reason: values.reason,
      expectedBenefit: values.expectedBenefit,
      priority: values.priority,
      requiredDate: values.requiredDate === "" ? null : values.requiredDate,
      estimatedCost:
        values.estimatedCost !== undefined
          ? values.estimatedCost.toString()
          : undefined,
      currency: values.currency,
      attachments: values.attachments,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(generalRequestTable.id, generalRequestId),
        eq(generalRequestTable.userId, userId),
        inArray(generalRequestTable.status, [
          GENERAL_REQUEST_STATUS.DRAFT,
          GENERAL_REQUEST_STATUS.PENDING_FIRST_APPROVAL,
        ]),
      ),
    )
    .returning();

  if (!updatedRequest) {
    throw new Error("General request not found or cannot be updated.");
  }

  return updatedRequest;
}
