import { RequestLeaveSummary } from "@/app/[locale]/dashboard/developments/leave-request/_hooks/types";
import type {
  LeaveDurationType,
  LeaveTypes,
  RequestLeaveStatus,
} from "@/db/constants/request-leave-status";
import type {
  CreateRequestLeaveInput,
  UpdateRequestLeaveValue,
} from "@/db/validation/leave-request";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type RequestLeaveItem = {
  id: string;
  userId: string;
  leaveType: LeaveTypes;
  startDate: string;
  endDate: string;
  durationType: LeaveDurationType;
  reason: string;
  status: RequestLeaveStatus;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type RequestLeaveListResponse = {
  success: boolean;
  message: string;
  data: RequestLeaveItem[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

type RequestLeaveListParams = {
  page: number;
  pageSize: number;
  status?: RequestLeaveStatus;
};

async function parseResponse<T>(response: Response): Promise<T> {
  const result: unknown = await response.json();

  if (!response.ok) {
    const errorResult = result as {
      message?: string;
      error?: string;
    };

    throw new Error(
      errorResult.message ?? errorResult.error ?? "Something went wrong.",
    );
  }

  return result as T;
}

export async function getRequestLeaves(
  params: RequestLeaveListParams,
): Promise<RequestLeaveListResponse> {
  const searchParams = new URLSearchParams({
    page: String(params.page),
    pageSize: String(params.pageSize),
  });

  if (params.status) {
    searchParams.set("status", params.status);
  }

  const response = await fetch(
    `/api/request-leave?${searchParams.toString()}`,
    {
      method: "GET",
    },
  );

  return parseResponse<RequestLeaveListResponse>(response);
}

export async function getRequestLeaveById(
  id: string,
): Promise<ApiResponse<RequestLeaveItem>> {
  const response = await fetch(`/api/request-leave/${id}`, {
    method: "GET",
    credentials: "include",
  });

  return parseResponse<ApiResponse<RequestLeaveItem>>(response);
}

// export async function createRequestLeave(
//   values: CreateRequestLeaveValue,
// ): Promise<ApiResponse<RequestLeaveItem>> {
//   const response = await fetch("/api/request-leave", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//     body: JSON.stringify(values),
//   });

//   return parseResponse<ApiResponse<RequestLeaveItem>>(response);
// }
export async function createRequestLeave(
  values: CreateRequestLeaveInput,
): Promise<ApiResponse<RequestLeaveItem>> {
  const response = await fetch("/api/request-leave", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(values),
  });

  return parseResponse<ApiResponse<RequestLeaveItem>>(response);
}

export async function updateRequestLeave(
  id: string,
  values: UpdateRequestLeaveValue,
): Promise<ApiResponse<RequestLeaveItem>> {
  const response = await fetch(`/api/request-leave/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(values),
  });

  return parseResponse<ApiResponse<RequestLeaveItem>>(response);
}

export async function deleteRequestLeave(
  id: string,
): Promise<ApiResponse<RequestLeaveItem>> {
  const response = await fetch(`/api/request-leave/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return parseResponse<ApiResponse<RequestLeaveItem>>(response);
}
export async function cancelRequestLeave(
  id: string,
): Promise<ApiResponse<RequestLeaveItem>> {
  const response = await fetch(`/api/request-leave/${id}/cancel`, {
    method: "POST",
    credentials: "include",
  });

  return parseResponse<ApiResponse<RequestLeaveItem>>(response);
}

export type RequestLeaveReview = {
  id: string;
  requestLeaveId: string;
  reviewerId: string;
  reviewerName: string | null;
  approvalLevel: number;
  revision: number;
  status: "approved" | "rejected";
  comment: string | null;
  reviewedAt: string;
};
export type ReviewRequestLeaveResult = {
  review: RequestLeaveReview;
  requestLeave: RequestLeaveItem;
};

export async function approveRequestLeave(
  id: string,
  comment?: string,
): Promise<ApiResponse<ReviewRequestLeaveResult>> {
  const response = await fetch(`/api/request-leave/${id}/approve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      comment,
    }),
  });

  return parseResponse<ApiResponse<ReviewRequestLeaveResult>>(response);
}

export async function rejectRequestLeave(
  id: string,
  comment: string,
): Promise<ApiResponse<ReviewRequestLeaveResult>> {
  const response = await fetch(`/api/request-leave/${id}/reject`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      comment,
    }),
  });

  return parseResponse<ApiResponse<ReviewRequestLeaveResult>>(response);
}

export async function resubmitRequestLeave(
  id: string,
  values: UpdateRequestLeaveValue,
): Promise<ApiResponse<RequestLeaveItem>> {
  const response = await fetch(`/api/request-leave/${id}/resubmit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(values),
  });

  return parseResponse<ApiResponse<RequestLeaveItem>>(response);
}

export async function getRequestLeaveReviewHistory(
  id: string,
): Promise<ApiResponse<RequestLeaveReview[]>> {
  const response = await fetch(`/api/request-leave/${id}/reviewer`, {
    method: "GET",
    credentials: "include",
  });

  return parseResponse<ApiResponse<RequestLeaveReview[]>>(response);
}

export async function getRequestLeaveSummaryApi() {
  const response = await fetch("/api/request-leave/summary", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const result = (await response.json()) as ApiResponse<RequestLeaveSummary>;

  if (!response.ok) {
    throw new Error(
      result.message ?? "Failed to load the leave request summary.",
    );
  }

  return result.data;
}
