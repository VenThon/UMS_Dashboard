import { db } from "@/db";
import { dailyReportTable } from "@/db/schema/daily-report";
import { reviewDailyReportTable } from "@/db/schema/daily-report-review";
import { usersTable } from "@/db/schema/users";

import { desc, eq } from "drizzle-orm";

export async function getDailyReportsService() {
  const reports = await db.query.dailyReportTable.findMany({
    orderBy: [desc(dailyReportTable.createdAt)],
  });

  const reportsWithReviews = await Promise.all(
    reports.map(async (report) => {
      const reviews = await db
        .select({
          id: reviewDailyReportTable.id,
          dailyReportId: reviewDailyReportTable.dailyReportId,
          reviewerId: reviewDailyReportTable.reviewerId,
          status: reviewDailyReportTable.status,
          comment: reviewDailyReportTable.comment,
          reviewedAt: reviewDailyReportTable.reviewedAt,
          reviewerName: usersTable.username,
          reviewerEmail: usersTable.email,
        })
        .from(reviewDailyReportTable)
        .leftJoin(
          usersTable,
          eq(reviewDailyReportTable.reviewerId, usersTable.id),
        )
        .where(eq(reviewDailyReportTable.dailyReportId, report.id))
        .orderBy(desc(reviewDailyReportTable.reviewedAt));

      return {
        ...report,
        reviews,
      };
    }),
  );

  return reportsWithReviews;
}
