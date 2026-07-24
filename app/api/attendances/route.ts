// src/app/api/attendances/route.ts
import { attendanceListQuerySchema } from "@/db/validation/attendance";
import { apiSuccess } from "@/lib/api-response";
import { requireCurrentUser } from "@/lib/auth/require-current-user";
import { handleApiError } from "@/lib/handle-api-error";
import { getAttendanceList } from "@/server/services/attendance-service";

export async function GET(request: Request) {
  try {
    const currentUser = await requireCurrentUser();

    const { searchParams } = new URL(request.url);

    const query = attendanceListQuerySchema.parse({
      page: searchParams.get("page") ?? undefined,
      pageSize: searchParams.get("pageSize") ?? undefined,
      status: searchParams.get("status") ?? undefined,

      // Always restrict records to the logged-in user.
      userId: currentUser.id,

      dateFrom: searchParams.get("dateFrom") ?? undefined,
      dateTo: searchParams.get("dateTo") ?? undefined,

      // A user does not need to search other users.
      search: undefined,
    });

    const result = await getAttendanceList(query);

    return apiSuccess(result);
  } catch (error) {
    return handleApiError(error);
  }
}
