// src/app/api/attendances/today/route.ts
import { apiSuccess } from "@/lib/api-response";
import { requireCurrentUser } from "@/lib/auth/require-current-user";
import { handleApiError } from "@/lib/handle-api-error";
import { getTodayAttendance } from "@/server/services/attendance-service";

export async function GET() {
  try {
    const currentUser = await requireCurrentUser();

    const attendance = await getTodayAttendance(currentUser.id);

    return apiSuccess(attendance);
  } catch (error) {
    return handleApiError(error);
  }
}
