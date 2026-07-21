// src/app/api/general-requests/[id]/approve/route.ts
import { NextResponse } from "next/server";

import { reviewGeneralRequestSchema } from "@/db/validation/general-request";
import { requireRole } from "@/lib/auth/require-role";
import { approveGeneralRequestService } from "@/server/services/general-request/approve-general-request";
import {
  REVIEW_GENERAL_REQUEST_ROLES,
  getGeneralRequestApprovalLevel,
  isUserRole,
} from "@/utils/general-request/request-leave-permission";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const { user, error } = await requireRole(REVIEW_GENERAL_REQUEST_ROLES);

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

    const approvalLevel = getGeneralRequestApprovalLevel(user.role);

    if (approvalLevel === null) {
      return NextResponse.json(
        {
          success: false,
          message: "You do not have permission to approve this request.",
        },
        { status: 403 },
      );
    }

    const { id } = await params;
    const body = await request.json();

    const parsedBody = reviewGeneralRequestSchema.safeParse(body);

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

    const result = await approveGeneralRequestService({
      generalRequestId: id,
      reviewerId: user.id,
      approvalLevel,
      comment: parsedBody.data.comment,
    });

    return NextResponse.json({
      success: true,
      message:
        approvalLevel === 1
          ? "First approval completed successfully."
          : "General request approved successfully.",
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to approve general request.",
      },
      { status: 400 },
    );
  }
}
