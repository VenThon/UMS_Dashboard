import { db } from "@/db";
import { GENERAL_REQUEST_STATUS } from "@/db/constants/general-request";
import { generalRequestTable } from "@/db/schema";

import { and, eq, inArray } from "drizzle-orm";

type CancelGeneralRequestParams = {
  generalRequestId: string;
  userId: string;
};

export async function cancelGeneralRequestService({
  generalRequestId,
  userId,
}: CancelGeneralRequestParams) {
  const [cancelledRequest] = await db
    .update(generalRequestTable)
    .set({
      status: GENERAL_REQUEST_STATUS.CANCELLED,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(generalRequestTable.id, generalRequestId),
        eq(generalRequestTable.userId, userId),
        inArray(generalRequestTable.status, [
          GENERAL_REQUEST_STATUS.PENDING_FIRST_APPROVAL,
          GENERAL_REQUEST_STATUS.PENDING_SECOND_APPROVAL,
        ]),
      ),
    )
    .returning();

  if (!cancelledRequest) {
    throw new Error("General request not found or cannot be cancelled.");
  }

  return cancelledRequest;
}
