export const dailyReportKeys = {
  all: ["daily-reports"] as const,
  lists: () => [...dailyReportKeys.all, "list"] as const,
  detail: (id: string) => [...dailyReportKeys.all, "detail", id] as const,
};
