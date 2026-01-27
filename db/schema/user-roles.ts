import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { roles } from "./roles";

export const userRoles = pgTable("user_roles", {
    userId: uuid("user_id").notNull().references( () =>users.id, { onDelete: "cascade" }),
    roleId: uuid("role_id").notNull().references( () => roles.id, { onDelete: "cascade" } ),
    assignedAt: timestamp("assigned_at").defaultNow().notNull(),
    assignedBy: uuid("assigned_by"),
},(table) => ({
    pk: primaryKey(table.userId, table.roleId),
  }))