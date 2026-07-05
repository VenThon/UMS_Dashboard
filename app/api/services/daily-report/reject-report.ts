import { db } from "@/db";
import {
  DAILY_REPORT_STATUS,
  REVIEW_REPORT_STATUS,
} from "@/db/constants/daily-report-status";
import { dailyReportTable } from "@/db/schema/daily-report";
import { reviewDailyReportTable } from "@/db/schema/daily-report-review";

import { and, eq } from "drizzle-orm";

type RejectDailyReportParams = {
  id: string;
  reviewerId: string;
  comment: string;
};

export async function rejectDailyReportService({
  id,
  reviewerId,
  comment,
}: RejectDailyReportParams) {
  const result = await db.transaction(async (tx) => {
    const [updatedReport] = await tx
      .update(dailyReportTable)
      .set({
        status: DAILY_REPORT_STATUS.REJECTED,
        reviewedById: reviewerId,
        reviewComment: comment,
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

    if (!updatedReport) {
      throw new Error("Only pending reports can be rejected.");
    }

    const [review] = await tx
      .insert(reviewDailyReportTable)
      .values({
        dailyReportId: id,
        reviewerId,
        status: REVIEW_REPORT_STATUS.REJECTED,
        comment,
      })
      .returning();

    return {
      report: updatedReport,
      review,
    };
  });

  return result;
}
