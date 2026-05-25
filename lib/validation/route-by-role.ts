import { USER_ROLE } from "@/db/types/user.type";
const developmentDashboard =
  "/dashboard/developments/statistics";

export const roleRoutes: Record<string, string> = {
  [USER_ROLE.ADMIN]: "/dashboard/admin/statistics",
  [USER_ROLE.TEAM_LEAD_BACKEND ]:developmentDashboard,
  [USER_ROLE.TEAM_LEAD_FRONTEND]: developmentDashboard,
  [USER_ROLE.FRONTEND_DEVELOPER]: developmentDashboard,
  [USER_ROLE.BACKEND_DEVELOPER]: developmentDashboard,
  [USER_ROLE.FULLSTACK_DEVELOPER]: developmentDashboard,
  [USER_ROLE.MOBILE_DEVELOPER]: developmentDashboard

};