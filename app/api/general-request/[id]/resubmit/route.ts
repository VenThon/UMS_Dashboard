import { NextResponse } from "next/server";

import { resubmitGeneralRequestSchema } from "@/db/validation/general-request";
import { requireRole } from "@/lib/auth/require-role";
import { resubmitGeneralRequestService } from "@/server/services/general-request/resubmit-general-request";
import { CREATE_GENERAL_REQUEST_ROLES } from "@/utils/general-request/request-leave-permission";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const { user, error } = await requireRole(CREATE_GENERAL_REQUEST_ROLES);

    if (error) {
      return error;
    }

    const { id } = await params;
    const body = await request.json();

    const parsedBody = resubmitGeneralRequestSchema.safeParse(body);

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

    const resubmittedRequest = await resubmitGeneralRequestService({
      generalRequestId: id,
      userId: user.id,
      values: parsedBody.data,
    });

    return NextResponse.json({
      success: true,
      message: "General request resubmitted successfully.",
      data: resubmittedRequest,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to resubmit general request.",
      },
      { status: 400 },
    );
  }
}
