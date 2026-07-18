import { NextResponse } from "next/server";

import { approveRequestLeaveSchema } from "@/db/schema";
import { USER_ROLE } from "@/db/types/user.type";
import { requireRole } from "@/lib/auth/require-role";
import { approveRequestLeaveService } from "@/server/services/leave-request/approve-leave-request";
import { REVIEW_REQUEST_LEAVE_ROLES } from "@/utils/general-request/request-leave-permission";

import { z } from "zod";

const idSchema = z.string().uuid("Invalid leave request ID.");

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export function getApprovalLevel(role: string): 1 | 2 | null {
  if (role === USER_ROLE.LEAD_FRONTEND) {
    return 1;
  }

  if (role === USER_ROLE.PROJECT_MANAGER) {
    return 2;
  }

  return null;
}

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
          message: "Your role is not configured as a leave request approver.",
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

    const validationResult = approveRequestLeaveSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid approval data.",
          errors: validationResult.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    const result = await approveRequestLeaveService({
      requestLeaveId: idResult.data,
      reviewerId: user.id,
      approvalLevel,
      comment: validationResult.data.comment,
    });

    return NextResponse.json({
      success: true,
      message:
        approvalLevel === 1
          ? "First approval completed successfully."
          : "Leave request approved successfully.",
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to approve the leave request.",
      },
      {
        status: 400,
      },
    );
  }
}
