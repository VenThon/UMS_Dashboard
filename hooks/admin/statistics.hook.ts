import {
  GetStatisticsDisplayRoleByYearAdminService,
  GetStatisticsRoleAdminService,
} from "@/service/statistics/statistics.service";

import { useQuery } from "@tanstack/react-query";

// export function useAdminStatisticsHook() {
//   return useQuery({
//     queryKey: ["admin-statistics"],
//     queryFn: GetStatisticsRoleAdminService,
//   });
// }
export function useAdminStatisticsHook() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-statistics"],
    queryFn: GetStatisticsRoleAdminService,
  });

  return {
    data: data,
    isLoading,
  };
}

export function useAdminStatisticsDisplayRolesByYearHook(year: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-statistics", year],
    queryFn: () => GetStatisticsDisplayRoleByYearAdminService(year),
  });

  return {
    data: data,
    isLoading,
  };
}
