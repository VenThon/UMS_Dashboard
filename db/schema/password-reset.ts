import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const passwordResetRequests = pgTable("password_reset_requests", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),

  otpHash: text("otp_hash").notNull(),

  attempts: integer("attempts").notNull().default(0),

  expiresAt: timestamp("expires_at", {
    withTimezone: true,
  }).notNull(),

  resendAvailableAt: timestamp("resend_available_at", {
    withTimezone: true,
  }).notNull(),

  verifiedAt: timestamp("verified_at", {
    withTimezone: true,
  }),

  usedAt: timestamp("used_at", {
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
});

export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),

  requestId: uuid("request_id")
    .notNull()
    .references(() => passwordResetRequests.id, {
      onDelete: "cascade",
    }),

  tokenHash: text("token_hash").notNull(),

  expiresAt: timestamp("expires_at", {
    withTimezone: true,
  }).notNull(),

  usedAt: timestamp("used_at", {
    withTimezone: true,
  }),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});
