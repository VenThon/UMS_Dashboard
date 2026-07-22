import { NextResponse } from "next/server";

import { rejectRequestLeaveSchema } from "@/db/schema";
import { USER_ROLE, type UserRole } from "@/db/types/user.type";
import { requireRole } from "@/lib/auth/require-role";
import { rejectRequestLeaveService } from "@/server/services/leave-request/reject-leave-request";
import { getRequestLeaveApprovalLevel } from "@/utils/general-request/request-leave-permission";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

const REJECT_REQUEST_LEAVE_ROLES = [
  USER_ROLE.LEAD_FRONTEND,
  USER_ROLE.IT_MANAGER,
] as const;

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const { user, error } = await requireRole(REJECT_REQUEST_LEAVE_ROLES);

    if (error) {
      return error;
    }

    const { id } = await params;
    const body = await request.json();

    const parsedBody = rejectRequestLeaveSchema.safeParse(body);

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

    const approvalLevel = getRequestLeaveApprovalLevel(user.role as UserRole);

    if (approvalLevel === null) {
      return NextResponse.json(
        {
          success: false,
          message: "You do not have permission to reject leave requests.",
        },
        { status: 403 },
      );
    }

    const rejectedRequest = await rejectRequestLeaveService({
      requestLeaveId: id,
      reviewerId: user.id,
      approvalLevel,
      comment: parsedBody.data.comment,
    });

    return NextResponse.json({
      success: true,
      message: "Leave request rejected successfully.",
      data: rejectedRequest,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to reject leave request.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 400 },
    );
  }
}
