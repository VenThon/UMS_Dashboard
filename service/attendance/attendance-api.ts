// src/features/attendance/api/attendance-api.ts
import {
  Attendance,
  AttendanceDetail,
  PaginatedAttendanceResponse,
} from "@/app/[locale]/dashboard/developments/attendance/_hooks/types";
import type {
  AttendanceListQuery,
  UpdateAttendanceValues,
} from "@/db/validation/attendance";

async function fetchJson<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, init);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message ?? "Request failed.");
  }

  return result.data;
}

export function getTodayAttendanceApi() {
  return fetchJson<Attendance | null>("/api/attendances/today");
}

export function checkInAttendanceApi() {
  return fetchJson<Attendance>("/api/attendances/check-in", {
    method: "POST",
  });
}

export function checkOutAttendanceApi() {
  return fetchJson<Attendance>("/api/attendances/check-out", {
    method: "POST",
  });
}

export function getAttendancesApi(query: AttendanceListQuery) {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  return fetchJson<PaginatedAttendanceResponse>(
    `/api/attendances?${searchParams.toString()}`,
  );
}

export function getAttendanceDetailApi(id: string) {
  return fetchJson<AttendanceDetail>(`/api/attendances/${id}`);
}

export function updateAttendanceApi(
  id: string,
  values: UpdateAttendanceValues,
) {
  return fetchJson<Attendance>(`/api/attendances/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
}
