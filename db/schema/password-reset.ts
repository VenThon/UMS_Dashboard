import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { usersTable } from "./users";

export const passwordResetRequests = pgTable(
  "password_reset_requests",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),
    email: varchar("email", {
      length: 255,
    }).notNull(),

    otpHash: text("otp_hash").notNull(),
    otpExpiresAt: timestamp("otp_expires_at", {
      withTimezone: true,
    }).notNull(),

    failedAttempts: integer("failed_attempts").notNull().default(0),

    resendCount: integer("resend_count").notNull().default(0),

    lastSentAt: timestamp("last_sent_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    // This token is created after OTP verification.
    resetTokenHash: text("reset_token_hash"),

    resetTokenExpiresAt: timestamp("reset_token_expires_at", {
      withTimezone: true,
    }),

    verifiedAt: timestamp("verified_at", {
      withTimezone: true,
    }),

    usedAt: timestamp("used_at", {
      withTimezone: true,
    }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    emailIndex: index("password_reset_requests_email_idx").on(table.email),
    userIndex: index("password_reset_requests_user_id_idx").on(table.userId),
  }),
);
