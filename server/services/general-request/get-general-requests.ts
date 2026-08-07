import { db } from "@/db";
import {
  GENERAL_REQUEST_STATUS,
  type GeneralRequestStatus,
} from "@/db/constants/general-request";
import { generalRequestApprovalTable, generalRequestTable } from "@/db/schema";
import { USER_ROLE, type UserRole } from "@/db/types/user.type";

import { type SQL, and, countDistinct, desc, eq, ilike, or } from "drizzle-orm";

type GetGeneralRequestsParams = {
  currentUserId: string;
  currentUserRole: UserRole;
  page: number;
  pageSize: number;
  status?: GeneralRequestStatus;
  search?: string;
};

export async function getGeneralRequestsService({
  currentUserId,
  currentUserRole,
  page,
  pageSize,
  status,
  search,
}: GetGeneralRequestsParams) {
  const safePage = Math.max(page, 1);
  const safePageSize = Math.min(Math.max(pageSize, 1), 100);
  const offset = (safePage - 1) * safePageSize;

  const conditions: SQL[] = [];

  const isFirstApprover = currentUserRole === USER_ROLE.LEAD_FRONTEND;

  const isSecondApprover = currentUserRole === USER_ROLE.IT_MANAGER;

  if (isFirstApprover) {
    conditions.push(
      or(
        eq(
          generalRequestTable.status,
          GENERAL_REQUEST_STATUS.PENDING_FIRST_APPROVAL,
        ),
        and(
          eq(generalRequestApprovalTable.reviewerId, currentUserId),
          eq(generalRequestApprovalTable.approvalLevel, 1),
        ),
      )!,
    );
  } else if (isSecondApprover) {
    conditions.push(
      or(
        eq(
          generalRequestTable.status,
          GENERAL_REQUEST_STATUS.PENDING_SECOND_APPROVAL,
        ),
        and(
          eq(generalRequestApprovalTable.reviewerId, currentUserId),
          eq(generalRequestApprovalTable.approvalLevel, 2),
        ),
      )!,
    );
  } else {
    conditions.push(eq(generalRequestTable.userId, currentUserId));
  }

  if (status) {
    conditions.push(eq(generalRequestTable.status, status));
  }

  if (search) {
    conditions.push(
      or(
        ilike(generalRequestTable.title, `%${search}%`),
        ilike(generalRequestTable.description, `%${search}%`),
      )!,
    );
  }

  const whereCondition = and(...conditions);

  const [requests, countResult] = await Promise.all([
    db
      .selectDistinct({
        id: generalRequestTable.id,
        userId: generalRequestTable.userId,
        requestType: generalRequestTable.requestType,
        title: generalRequestTable.title,
        description: generalRequestTable.description,
        reason: generalRequestTable.reason,
        expectedBenefit: generalRequestTable.expectedBenefit,
        priority: generalRequestTable.priority,
        requiredDate: generalRequestTable.requiredDate,
        estimatedCost: generalRequestTable.estimatedCost,
        currency: generalRequestTable.currency,
        attachments: generalRequestTable.attachments,
        status: generalRequestTable.status,
        revision: generalRequestTable.revision,
        reviewedById: generalRequestTable.reviewedById,
        reviewerComment: generalRequestTable.reviewerComment,
        reviewedAt: generalRequestTable.reviewedAt,
        createdAt: generalRequestTable.createdAt,
        updatedAt: generalRequestTable.updatedAt,
      })
      .from(generalRequestTable)
      .leftJoin(
        generalRequestApprovalTable,
        eq(
          generalRequestApprovalTable.generalRequestId,
          generalRequestTable.id,
        ),
      )
      .where(whereCondition)
      .orderBy(desc(generalRequestTable.createdAt))
      .limit(safePageSize)
      .offset(offset),

    db
      .select({
        total: countDistinct(generalRequestTable.id),
      })
      .from(generalRequestTable)
      .leftJoin(
        generalRequestApprovalTable,
        eq(
          generalRequestApprovalTable.generalRequestId,
          generalRequestTable.id,
        ),
      )
      .where(whereCondition),
  ]);

  const totalItems = Number(countResult[0]?.total ?? 0);
  const totalPages = Math.ceil(totalItems / safePageSize);

  return {
    data: requests,
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
