// app/api/attendances/check-in/route.ts
import { apiSuccess } from "@/lib/api-response";
import { requireCurrentUser } from "@/lib/auth/require-current-user";
import { handleApiError } from "@/lib/handle-api-error";
import { checkInAttendance } from "@/server/services/attendance-service";

export async function POST() {
  try {
    const currentUser = await requireCurrentUser();

    const attendance = await checkInAttendance(currentUser.id);

    return apiSuccess(attendance, "Checked in successfully.", 201);
  } catch (error) {
    return handleApiError(error);
  }
}
