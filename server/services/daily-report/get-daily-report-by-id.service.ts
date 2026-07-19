import { db } from "@/db";
import { dailyReportTable } from "@/db/schema/daily-report";

import { eq } from "drizzle-orm";

export async function getDailyReportByIdService(id: string) {
  const report = await db.query.dailyReportTable.findFirst({
    where: eq(dailyReportTable.id, id),
  });

  if (!report) {
    throw new Error("Daily report not found.");
  }

  return report;
}
