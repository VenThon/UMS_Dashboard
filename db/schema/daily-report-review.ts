import { dailyReportTable } from "@/db/schema/daily-report";

import {
  index,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import {
  REVIEW_REPORT_STATUS,
  ReviewReportTypes,
} from "../constants/daily-report-status";
import { usersTable } from "./users";

export const reviewDailyReportTable = pgTable(
  "daily_report_reviews",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    dailyReportId: uuid("daily_report_id")
      .notNull()
      .references(() => dailyReportTable.id, {
        onDelete: "cascade",
      }),
    reviewerId: uuid("reviewer_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "restrict",
      }),

    status: varchar("status", {
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
    index("daily_report_reviews_status_idx").on(table.status),
  ],
);

export const reviewDailyReportSchema = createInsertSchema(
  reviewDailyReportTable,
  {
    status: z.enum([
      REVIEW_REPORT_STATUS.APPROVED,
      REVIEW_REPORT_STATUS.REJECTED,
    ]),

    comment: z
      .string()
      .trim()
      .max(1000, "Comment must not exceed 1,000 characters.")
      .optional(),
  },
)
  .omit({
    id: true,
    dailyReportId: true,
    reviewerId: true,
    reviewedAt: true,
  })
  .superRefine((data, ctx) => {
    if (
      data.status === REVIEW_REPORT_STATUS.REJECTED &&
      !data.comment?.trim()
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["comment"],
        message: "A comment is required when rejecting a report.",
      });
    }
  });

export type ReviewDailyReportFormValues = z.infer<
  typeof reviewDailyReportSchema
>;
