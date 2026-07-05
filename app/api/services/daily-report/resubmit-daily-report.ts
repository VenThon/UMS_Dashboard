import { db } from "@/db";
import { DAILY_REPORT_STATUS } from "@/db/constants/daily-report-status";
import { dailyReportTable } from "@/db/schema/daily-report";

import { and, eq, inArray } from "drizzle-orm";

type SubmitDailyReportParams = {
  id: string;
  userId: string;
};

export async function submitDailyReportService({
  id,
  userId,
}: SubmitDailyReportParams) {
  const [report] = await db
    .update(dailyReportTable)
    .set({
      status: DAILY_REPORT_STATUS.PENDING,
      reviewedById: null,
      reviewComment: null,
      reviewedAt: null,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(dailyReportTable.id, id),
        eq(dailyReportTable.userId, userId),
        inArray(dailyReportTable.status, [
          DAILY_REPORT_STATUS.DRAFT,
          DAILY_REPORT_STATUS.REJECTED,
        ]),
      ),
    )
    .returning();

  if (!report) {
    throw new Error("Only draft or rejected reports can be submitted.");
  }

  return report;
}
