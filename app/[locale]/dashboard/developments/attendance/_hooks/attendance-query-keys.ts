import type { AttendanceListQuery } from "@/db/validation/attendance";

export const attendanceKeys = {
  all: ["attendances"] as const,

  lists: () => [...attendanceKeys.all, "list"] as const,

  list: (query: AttendanceListQuery) =>
    [...attendanceKeys.lists(), query] as const,

  today: () => [...attendanceKeys.all, "today"] as const,

  details: () => [...attendanceKeys.all, "detail"] as const,

  detail: (id: string) => [...attendanceKeys.details(), id] as const,
};
