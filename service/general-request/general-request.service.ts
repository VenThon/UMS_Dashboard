import {
  GeneralRequestDetailResponse,
  GeneralRequestListResponse,
  GeneralRequestMutationResponse,
  GeneralRequestReviewMutationResponse,
  GeneralRequestReviewsResponse,
  GeneralRequestSummary,
} from "@/app/[locale]/dashboard/developments/general-request/_hooks/general-request-types";
import type {
  GeneralRequestStatus,
  GeneralRequestType,
  RequestPriority,
} from "@/db/constants/general-request";
import type {
  CreateGeneralRequestInput,
  RejectGeneralRequestValue,
  ResubmitGeneralRequestValue,
  ReviewGeneralRequestValue,
  UpdateGeneralRequestValue,
} from "@/db/validation/general-request";

type ApiErrorResponse = {
  message?: string;
  errors?: unknown;
};

export async function parseApiResponse<T>(response: Response): Promise<T> {
  const result = (await response.json()) as T & ApiErrorResponse;

  if (!response.ok) {
    throw new Error(result.message ?? "Something went wrong.");
  }

  return result;
}

export type GetGeneralRequestsParams = {
  page?: number;
  pageSize?: number;
  status?: GeneralRequestStatus;
  requestType?: GeneralRequestType;
  priority?: RequestPriority;
  search?: string;
};

export async function getGeneralRequests(
  params: GetGeneralRequestsParams,
): Promise<GeneralRequestListResponse> {
  const searchParams = new URLSearchParams();

  if (params.page) {
    searchParams.set("page", params.page.toString());
  }

  if (params.pageSize) {
    searchParams.set("pageSize", params.pageSize.toString());
  }

  if (params.status) {
    searchParams.set("status", params.status);
  }

  if (params.requestType) {
    searchParams.set("requestType", params.requestType);
  }

  if (params.priority) {
    searchParams.set("priority", params.priority);
  }

  if (params.search) {
    searchParams.set("search", params.search);
  }

  const response = await fetch(
    `/api/general-request?${searchParams.toString()}`,
  );

  return parseApiResponse<GeneralRequestListResponse>(response);
}

export async function getGeneralRequestById(
  id: string,
): Promise<GeneralRequestDetailResponse> {
  const response = await fetch(`/api/general-request/${id}`);

  return parseApiResponse<GeneralRequestDetailResponse>(response);
}

export async function createGeneralRequest(
  values: CreateGeneralRequestInput,
): Promise<GeneralRequestMutationResponse> {
  const response = await fetch("/api/general-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return parseApiResponse<GeneralRequestMutationResponse>(response);
}

export async function updateGeneralRequest(
  id: string,
  values: UpdateGeneralRequestValue,
): Promise<GeneralRequestMutationResponse> {
  const response = await fetch(`/api/general-request/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return parseApiResponse<GeneralRequestMutationResponse>(response);
}

export async function deleteGeneralRequest(
  id: string,
): Promise<GeneralRequestMutationResponse> {
  const response = await fetch(`/api/general-request/${id}`, {
    method: "DELETE",
  });

  return parseApiResponse<GeneralRequestMutationResponse>(response);
}

export async function cancelGeneralRequest(
  id: string,
): Promise<GeneralRequestMutationResponse> {
  const response = await fetch(`/api/general-request/${id}/cancel`, {
    method: "POST",
  });

  return parseApiResponse<GeneralRequestMutationResponse>(response);
}

export async function approveGeneralRequest(
  id: string,
  values: ReviewGeneralRequestValue,
): Promise<GeneralRequestReviewMutationResponse> {
  const response = await fetch(`/api/general-request/${id}/approve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return parseApiResponse<GeneralRequestReviewMutationResponse>(response);
}

export async function rejectGeneralRequest(
  id: string,
  values: RejectGeneralRequestValue,
): Promise<GeneralRequestReviewMutationResponse> {
  const response = await fetch(`/api/general-request/${id}/reject`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return parseApiResponse<GeneralRequestReviewMutationResponse>(response);
}

export async function resubmitGeneralRequest(
  id: string,
  values: ResubmitGeneralRequestValue,
): Promise<GeneralRequestMutationResponse> {
  const response = await fetch(`/api/general-request/${id}/resubmit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return parseApiResponse<GeneralRequestMutationResponse>(response);
}

export async function getGeneralRequestReviews(
  id: string,
): Promise<GeneralRequestReviewsResponse> {
  const response = await fetch(`/api/general-request/${id}/reviewer`);

  return parseApiResponse<GeneralRequestReviewsResponse>(response);
}

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export async function getGeneralRequestSummaryApi() {
  const response = await fetch("/api/general-request/summary", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const result = (await response.json()) as ApiResponse<GeneralRequestSummary>;

  if (!response.ok) {
    throw new Error(
      result.message ?? "Failed to load the general request summary.",
    );
  }

  return result.data;
}
