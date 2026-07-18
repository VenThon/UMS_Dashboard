import { db } from "@/db";
import { REQUEST_LEAVE_STATUS } from "@/db/constants/request-leave-status";
import { requestLeaveTable } from "@/db/schema";

import { eq } from "drizzle-orm";

type DeleteRequestLeaveSParams = {
  id: string;
  userId: string;
};

export async function deleteRequestLeaveService({
  id,
  userId,
}: DeleteRequestLeaveSParams) {
  const requestLeave = await db.query.requestLeaveTable.findFirst({
    where: eq(requestLeaveTable.id, id),
  });

  if (!requestLeave) {
    throw new Error("Leave request not found.");
  }

  if (requestLeave.userId !== userId) {
    throw new Error("You can only delete your own leave request.");
  }

  if (requestLeave.status === REQUEST_LEAVE_STATUS.APPROVED) {
    throw new Error("Approved reports cannot be deleted.");
  }

  const [deletedRequestLeave] = await db
    .delete(requestLeaveTable)
    .where(eq(requestLeaveTable.id, id))
    .returning();

  return deletedRequestLeave;
}
