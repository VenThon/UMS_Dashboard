import { db } from "@/db";
import {
  REQUEST_LEAVE_STATUS,
  type RequestLeaveStatus,
} from "@/db/constants/request-leave-status";
import { requestLeaveApprovalTable, requestLeaveTable } from "@/db/schema";
import { USER_ROLE } from "@/db/types/user.type";

import { type SQL, and, countDistinct, desc, eq, or } from "drizzle-orm";

type GetRequestLeaveListParams = {
  currentUserId: string;
  currentUserRole: string;
  page: number;
  pageSize: number;
  status?: RequestLeaveStatus;
};

export async function getRequestLeaveListService({
  currentUserId,
  currentUserRole,
  page,
  pageSize,
  status,
}: GetRequestLeaveListParams) {
  const safePage = Math.max(page, 1);
  const safePageSize = Math.min(Math.max(pageSize, 1), 100);
  const offset = (safePage - 1) * safePageSize;

  const conditions: SQL[] = [];

  const isFirstApprover = currentUserRole === USER_ROLE.LEAD_FRONTEND;

  const isSecondApprover = currentUserRole === USER_ROLE.IT_MANAGER;

  if (isFirstApprover) {
    conditions.push(
      or(
        // Requests currently waiting for the first approver
        eq(
          requestLeaveTable.status,
          REQUEST_LEAVE_STATUS.PENDING_FIRST_APPROVAL,
        ),

        // Requests already reviewed by this first approver
        and(
          eq(requestLeaveApprovalTable.reviewerId, currentUserId),
          eq(requestLeaveApprovalTable.approvalLevel, 1),
        ),
      )!,
    );
  } else if (isSecondApprover) {
    conditions.push(
      or(
        // Requests currently waiting for the second approver
        eq(
          requestLeaveTable.status,
          REQUEST_LEAVE_STATUS.PENDING_SECOND_APPROVAL,
        ),

        // Requests already reviewed by this second approver
        and(
          eq(requestLeaveApprovalTable.reviewerId, currentUserId),
          eq(requestLeaveApprovalTable.approvalLevel, 2),
        ),
      )!,
    );
  } else {
    // Normal users see only their own requests
    conditions.push(eq(requestLeaveTable.userId, currentUserId));
  }

  if (status) {
    conditions.push(eq(requestLeaveTable.status, status));
  }

  const whereCondition = and(...conditions);

  const [items, totalResult] = await Promise.all([
    db
      .selectDistinct({
        id: requestLeaveTable.id,
        userId: requestLeaveTable.userId,
        leaveType: requestLeaveTable.leaveType,
        startDate: requestLeaveTable.startDate,
        endDate: requestLeaveTable.endDate,
        durationType: requestLeaveTable.durationType,
        reason: requestLeaveTable.reason,
        status: requestLeaveTable.status,
        revision: requestLeaveTable.revision,
        reviewedAt: requestLeaveTable.reviewedAt,
        createdAt: requestLeaveTable.createdAt,
        updatedAt: requestLeaveTable.updatedAt,
      })
      .from(requestLeaveTable)
      .leftJoin(
        requestLeaveApprovalTable,
        eq(requestLeaveApprovalTable.requestLeaveId, requestLeaveTable.id),
      )
      .where(whereCondition)
      .orderBy(desc(requestLeaveTable.createdAt))
      .limit(safePageSize)
      .offset(offset),

    db
      .select({
        total: countDistinct(requestLeaveTable.id),
      })
      .from(requestLeaveTable)
      .leftJoin(
        requestLeaveApprovalTable,
        eq(requestLeaveApprovalTable.requestLeaveId, requestLeaveTable.id),
      )
      .where(whereCondition),
  ]);

  const totalItems = Number(totalResult[0]?.total ?? 0);
  const totalPages = Math.ceil(totalItems / safePageSize);

  return {
    data: items,
    pagination: {
      page: safePage,
      pageSize: safePageSize,
      totalItems,
      totalPages,
      hasNextPage: safePage < totalPages,
      hasPreviousPage: safePage > 1,
    },
  };
}
