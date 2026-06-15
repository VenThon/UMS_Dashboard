import { apiFetcher } from "../fetcher";

type AdminStatistics = {
  totalUsers: number;
  totalRoles: number;
  totalActiveUsers: number;
  totalInactiveUsers: number;
  totalManagementTeam: number;
  totalDevelopmentTeam: number;
  totalBusinessAnalysisTeam: number;
  totalInfrastructureTeam: number;
};

type UserRoleYearStatistic = {
  role: string;
  total: number;
};

export async function GetStatisticsRoleAdminService() {
  return apiFetcher<AdminStatistics>("/api/admin/statistics", {
    method: "GET",
  });
}

export async function GetStatisticsDisplayRoleByYearAdminService(year: string) {
  return apiFetcher<{ year: number; data: UserRoleYearStatistic[] }>(
    `/api/admin/statistics/roles?year=${year}`,
    {
      method: "GET",
    },
  );
}
