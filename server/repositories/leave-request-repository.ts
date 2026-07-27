// import { count, eq, inArray } from "drizzle-orm";
// import { db } from "@/db";
// import { REQUEST_LEAVE_STATUS } from "@/db/constants/request-leave-status";
// import { requestLeaveTable } from "@/db/schema";
// export async function getLeaveRequestSummaryRepository() {
//   const [totalResult, pendingResult, approvedResult, rejectedResult] =
//     await Promise.all([
//       db
//         .select({
//           total: count(),
//         })
//         .from(requestLeaveTable),
//       db
//         .select({
//           total: count(),
//         })
//         .from(requestLeaveTable)
//         .where(
//           inArray(requestLeaveTable.status, [
//             REQUEST_LEAVE_STATUS.PENDING_FIRST_APPROVAL,
//             REQUEST_LEAVE_STATUS.PENDING_SECOND_APPROVAL,
//           ]),
//         ),
//       db
//         .select({
//           total: count(),
//         })
//         .from(requestLeaveTable)
//         .where(eq(requestLeaveTable.status, REQUEST_LEAVE_STATUS.APPROVED)),
//       db
//         .select({
//           total: count(),
//         })
//         .from(requestLeaveTable)
//         .where(eq(requestLeaveTable.status, REQUEST_LEAVE_STATUS.REJECTED)),
//     ]);
//   return {
//     totalGeneralRequests: Number(totalResult[0]?.total ?? 0),
//     totalPendingRequests: Number(pendingResult[0]?.total ?? 0),
//     totalApprovedRequests: Number(approvedResult[0]?.total ?? 0),
//     totalRejectedRequests: Number(rejectedResult[0]?.total ?? 0),
//   };
// }
// src/server/repositories/request-leave-repository.ts
import { db } from "@/db";
import { REQUEST_LEAVE_STATUS } from "@/db/constants/request-leave-status";
import { requestLeaveTable } from "@/db/schema";

import { sql } from "drizzle-orm";

export async function getRequestLeaveSummaryRepository() {
  const [result] = await db
    .select({
      totalLeaveRequests: sql<number>`
        count(*)
      `,

      totalPendingRequests: sql<number>`
        count(*) filter (
          where ${requestLeaveTable.status} in (
            ${REQUEST_LEAVE_STATUS.PENDING_SECOND_APPROVAL},
            ${REQUEST_LEAVE_STATUS.PENDING_FIRST_APPROVAL}
          )
        )
      `,

      totalApprovedRequests: sql<number>`
        count(*) filter (
          where ${requestLeaveTable.status}
          = ${REQUEST_LEAVE_STATUS.APPROVED}
        )
      `,

      totalRejectedRequests: sql<number>`
        count(*) filter (
          where ${requestLeaveTable.status}
          = ${REQUEST_LEAVE_STATUS.REJECTED}
        )
      `,
    })
    .from(requestLeaveTable);

  return {
    totalLeaveRequests: Number(result?.totalLeaveRequests ?? 0),
    totalPendingRequests: Number(result?.totalPendingRequests ?? 0),
    totalApprovedRequests: Number(result?.totalApprovedRequests ?? 0),
    totalRejectedRequests: Number(result?.totalRejectedRequests ?? 0),
  };
}
