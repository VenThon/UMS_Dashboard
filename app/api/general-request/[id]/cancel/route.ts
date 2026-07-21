// src/app/api/general-requests/[id]/cancel/route.ts
import { NextResponse } from "next/server";

import { requireRole } from "@/lib/auth/require-role";
import { cancelGeneralRequestService } from "@/server/services/general-request/cancel-general-request";
import { CREATE_GENERAL_REQUEST_ROLES } from "@/utils/general-request/request-leave-permission";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(_request: Request, { params }: RouteContext) {
  try {
    const { user, error } = await requireRole(CREATE_GENERAL_REQUEST_ROLES);

    if (error) {
      return error;
    }

    const { id } = await params;

    const cancelledRequest = await cancelGeneralRequestService({
      generalRequestId: id,
      userId: user.id,
    });

    return NextResponse.json({
      success: true,
      message: "General request cancelled successfully.",
      data: cancelledRequest,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to cancel general request.",
      },
      { status: 400 },
    );
  }
}
