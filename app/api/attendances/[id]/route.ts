import { apiError, apiSuccess } from "@/lib/api-response";
import { requireCurrentUser } from "@/lib/auth/require-current-user";
import { handleApiError } from "@/lib/handle-api-error";
import { getAttendanceDetail } from "@/server/services/attendance-service";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const currentUser = await requireCurrentUser();
    const { id } = await context.params;

    const attendance = await getAttendanceDetail(id);

    const isOwner = attendance.userId === currentUser.id;

    if (!isOwner) {
      return apiError(
        "You do not have permission to view this attendance record.",
        403,
      );
    }

    return apiSuccess(attendance);
  } catch (error) {
    return handleApiError(error);
  }
}
