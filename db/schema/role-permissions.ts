import {
  pgTable,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";
import { roles } from "./roles";
import { permissions } from "./permission";

export const rolePermissions = pgTable(
  "role_permissions",
  {
    roleId: integer("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),

    permissionId: integer("permission_id")
      .notNull()
      .references(() => permissions.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey(table.roleId, table.permissionId),
  })
);
