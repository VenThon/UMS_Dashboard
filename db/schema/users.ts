
import { pgTable, text, timestamp,  uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    username:varchar ("username", {length: 100}).notNull(),
    email: varchar("email", {length: 150}).notNull().unique(),
    password: text("password").notNull(),
    status: varchar("status", {length: 20}).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createBy: uuid("create_by")
})