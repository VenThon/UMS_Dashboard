// src/db/schema/general-request.ts
import {
  GENERAL_REQUEST_STATUS,
  GENERAL_REQUEST_STATUS_VALUES,
  GENERAL_REQUEST_TYPE_VALUES,
  type GeneralRequestStatus,
  type GeneralRequestType,
  REQUEST_PRIORITY_VALUES,
  type RequestPriority,
} from "@/db/constants/general-request";

import {
  date,
  index,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { usersTable } from "./users";

export type GeneralRequestAttachment = {
  name: string;
  url: string;
  key?: string;
  size?: number;
  mimeType?: string;
};

export const generalRequestTable = pgTable(
  "general_request",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "restrict",
      }),

    requestType: varchar("request_type", {
      length: 50,
      enum: GENERAL_REQUEST_TYPE_VALUES,
    })
      .$type<GeneralRequestType>()
      .notNull(),

    title: varchar("title", {
      length: 200,
    }).notNull(),

    description: text("description").notNull(),

    reason: text("reason").notNull(),

    expectedBenefit: text("expected_benefit").notNull(),

    priority: varchar("priority", {
      length: 20,
      enum: REQUEST_PRIORITY_VALUES,
    })
      .$type<RequestPriority>()
      .notNull(),

    requiredDate: date("required_date", {
      mode: "string",
    }),

    estimatedCost: numeric("estimated_cost", {
      precision: 15,
      scale: 2,
    }),

    currency: varchar("currency", {
      length: 3,
    }),

    attachments: jsonb("attachments")
      .$type<GeneralRequestAttachment[]>()
      .notNull()
      .default([]),

    status: varchar("status", {
      length: 40,
      enum: GENERAL_REQUEST_STATUS_VALUES,
    })
      .$type<GeneralRequestStatus>()
      .notNull()
      .default(GENERAL_REQUEST_STATUS.PENDING_FIRST_APPROVAL),

    revision: integer("revision").notNull().default(1),

    reviewedById: uuid("reviewed_by_id").references(() => usersTable.id, {
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
      .notNull(),
  },
  (table) => [
    index("general_request_user_idx").on(table.userId),
    index("general_request_status_idx").on(table.status),
    index("general_request_priority_idx").on(table.priority),
    index("general_request_created_at_idx").on(table.createdAt),
  ],
);
