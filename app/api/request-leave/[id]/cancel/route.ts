import { NextResponse } from "next/server";

import { requireRole } from "@/lib/auth/require-role";
import { cancelRequestLeaveService } from "@/server/services/leave-request/cancel-leave-request-leave.service";
import { CREATE_REQUEST_LEAVE_ROLES } from "@/utils/general-request/request-leave-permission";

import { z } from "zod";

const idSchema = z.string().uuid("Invalid leave request ID.");

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(_request: Request, { params }: RouteContext) {
  try {
    const { user, error } = await requireRole(CREATE_REQUEST_LEAVE_ROLES);

    if (error) {
      return error;
    }

    const { id } = await params;
    const idResult = idSchema.safeParse(id);

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

    const result = await cancelRequestLeaveService({
      id: idResult.data,
      userId: user.id,
    });

    return NextResponse.json({
      success: true,
      message: "Leave request cancelled successfully.",
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to cancel the leave request.",
      },
      {
        status: 400,
      },
    );
  }
}
