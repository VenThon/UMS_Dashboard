import { apiSuccess } from "@/lib/api-response";
import { requireCurrentUser } from "@/lib/auth/require-current-user";
import { handleApiError } from "@/lib/handle-api-error";
import { getDailyReportSummary } from "@/server/services/daily-report-service";

export async function GET() {
  try {
    await requireCurrentUser();

    const summary = await getDailyReportSummary();

    return apiSuccess(summary);
  } catch (error) {
    return handleApiError(error);
  }
}
