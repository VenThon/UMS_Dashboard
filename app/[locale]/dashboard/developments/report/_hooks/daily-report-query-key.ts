export const dailyReportKeys = {
  all: ["daily-reports"] as const,

  lists: () => [...dailyReportKeys.all, "list"] as const,

  summary: () => [...dailyReportKeys.all, "summary"] as const,

  details: () => [...dailyReportKeys.all, "detail"] as const,

  detail: (id: string) => [...dailyReportKeys.details(), id] as const,
};
