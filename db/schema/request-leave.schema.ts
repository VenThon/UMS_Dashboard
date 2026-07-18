import { sql } from "drizzle-orm";
import {
  check,
  date,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import {
  LEAVE_DURATION_TYPES,
  LEAVE_TYPES,
  LeaveDurationType,
  LeaveTypes,
  REQUEST_LEAVE_STATUS,
  RequestLeaveStatus,
} from "../constants/request-leave-status";
import { usersTable } from "./users";

export const requestLeaveTable = pgTable(
  "request_leave",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),

    leaveType: text("leave_type")
      .$type<LeaveTypes>()
      .notNull()
      .default(LEAVE_TYPES.ANNUAL_LEAVE),

    startDate: date("start_date", {
      mode: "string",
    }).notNull(),

    endDate: date("end_date", {
      mode: "string",
    }).notNull(),

    durationType: text("duration_type")
      .$type<LeaveDurationType>()
      .notNull()
      .default(LEAVE_DURATION_TYPES.FULL_DAY),

    reason: text("reason").notNull(),

    status: varchar("status", {
      length: 30,
    })
      .$type<RequestLeaveStatus>()
      .notNull()
      .default(REQUEST_LEAVE_STATUS.PENDING_FIRST_APPROVAL),

    approvedById: uuid("approved_by_id").references(() => usersTable.id, {
      onDelete: "set null",
    }),

    approverComment: text("approver_comment"),

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
    index("request_leave_user_id_idx").on(table.userId),
    index("request_leave_status_idx").on(table.status),
    index("request_leave_start_date_idx").on(table.startDate),

    check(
      "request_leave_date_range_check",
      sql`${table.endDate} >= ${table.startDate}`,
    ),
  ],
);
