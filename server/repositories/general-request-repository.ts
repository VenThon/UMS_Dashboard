import { db } from "@/db";
import { GENERAL_REQUEST_STATUS } from "@/db/constants/general-request";
import { generalRequestTable } from "@/db/schema/general-request";

import { sql } from "drizzle-orm";

export async function getGeneralRequestSummaryRepository() {
  const [result] = await db
    .select({
      totalGeneralRequests: sql<number>`
        count(*)
      `,

      totalPendingRequests: sql<number>`
        count(*) filter (
          where ${generalRequestTable.status} in (
            ${GENERAL_REQUEST_STATUS.PENDING_FIRST_APPROVAL},
            ${GENERAL_REQUEST_STATUS.PENDING_SECOND_APPROVAL}
          )
        )
      `,

      totalApprovedRequests: sql<number>`
        count(*) filter (
          where ${generalRequestTable.status}
          = ${GENERAL_REQUEST_STATUS.APPROVED}
        )
      `,

      totalRejectedRequests: sql<number>`
        count(*) filter (
          where ${generalRequestTable.status}
          = ${GENERAL_REQUEST_STATUS.REJECTED}
        )
      `,
    })
    .from(generalRequestTable);

  return {
    totalGeneralRequests: Number(result?.totalGeneralRequests ?? 0),
    totalPendingRequests: Number(result?.totalPendingRequests ?? 0),
    totalApprovedRequests: Number(result?.totalApprovedRequests ?? 0),
    totalRejectedRequests: Number(result?.totalRejectedRequests ?? 0),
  };
}
