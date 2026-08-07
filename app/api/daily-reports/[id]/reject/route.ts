import { errorResponse, successResponse } from "@/lib/api-response";
import { requireRole } from "@/lib/auth/require-role";
import { rejectDailyReportService } from "@/server/services/daily-report/reject-report";
import { REVIEW_DAILY_REPORT_ROLES } from "@/utils/daily-report/daily-report-permission";

import { ZodError, z } from "zod";

const rejectDailyReportSchema = z.object({
  comment: z.string().trim().min(1, "Rejection comment is required."),
});

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

function getValidId(id: string) {
  const result = z.string().uuid().safeParse(id);
  return result.success ? result.data : null;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { user, error } = await requireRole(REVIEW_DAILY_REPORT_ROLES);

    if (error) return error;

    if (!user?.id) {
      return errorResponse("Unauthorized.", 401);
    }

    const { id } = await params;
    const reportId = getValidId(id);

    if (!reportId) {
      return errorResponse("Invalid report ID.", 400);
    }

    const body = await request.json();
    const values = rejectDailyReportSchema.parse(body);

    const report = await rejectDailyReportService({
      id: reportId,
      reviewerId: user.id,
      comment: values.comment,
    });

    return successResponse(report);
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(
        error.issues[0]?.message ?? "Validation error.",
        422,
      );
    }

    const message =
      error instanceof Error ? error.message : "Something went wrong.";

    return errorResponse(message, 400);
  }
}
