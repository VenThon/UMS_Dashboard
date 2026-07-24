// app/api/attendances/check-out/route.ts
import { apiSuccess } from "@/lib/api-response";
import { requireCurrentUser } from "@/lib/auth/require-current-user";
import { handleApiError } from "@/lib/handle-api-error";
import { checkOutAttendance } from "@/server/services/attendance-service";

export async function POST() {
  try {
    const currentUser = await requireCurrentUser();

    const attendance = await checkOutAttendance(currentUser.id);

    return apiSuccess(attendance, "Checked out successfully.");
  } catch (error) {
    return handleApiError(error);
  }
}
