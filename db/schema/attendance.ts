import {
  ATTENDANCE_ACTION_VALUES,
  ATTENDANCE_STATUS_VALUES,
} from "@/db/constants/attendance";

import {
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { usersTable } from "./users";

export const attendanceStatusEnum = pgEnum(
  "attendance_status",
  ATTENDANCE_STATUS_VALUES as [
    (typeof ATTENDANCE_STATUS_VALUES)[number],
    ...(typeof ATTENDANCE_STATUS_VALUES)[number][],
  ],
);

export const attendanceActionEnum = pgEnum(
  "attendance_action",
  ATTENDANCE_ACTION_VALUES as [
    (typeof ATTENDANCE_ACTION_VALUES)[number],
    ...(typeof ATTENDANCE_ACTION_VALUES)[number][],
  ],
);

export const attendancesTable = pgTable(
  "attendances",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),

    attendanceDate: date("attendance_date").notNull(),

    checkInAt: timestamp("check_in_at", {
      withTimezone: true,
      mode: "date",
    }),

    checkOutAt: timestamp("check_out_at", {
      withTimezone: true,
      mode: "date",
    }),

    status: attendanceStatusEnum("status").notNull().default("PRESENT"),

    lateMinutes: integer("late_minutes").notNull().default(0),

    workedMinutes: integer("worked_minutes"),

    note: varchar("note", {
      length: 1000,
    }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    uniqueUserDate: uniqueIndex("attendances_user_date_unique").on(
      table.userId,
      table.attendanceDate,
    ),

    userIndex: index("attendances_user_id_idx").on(table.userId),

    dateIndex: index("attendances_date_idx").on(table.attendanceDate),

    statusIndex: index("attendances_status_idx").on(table.status),
  }),
);

export const attendanceHistoryTable = pgTable(
  "attendance_history",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    attendanceId: uuid("attendance_id")
      .notNull()
      .references(() => attendancesTable.id, {
        onDelete: "cascade",
      }),

    action: attendanceActionEnum("action").notNull(),

    performedById: uuid("performed_by_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "restrict",
      }),

    previousData: jsonb("previous_data"),

    newData: jsonb("new_data"),

    description: text("description"),

    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    attendanceIndex: index("attendance_history_attendance_id_idx").on(
      table.attendanceId,
    ),

    performedByIndex: index("attendance_history_performed_by_idx").on(
      table.performedById,
    ),
  }),
);
