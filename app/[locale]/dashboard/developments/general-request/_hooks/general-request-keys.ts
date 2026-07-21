import { GetGeneralRequestsParams } from "@/service/general-request/general-request.service";

export const generalRequestKeys = {
  all: ["general-requests"] as const,

  lists: () => [...generalRequestKeys.all, "list"] as const,

  list: (params: GetGeneralRequestsParams) =>
    [...generalRequestKeys.lists(), params] as const,

  details: () => [...generalRequestKeys.all, "detail"] as const,

  detail: (id: string) => [...generalRequestKeys.details(), id] as const,

  reviews: (id: string) =>
    [...generalRequestKeys.detail(id), "reviews"] as const,
};
