import {
  pgTable,
  serial,
  uuid,
  varchar,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const userApprovals = pgTable("user_approvals", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 20 }).notNull(),
  reviewedBy: uuid("reviewed_by"),
  reviewedAt: timestamp("reviewed_at"),
  reason: text("reason"),
});
