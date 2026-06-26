import {
  date,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import {
  DAILY_REPORT_STATUS,
  DailyReportTypes,
} from "../constants/daily-report-status";
import { usersTable } from "./users";

export const dailyReportTable = pgTable(
  "daily_reports",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),

    projectName: varchar("project_name", {
      length: 150,
    }).notNull(),

    reportDate: date("report_date", {
      mode: "string",
    }).notNull(),

    previousTasks: text("previous_tasks").notNull(),

    completedTasks: text("completed_tasks").notNull(),

    inProgressTasks: text("in_progress_tasks").notNull(),

    blockers: text("blockers"),

    tomorrowPlan: text("tomorrow_plan").notNull(),

    remarks: text("remarks"),

    status: varchar("status", {
      length: 30,
    })
      .$type<DailyReportTypes>()
      .notNull()
      .default(DAILY_REPORT_STATUS.PENDING),

    reviewedBy: integer("reviewed_by").references(() => usersTable.id, {
      onDelete: "set null",
    }),

    reviewerComment: text("reviewer_comment"),

    reviewedAt: timestamp("reviewed_at", {
      withTimezone: true,
    }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("daily_reports_user_id_idx").on(table.userId),
    index("daily_reports_report_date_idx").on(table.reportDate),
    index("daily_reports_status_idx").on(table.status),

    uniqueIndex("daily_reports_user_date_unique").on(
      table.userId,
      table.reportDate,
    ),
  ],
);
