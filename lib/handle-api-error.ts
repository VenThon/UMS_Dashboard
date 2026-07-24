// src/lib/handle-api-error.ts
import { AttendanceServiceError } from "@/server/services/attendance-service";

import { ZodError } from "zod";

import { apiError } from "./api-response";

export function handleApiError(error: unknown) {
  if (error instanceof AttendanceServiceError) {
    return apiError(error.message, error.statusCode);
  }

  if (error instanceof ZodError) {
    return apiError("Validation failed.", 422, error.flatten());
  }

  console.error(error);

  return apiError("Internal server error.", 500);
}
