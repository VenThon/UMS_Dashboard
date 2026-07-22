import { db } from "@/db";
import { REQUEST_LEAVE_STATUS } from "@/db/constants/request-leave-status";
import { requestLeaveTable } from "@/db/schema";

import { and, eq, inArray } from "drizzle-orm";

type CancelRequestLeaveParams = {
  id: string;
  userId: string;
};

export async function cancelRequestLeaveService({
  id,
  userId,
}: CancelRequestLeaveParams) {
  const cancellableStatuses = [
    REQUEST_LEAVE_STATUS.PENDING_FIRST_APPROVAL,
    REQUEST_LEAVE_STATUS.PENDING_SECOND_APPROVAL,
  ];

  const [cancelledRequestLeave] = await db
    .update(requestLeaveTable)
    .set({
      status: REQUEST_LEAVE_STATUS.CANCELLED,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(requestLeaveTable.id, id),
        eq(requestLeaveTable.userId, userId),
        inArray(requestLeaveTable.status, cancellableStatuses),
      ),
    )
    .returning();

  if (!cancelledRequestLeave) {
    throw new Error(
      "Leave request not found, not owned by you, or cannot be cancelled.",
    );
  }

  return cancelledRequestLeave;
}
