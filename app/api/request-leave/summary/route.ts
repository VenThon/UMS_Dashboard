import { apiSuccess } from "@/lib/api-response";
import { requireCurrentUser } from "@/lib/auth/require-current-user";
import { handleApiError } from "@/lib/handle-api-error";
import { getRequestLeaveSummary } from "@/server/services/request-leave-service";

export async function GET() {
  try {
    await requireCurrentUser();

    const summary = await getRequestLeaveSummary();

    return apiSuccess(summary);
  } catch (error) {
    return handleApiError(error);
  }
}
