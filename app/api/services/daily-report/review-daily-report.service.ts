import { db } from "@/db";
import {
  DAILY_REPORT_STATUS,
  REVIEW_REPORT_STATUS,
} from "@/db/constants/daily-report-status";
import { dailyReportTable } from "@/db/schema/daily-report";
import { reviewDailyReportTable } from "@/db/schema/daily-report-review";
import type { ReviewDailyReportFormValues } from "@/db/schema/daily-report-review";

import { and, eq } from "drizzle-orm";

type ReviewDailyReportParams = {
  id: string;
  reviewerId: string;
  values: ReviewDailyReportFormValues;
};

export async function reviewDailyReportService({
  id,
  reviewerId,
  values,
}: ReviewDailyReportParams) {
  const nextReportStatus =
    values.status === REVIEW_REPORT_STATUS.APPROVED
      ? DAILY_REPORT_STATUS.APPROVED
      : DAILY_REPORT_STATUS.REJECTED;

  const result = await db.transaction(async (tx) => {
    const [updatedReport] = await tx
      .update(dailyReportTable)
      .set({
        status: nextReportStatus,
        reviewedById: reviewerId,
        reviewComment: values.comment ?? null,
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
      throw new Error("Only pending reports can be reviewed.");
    }

    const [review] = await tx
      .insert(reviewDailyReportTable)
      .values({
        dailyReportId: id,
        reviewerId,
        status: values.status,
        comment: values.comment ?? null,
      })
      .returning();

    return {
      report: updatedReport,
      review,
    };
  });

  return result;
}
