import { createDailyReportSchema } from "@/db/validation/dialyreport";
// import type { UserRole } from "@/db/types/user.type";
import { errorResponse, successResponse } from "@/lib/api-response";
import { requireRole } from "@/lib/auth/require-role";
import {
  CREATE_DAILY_REPORT_ROLES,
  VIEW_DAILY_REPORT_ROLES,
} from "@/utils/daily-report/daily-report-permission";

import { ZodError } from "zod";

import { createDailyReportService } from "../services/daily-report/create-daily-report.service";
import { getDailyReportsService } from "../services/daily-report/get-daily-reports.service";

export async function GET() {
  try {
    const { user, error } = await requireRole(VIEW_DAILY_REPORT_ROLES);

    if (error) return error;

    if (!user?.id) {
      return errorResponse("Unauthorized.", 401);
    }

    // const reports = await getDailyReportsService({
    //   userId: user.id,
    //   role: user.role as UserRole,
    // });

    const reports = await getDailyReportsService();

    return successResponse(reports);
  } catch (error) {
    console.error("GET /api/daily-reports error:", error);

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
    console.error("POST /api/daily-reports error:", error);

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
