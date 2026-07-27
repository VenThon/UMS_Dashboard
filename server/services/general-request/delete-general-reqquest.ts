import { db } from "@/db";
import { GENERAL_REQUEST_STATUS } from "@/db/constants/general-request";
import { generalRequestTable } from "@/db/schema";

import { and, eq } from "drizzle-orm";

type DeleteGeneralRequestParams = {
  generalRequestId: string;
  userId: string;
};

export async function deleteGeneralRequestService({
  generalRequestId,
  userId,
}: DeleteGeneralRequestParams) {
  const [deletedRequest] = await db
    .delete(generalRequestTable)
    .where(
      and(
        eq(generalRequestTable.id, generalRequestId),
        eq(generalRequestTable.userId, userId),
        eq(generalRequestTable.status, GENERAL_REQUEST_STATUS.DRAFT),
      ),
    )
    .returning();

  if (!deletedRequest) {
    throw new Error(
      "General request not found. Only draft requests can be deleted.",
    );
  }

  return deletedRequest;
}
