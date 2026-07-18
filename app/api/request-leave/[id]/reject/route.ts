import { NextResponse } from "next/server";

import { rejectRequestLeaveSchema } from "@/db/schema";
import { requireRole } from "@/lib/auth/require-role";
import { rejectRequestLeaveService } from "@/server/services/leave-request/reject-leave-request";
import { REVIEW_REQUEST_LEAVE_ROLES } from "@/utils/general-request/request-leave-permission";

import { z } from "zod";

import { getApprovalLevel } from "../approve/route";

const idSchema = z.string().uuid("Invalid leave request ID.");

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const { user, error } = await requireRole(REVIEW_REQUEST_LEAVE_ROLES);

    if (error) {
      return error;
    }

    const approvalLevel = getApprovalLevel(user.role);

    if (!approvalLevel) {
      return NextResponse.json(
        {
          success: false,
          message: "Your role is not configured as a leave request reviewer.",
        },
        {
          status: 403,
        },
      );
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

    const body: unknown = await request.json();

    const validationResult = rejectRequestLeaveSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid rejection data.",
          errors: validationResult.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    const result = await rejectRequestLeaveService({
      requestLeaveId: idResult.data,
      reviewerId: user.id,
      approvalLevel,
      comment: validationResult.data.comment,
    });

    return NextResponse.json({
      success: true,
      message: "Leave request rejected successfully.",
      data: result,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to reject the leave request.";

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
