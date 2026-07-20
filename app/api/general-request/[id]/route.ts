// src/app/api/general-requests/[id]/route.ts
import { NextResponse } from "next/server";

import { updateGeneralRequestSchema } from "@/db/validation/general-request";
import { requireRole } from "@/lib/auth/require-role";
import { deleteGeneralRequestService } from "@/server/services/general-request/delete-general-reqquest";
import { getGeneralRequestByIdService } from "@/server/services/general-request/get-general-request-by-id";
import { updateGeneralRequestService } from "@/server/services/general-request/update-general-request";
import {
  CREATE_GENERAL_REQUEST_ROLES,
  isUserRole,
} from "@/utils/general-request/request-leave-permission";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
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

    const { id } = await params;

    const generalRequest = await getGeneralRequestByIdService({
      generalRequestId: id,
      currentUserId: user.id,
      currentUserRole: user.role,
    });

    return NextResponse.json({
      success: true,
      data: generalRequest,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to retrieve general request.",
      },
      { status: 400 },
    );
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { user, error } = await requireRole(CREATE_GENERAL_REQUEST_ROLES);

    if (error) {
      return error;
    }

    const { id } = await params;
    const body = await request.json();

    const parsedBody = updateGeneralRequestSchema.safeParse(body);

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

    const updatedRequest = await updateGeneralRequestService({
      generalRequestId: id,
      userId: user.id,
      values: parsedBody.data,
    });

    return NextResponse.json({
      success: true,
      message: "General request updated successfully.",
      data: updatedRequest,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update general request.",
      },
      { status: 400 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { user, error } = await requireRole(CREATE_GENERAL_REQUEST_ROLES);

    if (error) {
      return error;
    }

    const { id } = await params;

    const deletedRequest = await deleteGeneralRequestService({
      generalRequestId: id,
      userId: user.id,
    });

    return NextResponse.json({
      success: true,
      message: "General request deleted successfully.",
      data: deletedRequest,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete general request.",
      },
      { status: 400 },
    );
  }
}
