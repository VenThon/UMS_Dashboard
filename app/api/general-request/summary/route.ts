import { apiSuccess } from "@/lib/api-response";
import { requireCurrentUser } from "@/lib/auth/require-current-user";
import { handleApiError } from "@/lib/handle-api-error";
import { getGeneralRequestSummary } from "@/server/services/general-request-service";

export async function GET() {
  try {
    await requireCurrentUser();

    const summary = await getGeneralRequestSummary();

    return apiSuccess(summary);
  } catch (error) {
    return handleApiError(error);
  }
}
