import { db } from "@/db";
import { DAILY_REPORT_STATUS } from "@/db/constants/daily-report-status";
import { dailyReportTable } from "@/db/schema/daily-report";
import type { CreateDailyReportValues } from "@/db/validation/dialyreport";

import { format } from "date-fns";
import { and, eq } from "drizzle-orm";

type UpdateDailyReportParams = {
  id: string;
  userId: string;
  values: CreateDailyReportValues;
};

export async function updateDailyReportService({
  id,
  userId,
  values,
}: UpdateDailyReportParams) {
  const report = await db.query.dailyReportTable.findFirst({
    where: and(
      eq(dailyReportTable.id, id),
      eq(dailyReportTable.userId, userId),
    ),
  });

  if (!report) {
    throw new Error("Daily report not found or you cannot update this report.");
  }

  if (report.status === DAILY_REPORT_STATUS.APPROVED) {
    throw new Error("Approved reports cannot be updated.");
  }

  const [updatedReport] = await db
    .update(dailyReportTable)
    .set({
      projectName: values.projectName,
      reportDate: format(values.reportDate, "yyyy-MM-dd"),
      previousTasks: values.previousTasks,
      completedTasks: values.completedTasks,
      inProgressTasks: values.inProgressTasks,
      blockers: values.blockers ?? null,
      tomorrowPlan: values.tomorrowPlan,
      remarks: values.remarks ?? null,

      status: DAILY_REPORT_STATUS.PENDING,
      reviewedById: null,
      reviewComment: null,
      reviewedAt: null,
      updatedAt: new Date(),
    })
    .where(
      and(eq(dailyReportTable.id, id), eq(dailyReportTable.userId, userId)),
    )
    .returning();

  if (!updatedReport) {
    throw new Error("Failed to update daily report.");
  }

  return updatedReport;
}
