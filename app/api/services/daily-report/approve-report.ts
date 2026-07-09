import { db } from "@/db";
import { DAILY_REPORT_STATUS } from "@/db/constants/daily-report-status";
import { dailyReportTable } from "@/db/schema/daily-report";

import { and, eq } from "drizzle-orm";

type ApproveDailyReportParams = {
  id: string;
  reviewerId: string;
};

export async function approveDailyReportServiceAPI({
  id,
  reviewerId,
}: ApproveDailyReportParams) {
  const [report] = await db
    .update(dailyReportTable)
    .set({
      status: DAILY_REPORT_STATUS.APPROVED,
      reviewedById: reviewerId,
      reviewComment: null,
      reviewedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(dailyReportTable.id, id),
        eq(dailyReportTable.status, DAILY_REPORT_STATUS.PENDING),
      ),
    )
    .returning();

  if (!report) {
    throw new Error("Only pending reports can be approved.");
  }

  return report;
}
