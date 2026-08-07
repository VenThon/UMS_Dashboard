import { db } from "@/db";
import { generalRequestTable } from "@/db/schema";
import { USER_ROLE, type UserRole } from "@/db/types/user.type";

import { eq } from "drizzle-orm";

type GetGeneralRequestByIdParams = {
  generalRequestId: string;
  currentUserId: string;
  currentUserRole: UserRole;
};

export async function getGeneralRequestByIdService({
  generalRequestId,
  currentUserId,
  currentUserRole,
}: GetGeneralRequestByIdParams) {
  const generalRequest = await db.query.generalRequestTable.findFirst({
    where: eq(generalRequestTable.id, generalRequestId),
  });

  if (!generalRequest) {
    throw new Error("General request not found.");
  }

  const isOwner = generalRequest.userId === currentUserId;

  const isApprover =
    currentUserRole === USER_ROLE.LEAD_FRONTEND ||
    currentUserRole === USER_ROLE.IT_MANAGER;

  if (!isOwner && !isApprover) {
    throw new Error("You do not have permission to view this general request.");
  }

  return generalRequest;
}
