import { createDailyReportSchema } from "@/db/validation/dialyreport";
import { errorResponse, successResponse } from "@/lib/api-response";
import { requireRole } from "@/lib/auth/require-role";
import { CREATE_DAILY_REPORT_ROLES } from "@/utils/daily-report/daily-report-permission";

import { ZodError, z } from "zod";

import { deleteDailyReportService } from "../../services/daily-report/delete-daily-report.service";
import { getDailyReportByIdService } from "../../services/daily-report/get-daily-report-by-id.service";
import { updateDailyReportService } from "../../services/daily-report/update-daily-report.service";

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

export async function GET(_request: Request, { params }: RouteParams) {
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

    const report = await getDailyReportByIdService(reportId);

    if (!report) {
      return errorResponse("Daily report not found.", 404);
    }

    return successResponse(report);
  } catch (error) {
    console.error("GET /api/daily-reports/[id] error:", error);

    const message =
      error instanceof Error ? error.message : "Something went wrong.";

    return errorResponse(message, 500);
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
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

    const body = await request.json();
    const values = createDailyReportSchema.parse(body);

    const report = await updateDailyReportService({
      id: reportId,
      userId: user.id,
      values,
    });

    return successResponse(report);
  } catch (error) {
    console.error("PATCH /api/daily-reports/[id] error:", error);

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

export async function DELETE(_request: Request, { params }: RouteParams) {
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

    const report = await deleteDailyReportService({
      id: reportId,
      userId: user.id,
    });

    return successResponse(report);
  } catch (error) {
    console.error("DELETE /api/daily-reports/[id] error:", error);

    const message =
      error instanceof Error ? error.message : "Something went wrong.";

    return errorResponse(message, 400);
  }
}
