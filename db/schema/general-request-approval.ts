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

import {
  GENERAL_REQUEST_APPROVAL_STATUS_VALUES,
  GeneralRequestApprovalStatus,
} from "../constants/general-request";
import { generalRequestTable } from "./general-request";
import { usersTable } from "./users";

export const generalRequestApprovalTable = pgTable(
  "general_request_approval",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    generalRequestId: uuid("general_request_id")
      .notNull()
      .references(() => generalRequestTable.id, {
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
      enum: GENERAL_REQUEST_APPROVAL_STATUS_VALUES,
    })
      .$type<GeneralRequestApprovalStatus>()
      .notNull(),

    comment: text("comment"),

    reviewedAt: timestamp("reviewed_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("general_request_approval_request_idx").on(table.generalRequestId),

    index("general_request_approval_reviewer_idx").on(table.reviewerId),

    uniqueIndex("general_request_approval_request_revision_level_unique").on(
      table.generalRequestId,
      table.revision,
      table.approvalLevel,
    ),
  ],
);
