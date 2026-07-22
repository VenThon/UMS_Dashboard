import type { RequestLeaveStatus } from "@/db/constants/request-leave-status";

export const requestLeaveKeys = {
  all: ["request-leave"] as const,

  lists: () => [...requestLeaveKeys.all, "list"] as const,

  list: (params: {
    page: number;
    pageSize: number;
    status?: RequestLeaveStatus;
  }) => [...requestLeaveKeys.lists(), params] as const,

  details: () => [...requestLeaveKeys.all, "detail"] as const,

  detail: (id: string) => [...requestLeaveKeys.details(), id] as const,

  reviews: (id: string) => [...requestLeaveKeys.detail(id), "reviews"] as const,
};
