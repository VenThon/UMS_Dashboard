import { NextResponse } from "next/server";

import { updateRequestLeaveSchema } from "@/db/validation/leave-request";
import { requireRole } from "@/lib/auth/require-role";
import { deleteRequestLeaveService } from "@/server/services/leave-request/delete-request-leave.service";
import { getRequestLeaveByIdService } from "@/server/services/leave-request/get-request-leave-by-id.service";
import { updateRequestLeaveService } from "@/server/services/leave-request/update-request-leave.service";
import {
  CREATE_REQUEST_LEAVE_ROLES,
  VIEW_REQUEST_LEAVE_ROLES,
} from "@/utils/general-request/request-leave-permission";

import { z } from "zod";

const requestLeaveIdSchema = z.string().uuid("Invalid leave request ID.");

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { user, error } = await requireRole(VIEW_REQUEST_LEAVE_ROLES);

    if (error) {
      return error;
    }

    const { id } = await params;

    const idResult = requestLeaveIdSchema.safeParse(id);

    if (!idResult.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            idResult.error.issues[0]?.message ?? "Invalid leave request ID.",
        },
        {
          status: 400,
        },
      );
    }

    const leaveRequest = await getRequestLeaveByIdService({
      id: idResult.data,
      currentUserId: user.id,
      currentUserRole: user.role,
    });

    return NextResponse.json({
      success: true,
      message: "Leave request retrieved successfully.",
      data: leaveRequest,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to retrieve the leave request.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 404,
      },
    );
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { user, error } = await requireRole(CREATE_REQUEST_LEAVE_ROLES);

    if (error) {
      return error;
    }

    const { id } = await params;

    const idResult = requestLeaveIdSchema.safeParse(id);

    if (!idResult.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            idResult.error.issues[0]?.message ?? "Invalid leave request ID.",
        },
        {
          status: 400,
        },
      );
    }

    const body: unknown = await request.json();

    const validationResult = updateRequestLeaveSchema.safeParse(body);

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

    const updatedLeaveRequest = await updateRequestLeaveService({
      id: idResult.data,
      userId: user.id,
      values: validationResult.data,
    });

    return NextResponse.json({
      success: true,
      message: "Leave request updated successfully.",
      data: updatedLeaveRequest,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to update the leave request.";

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

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { user, error } = await requireRole(CREATE_REQUEST_LEAVE_ROLES);

    if (error) {
      return error;
    }

    const { id } = await params;

    const idResult = requestLeaveIdSchema.safeParse(id);

    if (!idResult.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            idResult.error.issues[0]?.message ?? "Invalid leave request ID.",
        },
        {
          status: 400,
        },
      );
    }

    const deletedLeaveRequest = await deleteRequestLeaveService({
      id: idResult.data,
      userId: user.id,
    });

    return NextResponse.json({
      success: true,
      message: "Leave request deleted successfully.",
      data: deletedLeaveRequest,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to delete the leave request.";

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
