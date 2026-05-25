import { USER_ROLE } from "@/db/types/user.type";

export const roleRoutes: Record<string, string> = {
  [USER_ROLE.ADMIN]: "/dashboard/admin",
  [USER_ROLE.IT_MANAGER]:
    "/dashboard/manager",

};