// src/server/services/general-request/create-general-request.ts
import { db } from "@/db";
import { generalRequestTable } from "@/db/schema";
import type { CreateGeneralRequestValue } from "@/db/validation/general-request";

type CreateGeneralRequestParams = {
  userId: string;
  values: CreateGeneralRequestValue;
};

export async function createGeneralRequestService({
  userId,
  values,
}: CreateGeneralRequestParams) {
  const [createdRequest] = await db
    .insert(generalRequestTable)
    .values({
      userId,
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
      status: values.status,
    })
    .returning();

  if (!createdRequest) {
    throw new Error("Failed to create general request.");
  }

  return createdRequest;
}
