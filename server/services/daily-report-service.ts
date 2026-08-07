import { getDailyReportSummaryRepository } from "@/server/repositories/daily-report-repository";

export async function getDailyReportSummary() {
  return getDailyReportSummaryRepository();
}
