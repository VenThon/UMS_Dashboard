// src/lib/api-response.ts
import { NextResponse } from "next/server";

export function successResponse<T>(data: T, status = 200) {
  return Response.json(
    {
      success: true,
      data,
    },
    { status },
  );
}

export function errorResponse(message: string, status = 400) {
  return Response.json(
    {
      success: false,
      error: {
        message,
      },
    },
    { status },
  );
}

export function apiSuccess<T>(data: T, message?: string, status = 200) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status },
  );
}

export function apiError(message: string, status = 500, errors?: unknown) {
  return NextResponse.json(
    {
      success: false,
      message,
      errors,
    },
    { status },
  );
}
