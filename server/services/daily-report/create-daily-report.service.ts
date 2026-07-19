import { db } from "@/db";
import { dailyReportTable } from "@/db/schema/daily-report";
import { CreateDailyReportValues } from "@/db/validation/dialyreport";

import { format } from "date-fns";
import { and, eq } from "drizzle-orm";

type CreateDailyReportServiceParams = {
  userId: string;
  values: CreateDailyReportValues;
};
function formatDateForDb(date: Date) {
  return date.toISOString().split("T")[0];
}

export async function createDailyReportService({
  values,
  userId,
}: CreateDailyReportServiceParams) {
  const reportDate = formatDateForDb(values.reportDate);
  const existingReport = await db.query.dailyReportTable.findFirst({
    where: and(
      eq(dailyReportTable.userId, userId),
      eq(dailyReportTable.reportDate, reportDate),
    ),
  });

  if (existingReport) {
    throw new Error("You already submitted a report for this date.");
  }

  const [report] = await db
    .insert(dailyReportTable)
    .values({
      userId,
      projectName: values.projectName,
      reportDate: format(values.reportDate, "yyyy-MM-dd"),
      previousTasks: values.previousTasks,
      completedTasks: values.completedTasks,
      inProgressTasks: values.inProgressTasks,
      blockers: values.blockers,
      tomorrowPlan: values.tomorrowPlan,
      remarks: values.remarks,
      status: values.status,
    })
    .returning();

  return report;
}
