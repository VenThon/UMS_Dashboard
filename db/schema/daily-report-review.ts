import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { dailyReportTable } from "./daily-report";
import { usersTable } from "./users";
import {
  REVIEW_REPORT_STATUS,
  ReviewReportTypes,
} from "../constants/daily-report-status";
import z from "zod";
import { createInsertSchema } from "drizzle-zod";

export const reviewDailyReportTable = pgTable(
  "daily_report_reviews",
  {
    id: serial("id").primaryKey(),
    dailyReportId: integer("daily_report_id")
      .notNull()
      .references(() => dailyReportTable.id, {
        onDelete: "cascade",
      }),

    reviewerId: integer("reviewer_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "restrict",
      }),

    status: varchar("action", {
      length: 20,
    })
      .$type<ReviewReportTypes>()
      .notNull(),

    comment: text("comment"),

    reviewedAt: timestamp("reviewed_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("daily_report_reviews_report_id_idx").on(table.dailyReportId),

    index("daily_report_reviews_reviewer_id_idx").on(table.reviewerId),
  ],
);

export const createReviewDailyReportSchema = createInsertSchema(
  reviewDailyReportTable,
  {
    comment: z.string().trim().optional(),
    status: z.enum(REVIEW_REPORT_STATUS),
  },
);
