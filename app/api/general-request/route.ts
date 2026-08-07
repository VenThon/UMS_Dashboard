import { NextResponse } from "next/server";

import {
  createGeneralRequestSchema,
  generalRequestQuerySchema,
} from "@/db/validation/general-request";
import { requireRole } from "@/lib/auth/require-role";
import { createGeneralRequestService } from "@/server/services/general-request/create-general-request";
import { getGeneralRequestsService } from "@/server/services/general-request/get-general-requests";
import {
  CREATE_GENERAL_REQUEST_ROLES,
  isUserRole,
} from "@/utils/general-request/request-leave-permission";

export async function GET(request: Request) {
  try {
    const { user, error } = await requireRole(CREATE_GENERAL_REQUEST_ROLES);

    if (error) {
      return error;
    }

    if (!isUserRole(user.role)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid user role.",
        },
        { status: 403 },
      );
    }

    const url = new URL(request.url);

    const parsedQuery = generalRequestQuerySchema.safeParse({
      page: url.searchParams.get("page") ?? undefined,
      pageSize: url.searchParams.get("pageSize") ?? undefined,
      status: url.searchParams.get("status") ?? undefined,
      search: url.searchParams.get("search") ?? undefined,
    });

    if (!parsedQuery.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid query parameters.",
          errors: parsedQuery.error.flatten(),
        },
        { status: 400 },
      );
    }

    const result = await getGeneralRequestsService({
      currentUserId: user.id,
      currentUserRole: user.role,
      page: parsedQuery.data.page,
      pageSize: parsedQuery.data.pageSize,
      status: parsedQuery.data.status,
      search: parsedQuery.data.search,
    });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to retrieve general requests.",
      },
      { status: 400 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { user, error } = await requireRole(CREATE_GENERAL_REQUEST_ROLES);

    if (error) {
      return error;
    }

    const body = await request.json();

    const parsedBody = createGeneralRequestSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data.",
          errors: parsedBody.error.flatten(),
        },
        { status: 400 },
      );
    }

    const createdRequest = await createGeneralRequestService({
      userId: user.id,
      values: parsedBody.data,
    });

    return NextResponse.json(
      {
        success: true,
        message: "General request created successfully.",
        data: createdRequest,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create general request.",
      },
      { status: 400 },
    );
  }
}
