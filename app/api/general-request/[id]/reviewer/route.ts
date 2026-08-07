import { NextResponse } from "next/server";

import { requireRole } from "@/lib/auth/require-role";
import { getGeneralRequestReviewsService } from "@/server/services/general-request/general-request-history";
import {
  REVIEW_GENERAL_REQUEST_ROLES,
  isUserRole,
} from "@/utils/general-request/request-leave-permission";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
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

    const { id } = await params;

    const reviews = await getGeneralRequestReviewsService({
      generalRequestId: id,
      currentUserId: user.id,
      currentUserRole: user.role,
    });

    return NextResponse.json({
      success: true,
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
      { status: 400 },
    );
  }
}
