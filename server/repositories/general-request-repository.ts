// // src/server/repositories/general-request-repository.ts
// import { count, eq, inArray } from "drizzle-orm";
// import { generalRequestTable } from "@/db/schema/general-request";
// import { db } from "@/db";
// import { GENERAL_REQUEST_STATUS } from "@/db/constants/general-request";
// export async function getGeneralRequestSummaryRepository() {
//   const [totalResult, pendingResult, approvedResult, rejectedResult] =
//     await Promise.all([
//       db
//         .select({
//           total: count(),
//         })
//         .from(generalRequestTable),
//       db
//         .select({
//           total: count(),
//         })
//         .from(generalRequestTable)
//         .where(
//           inArray(generalRequestTable.status, [
//             GENERAL_REQUEST_STATUS.PENDING_FIRST_APPROVAL,
//             GENERAL_REQUEST_STATUS.PENDING_SECOND_APPROVAL,
//           ]),
//         ),
//       db
//         .select({
//           total: count(),
//         })
//         .from(generalRequestTable)
//         .where(eq(generalRequestTable.status, GENERAL_REQUEST_STATUS.APPROVED)),
//       db
//         .select({
//           total: count(),
//         })
//         .from(generalRequestTable)
//         .where(eq(generalRequestTable.status, GENERAL_REQUEST_STATUS.REJECTED)),
//     ]);
//   return {
//     totalGeneralRequests: Number(totalResult[0]?.total ?? 0),
//     totalPendingRequests: Number(pendingResult[0]?.total ?? 0),
//     totalApprovedRequests: Number(approvedResult[0]?.total ?? 0),
//     totalRejectedRequests: Number(rejectedResult[0]?.total ?? 0),
//   };
// }
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
