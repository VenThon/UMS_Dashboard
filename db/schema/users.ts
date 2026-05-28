import { pgTable, text, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { USER_ROLE } from "../types/user.type";


export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull(),
  password: text("password").notNull(),

  role: text("role").notNull().default(USER_ROLE.IT_SUPPORT),
  isActive: boolean("is_active").notNull().default(true),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});