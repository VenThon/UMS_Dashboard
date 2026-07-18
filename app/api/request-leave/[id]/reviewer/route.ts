import { NextResponse } from "next/server";

import { reviewRequestLeaveSchema } from "@/db/schema";
import { requireRole } from "@/lib/auth/require-role";
import {
  getRequestLeaveReviewHistoryService,
  reviewRequestLeaveService,
} from "@/server/services/leave-request/review-request-leave.service";
import {
  REVIEW_REQUEST_LEAVE_ROLES,
  VIEW_REQUEST_LEAVE_ROLES,
} from "@/utils/general-request/request-leave-permission";

import { z } from "zod";

const idSchema = z.string().uuid("Invalid leave request ID.");

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function getApprovalLevel(role: string): 1 | 2 | null {
  switch (role) {
    case "team_lead":
      return 1;

    case "department_director":
      return 2;

    default:
      return null;
  }
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
    const validationResult = reviewRequestLeaveSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid review data.",
          errors: validationResult.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    const result = await reviewRequestLeaveService({
      requestLeaveId: idResult.data,
      reviewerId: user.id,
      approvalLevel,
      values: validationResult.data,
    });

    const actionMessage =
      validationResult.data.status === "approved"
        ? approvalLevel === 1
          ? "First approval completed successfully."
          : "Leave request approved successfully."
        : "Leave request rejected successfully.";

    return NextResponse.json({
      success: true,
      message: actionMessage,
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to review the leave request.",
      },
      {
        status: 400,
      },
    );
  }
}

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { user, error } = await requireRole(VIEW_REQUEST_LEAVE_ROLES);

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

    const reviews = await getRequestLeaveReviewHistoryService({
      requestLeaveId: idResult.data,
      currentUserId: user.id,
      currentUserRole: user.role,
    });

    return NextResponse.json({
      success: true,
      message: "Review history retrieved successfully.",
      data: reviews,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to retrieve review history.",
      },
      {
        status: 400,
      },
    );
  }
}
