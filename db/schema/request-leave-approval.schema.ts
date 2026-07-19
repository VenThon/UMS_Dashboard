// import {
//   index,
//   integer,
//   pgTable,
//   text,
//   timestamp,
//   uniqueIndex,
//   uuid,
//   varchar,
// } from "drizzle-orm/pg-core";
// import { createInsertSchema } from "drizzle-zod";
// import { z } from "zod";
// import {
//   REVIEW_REPORT_STATUS,
//   ReviewReportTypes,
// } from "../constants/daily-report-status";
// import { requestLeaveTable } from "./request-leave.schema";
// import { usersTable } from "./users";
// export const approvalRequestLeaveTable = pgTable(
//   "approval_request_leave",
//   {
//     id: uuid("id").defaultRandom().primaryKey(),
//     requestLeaveId: uuid("request_leave_id")
//       .notNull()
//       .references(() => requestLeaveTable.id, {
//         onDelete: "cascade",
//       }),
//     reviewedById: uuid("reviewed_by_id")
//       .notNull()
//       .references(() => usersTable.id, {
//         onDelete: "restrict",
//       }),
//     reviewLevel: integer("review_level").notNull(),
//     status: varchar("status", {
//       length: 20,
//     })
//       .$type<ReviewReportTypes>()
//       .notNull(),
//     comment: text("comment"),
//     reviewedAt: timestamp("reviewed_at", {
//       withTimezone: true,
//     })
//       .defaultNow()
//       .notNull(),
//   },
//   (table) => [
//     index("approval_request_leave_request_id_idx").on(table.requestLeaveId),
//     index("approval_request_leave_reviewer_id_idx").on(table.reviewedById),
//     index("approval_request_leave_status_idx").on(table.status),
//     uniqueIndex("approval_request_leave_level_unique_idx").on(
//       table.requestLeaveId,
//       table.reviewLevel,
//     ),
//   ],
// );
// export const approvalRequestLeaveSchema = createInsertSchema(
//   approvalRequestLeaveTable,
//   {
//     status: z.enum([
//       REVIEW_REPORT_STATUS.APPROVED,
//       REVIEW_REPORT_STATUS.REJECTED,
//     ]),
//     comment: z
//       .string()
//       .trim()
//       .max(1000, "Comment must not exceed 1,000 characters.")
//       .optional(),
//   },
// )
//   .omit({
//     id: true,
//     requestLeaveId: true,
//     reviewedById: true,
//     reviewedAt: true,
//   })
//   .superRefine((data, ctx) => {
//     if (
//       data.status === REVIEW_REPORT_STATUS.REJECTED &&
//       !data.comment?.trim()
//     ) {
//       ctx.addIssue({
//         code: "custom",
//         path: ["comment"],
//         message: "A comment is required when rejecting a leave request.",
//       });
//     }
//   });
// export type ApprovalRequestLeaveFormValues = z.infer<
//   typeof approvalRequestLeaveSchema
// >;
import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import z from "zod";

import {
  REVIEW_REPORT_STATUS,
  ReviewReportTypes,
} from "../constants/daily-report-status";
import { requestLeaveTable } from "./request-leave.schema";
import { usersTable } from "./users";

export const requestLeaveApprovalTable = pgTable(
  "request_leave_approval",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    requestLeaveId: uuid("request_leave_id")
      .notNull()
      .references(() => requestLeaveTable.id, {
        onDelete: "cascade",
      }),

    reviewerId: uuid("reviewer_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "restrict",
      }),

    approvalLevel: integer("approval_level").notNull(),
    revision: integer("revision").notNull(),
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
    index("request_leave_approval_request_idx").on(table.requestLeaveId),

    index("request_leave_approval_reviewer_idx").on(table.reviewerId),

    uniqueIndex("request_leave_approval_level_revision_unique_idx").on(
      table.requestLeaveId,
      table.revision,
      table.approvalLevel,
    ),
  ],
);

export const reviewRequestLeaveSchema = z
  .object({
    status: z.enum([
      REVIEW_REPORT_STATUS.APPROVED,
      REVIEW_REPORT_STATUS.REJECTED,
    ]),

    comment: z
      .string()
      .trim()
      .max(1000, "Comment must not exceed 1,000 characters.")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.status === REVIEW_REPORT_STATUS.REJECTED && !data.comment) {
      ctx.addIssue({
        code: "custom",
        path: ["comment"],
        message: "A comment is required when rejecting a leave request.",
      });
    }
  });

export type ReviewRequestLeaveValue = z.infer<typeof reviewRequestLeaveSchema>;

export const approveRequestLeaveSchema = z.object({
  comment: z
    .string()
    .trim()
    .max(1000, "Comment must not exceed 1,000 characters.")
    .optional(),
});

export const rejectRequestLeaveSchema = z.object({
  comment: z
    .string()
    .trim()
    .min(1, "A rejection comment is required.")
    .max(1000, "Comment must not exceed 1,000 characters."),
});

export type ApproveRequestLeaveValue = z.infer<
  typeof approveRequestLeaveSchema
>;

export type RejectRequestLeaveValue = z.infer<typeof rejectRequestLeaveSchema>;
