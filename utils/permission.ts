import { USER_ROLE, UserRole } from "@/db/types/user.type";

export const VIEW_PROJECT_ATTENDANCE_ROLES = [
  USER_ROLE.PROJECT_MANAGER,
  USER_ROLE.IT_MANAGER,
  USER_ROLE.LEAD_FRONTEND,
  USER_ROLE.LEAD_BACKEND,
  USER_ROLE.LEAD_INFRASTRUCTUR,
] as const satisfies readonly UserRole[];
