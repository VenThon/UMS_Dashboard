import { submitDailyReportService } from "@/app/api/services/daily-report/resubmit-daily-report";
import { errorResponse, successResponse } from "@/lib/api-response";
import { requireRole } from "@/lib/auth/require-role";
import { CREATE_DAILY_REPORT_ROLES } from "@/utils/daily-report/daily-report-permission";

import { z } from "zod";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

function getValidId(id: string) {
  const result = z.string().uuid().safeParse(id);

  if (!result.success) {
    return null;
  }

  return result.data;
}

export async function PATCH(_request: Request, { params }: RouteParams) {
  try {
    const { user, error } = await requireRole(CREATE_DAILY_REPORT_ROLES);

    if (error) return error;

    if (!user?.id) {
      return errorResponse("Unauthorized.", 401);
    }

    const { id } = await params;
    const reportId = getValidId(id);

    if (!reportId) {
      return errorResponse("Invalid report ID.", 400);
    }

    const report = await submitDailyReportService({
      id: reportId,
      userId: user.id,
    });

    return successResponse(report);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong.";

    return errorResponse(message, 400);
  }
}
