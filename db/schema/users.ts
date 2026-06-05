import {
  pgTable,
  text,
  boolean,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { USER_ROLE } from "../types/user.type";
import { UNDER_TEAM } from "../types/team.type";
// import { createInsertSchema } from "drizzle-zod";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull(),
  password: text("password").notNull(),

  role: text("role").notNull().default(USER_ROLE.IT_SUPPORT),
  team: text("team").notNull().default(UNDER_TEAM.DEVELOPMENT),
  phoneNumber: varchar("phone_number", { length: 20 }),
  isActive: boolean("is_active").notNull().default(true),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// export const createUserSchema = createInsertSchema(usersTable);

export type User = typeof usersTable.$inferSelect;
