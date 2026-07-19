import { db } from "@/db";
import {
  REQUEST_LEAVE_STATUS,
  RequestLeaveStatus,
} from "@/db/constants/request-leave-status";
import { requestLeaveTable } from "@/db/schema";
import { USER_ROLE } from "@/db/types/user.type";

import { eq } from "drizzle-orm";

type GetRequestLeaveByIdParams = {
  id: string;
  currentUserId: string;
  currentUserRole: string;
};

export async function getRequestLeaveByIdService({
  id,
  currentUserId,
  currentUserRole,
}: GetRequestLeaveByIdParams) {
  const requestLeave = await db.query.requestLeaveTable.findFirst({
    where: eq(requestLeaveTable.id, id),
  });

  if (!requestLeave) {
    throw new Error("Leave request not found.");
  }

  const isOwner = requestLeave.userId === currentUserId;

  const isFirstApprover = currentUserRole === USER_ROLE.LEAD_FRONTEND;

  const isSecondApprover = currentUserRole === USER_ROLE.IT_MANAGER;

  const firstApproverVisibleStatuses: RequestLeaveStatus[] = [
    REQUEST_LEAVE_STATUS.PENDING_FIRST_APPROVAL,
    REQUEST_LEAVE_STATUS.PENDING_SECOND_APPROVAL,
    REQUEST_LEAVE_STATUS.APPROVED,
    REQUEST_LEAVE_STATUS.REJECTED,
    REQUEST_LEAVE_STATUS.CANCELLED,
  ];

  const secondApproverVisibleStatuses: RequestLeaveStatus[] = [
    REQUEST_LEAVE_STATUS.PENDING_SECOND_APPROVAL,
    REQUEST_LEAVE_STATUS.APPROVED,
    REQUEST_LEAVE_STATUS.REJECTED,
    REQUEST_LEAVE_STATUS.CANCELLED,
  ];

  const canFirstApproverView =
    isFirstApprover &&
    firstApproverVisibleStatuses.includes(requestLeave.status);

  const canSecondApproverView =
    isSecondApprover &&
    secondApproverVisibleStatuses.includes(requestLeave.status);

  if (!isOwner && !canFirstApproverView && !canSecondApproverView) {
    throw new Error("You do not have permission to view this leave request.");
  }

  return requestLeave;
}
