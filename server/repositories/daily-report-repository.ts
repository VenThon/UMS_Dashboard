import { db } from "@/db";
import { DAILY_REPORT_STATUS } from "@/db/constants/daily-report-status";
import { dailyReportTable } from "@/db/schema";

import { sql } from "drizzle-orm";

export async function getDailyReportSummaryRepository() {
  const [result] = await db
    .select({
      totalDailyReports: sql<number>`
        count(*)
      `,

      totalPendingReports: sql<number>`
        count(*) filter (
          where ${dailyReportTable.status}
          = ${DAILY_REPORT_STATUS.PENDING}
        )
      `,

      totalApprovedReports: sql<number>`
        count(*) filter (
          where ${dailyReportTable.status}
          = ${DAILY_REPORT_STATUS.APPROVED}
        )
      `,

      totalRejectedReports: sql<number>`
        count(*) filter (
          where ${dailyReportTable.status}
          = ${DAILY_REPORT_STATUS.REJECTED}
        )
      `,
    })
    .from(dailyReportTable);

  return {
    totalDailyReports: Number(result?.totalDailyReports ?? 0),
    totalPendingReports: Number(result?.totalPendingReports ?? 0),
    totalApprovedReports: Number(result?.totalApprovedReports ?? 0),
    totalRejectedReports: Number(result?.totalRejectedReports ?? 0),
  };
}
