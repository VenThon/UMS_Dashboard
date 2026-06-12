import { apiFetcher } from "../fetcher";
type AdminStatistics = {
  totalUsers: number;
  totalRoles: number;
  totalActiveUsers: number;
  totalInactiveUsers: number;
  totalManagementTeam: number;
};

export async function GetStatisticsRoleAdminService() {
  return apiFetcher<AdminStatistics>("/api/admin/statistics", {
    method: "GET",
  });
}
