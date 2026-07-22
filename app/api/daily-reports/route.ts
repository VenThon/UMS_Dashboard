import { createDailyReportSchema } from "@/db/validation/dialyreport";
import { errorResponse, successResponse } from "@/lib/api-response";
import { requireRole } from "@/lib/auth/require-role";
import { createDailyReportService } from "@/server/services/daily-report/create-daily-report.service";
import { getDailyReportsService } from "@/server/services/daily-report/get-daily-reports.service";
import {
  CREATE_DAILY_REPORT_ROLES,
  VIEW_DAILY_REPORT_ROLES,
} from "@/utils/daily-report/daily-report-permission";

import { ZodError } from "zod";

export async function GET() {
  try {
    const { user, error } = await requireRole(VIEW_DAILY_REPORT_ROLES);

    if (error) return error;

    if (!user?.id) {
      return errorResponse("Unauthorized.", 401);
    }

    const reports = await getDailyReportsService();

    return successResponse(reports);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong.";

    return errorResponse(message, 500);
  }
}

export async function POST(request: Request) {
  try {
    const { user, error } = await requireRole(CREATE_DAILY_REPORT_ROLES);

    if (error) return error;

    if (!user?.id) {
      return errorResponse("Unauthorized.", 401);
    }

    const body = await request.json();
    const values = createDailyReportSchema.parse(body);

    const report = await createDailyReportService({
      values,
      userId: user.id,
    });

    return successResponse(report, 201);
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
