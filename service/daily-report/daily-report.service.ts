import {
  ApiResponse,
  DailyReportItem,
} from "@/app/[locale]/dashboard/developments/(components)/report/daily-report.type";
import { ReviewDailyReportFormValues } from "@/db/schema/daily-report-review";
import { CreateDailyReportFormValues } from "@/db/validation/dialyreport";

import { apiFetcher } from "../fetcher";

export type CreateDailyReportPayload = Omit<
  CreateDailyReportFormValues,
  "reportDate"
> & {
  reportDate: string;
  status: "draft" | "pending";
};

export type UpdateDailyReportPayload = Omit<
  CreateDailyReportFormValues,
  "reportDate"
> & {
  reportDate: string;
};

export function getDailyReportsService() {
  return apiFetcher<ApiResponse<DailyReportItem[]>>("/api/daily-reports", {
    method: "GET",
  });
}
export function getDailyReportByIdService(id: string) {
  return apiFetcher<ApiResponse<DailyReportItem>>(`/api/daily-reports/${id}`, {
    method: "GET",
  });
}

export function createDailyReportService(values: CreateDailyReportPayload) {
  return apiFetcher<ApiResponse<DailyReportItem>>("/api/daily-reports", {
    method: "POST",
    body: JSON.stringify(values),
  });
}

export function updateDailyReportService(
  id: string,
  values: UpdateDailyReportPayload,
) {
  return apiFetcher<ApiResponse<DailyReportItem>>(`/api/daily-reports/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
  });
}

export function deleteDailyReportService(id: string) {
  return apiFetcher<ApiResponse<DailyReportItem>>(`/api/daily-reports/${id}`, {
    method: "DELETE",
  });
}

export function reviewDailyReportService({
  id,
  values,
}: {
  id: string;
  values: ReviewDailyReportFormValues;
}) {
  return apiFetcher<ApiResponse<DailyReportItem>>(
    `/api/daily-reports/${id}/review`,
    {
      method: "POST",
      body: JSON.stringify(values),
    },
  );
}

export function submitDailyReportService(id: string) {
  return apiFetcher<ApiResponse<DailyReportItem>>(
    `/api/daily-reports/${id}/resubmit`,
    {
      method: "PATCH",
    },
  );
}

export function approveDailyReportService(id: string) {
  return apiFetcher<ApiResponse<DailyReportItem>>(
    `/api/daily-reports/${id}/approve`,
    {
      method: "PATCH",
    },
  );
}

export function rejectDailyReportService({
  id,
  reason,
}: {
  id: string;
  reason: string;
}) {
  return apiFetcher<ApiResponse<DailyReportItem>>(
    `/api/daily-reports/${id}/reject`,
    {
      method: "PATCH",
      body: JSON.stringify({ reason }),
    },
  );
}
