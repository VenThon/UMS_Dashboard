import { db } from "@/db";
import { DAILY_REPORT_STATUS } from "@/db/constants/daily-report-status";
import { dailyReportTable } from "@/db/schema/daily-report";

import { eq } from "drizzle-orm";

type DeleteDailyReportParams = {
  id: string;
  userId: string;
};

export async function deleteDailyReportService({
  id,
  userId,
}: DeleteDailyReportParams) {
  const report = await db.query.dailyReportTable.findFirst({
    where: eq(dailyReportTable.id, id),
  });

  if (!report) {
    throw new Error("Daily report not found.");
  }

  if (report.userId !== userId) {
    throw new Error("You can only delete your own report.");
  }

  if (report.status === DAILY_REPORT_STATUS.APPROVED) {
    throw new Error("Approved reports cannot be deleted.");
  }

  const [deletedReport] = await db
    .delete(dailyReportTable)
    .where(eq(dailyReportTable.id, id))
    .returning();

  return deletedReport;
}
