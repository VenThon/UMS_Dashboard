import { NextResponse } from "next/server";

import { createRequestLeaveSchema } from "@/db/validation/leave-request";
import { requestLeaveQuerySchema } from "@/db/validation/leave-request-query";
import { requireRole } from "@/lib/auth/require-role";
import { createRequestLeaveService } from "@/server/services/leave-request/create-request-leave.service";
import { getRequestLeaveListService } from "@/server/services/leave-request/get-request-leave.service";
import {
  CREATE_REQUEST_LEAVE_ROLES,
  VIEW_REQUEST_LEAVE_ROLES,
} from "@/utils/general-request/request-leave-permission";

export async function GET(request: Request) {
  try {
    const { user, error } = await requireRole(VIEW_REQUEST_LEAVE_ROLES);

    if (error) {
      return error;
    }

    const { searchParams } = new URL(request.url);

    const queryResult = requestLeaveQuerySchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      pageSize: searchParams.get("pageSize") ?? undefined,
      status: searchParams.get("status") ?? undefined,
    });

    if (!queryResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid query parameters.",
          errors: queryResult.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    const result = await getRequestLeaveListService({
      currentUserId: user.id,
      currentUserRole: user.role,
      page: queryResult.data.page,
      pageSize: queryResult.data.pageSize,
      status: queryResult.data.status,
    });

    return NextResponse.json({
      success: true,
      message: "Leave requests retrieved successfully.",
      ...result,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to retrieve leave requests.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { user, error } = await requireRole(CREATE_REQUEST_LEAVE_ROLES);

    if (error) {
      return error;
    }

    const body: unknown = await request.json();

    const validationResult = createRequestLeaveSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid leave request data.",
          errors: validationResult.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    const leaveRequest = await createRequestLeaveService({
      userId: user.id,
      values: validationResult.data,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Leave request created successfully.",
        data: leaveRequest,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to create the leave request.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 400,
      },
    );
  }
}
