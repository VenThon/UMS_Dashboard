import { NextResponse } from "next/server";

import { resubmitRequestLeaveSchema } from "@/db/validation/leave-request";
import { requireRole } from "@/lib/auth/require-role";
import { resubmitRequestLeaveService } from "@/server/services/leave-request/resubmit-leave-request";
import { CREATE_REQUEST_LEAVE_ROLES } from "@/utils/general-request/request-leave-permission";

import { z } from "zod";

const idSchema = z.string().uuid("Invalid leave request ID.");

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: Request, { params }: RouteContext) {
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

    const body: unknown = await request.json();

    const validationResult = resubmitRequestLeaveSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid resubmission data.",
          errors: validationResult.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    const result = await resubmitRequestLeaveService({
      id: idResult.data,
      userId: user.id,
      values: validationResult.data,
    });

    return NextResponse.json({
      success: true,
      message: "Leave request resubmitted successfully.",
      data: result,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to resubmit the leave request.";

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
