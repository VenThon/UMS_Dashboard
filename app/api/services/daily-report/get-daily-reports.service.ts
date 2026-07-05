// import { desc, eq } from "drizzle-orm";
// import { db } from "@/db";
// import { dailyReportTable } from "@/db/schema/daily-report";
// import { UserRole } from "@/db/types/user.type";
// import { VIEW_DAILY_REPORT_ROLES } from "@/utils/daily-report/daily-report-permission";
// type GetDailyReportsServiceParams = {
//   userId: string;
//   role: UserRole;
// };
// export async function getDailyReportsService({
//   userId,
//   role,
// }: GetDailyReportsServiceParams) {
//   const canViewAllReports = VIEW_DAILY_REPORT_ROLES.includes(role as UserRole);
//   if (canViewAllReports) {
//     return db.query.dailyReportTable.findMany({
//       orderBy: [desc(dailyReportTable.createdAt)],
//     });
//   }
//   return db.query.dailyReportTable.findMany({
//     where: eq(dailyReportTable.userId, userId),
//     orderBy: [desc(dailyReportTable.createdAt)],
//   });
// }
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
