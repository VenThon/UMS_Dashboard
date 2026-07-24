// src/db/validation/attendance.ts
import {
  ATTENDANCE_STATUS_VALUES,
  type AttendanceStatus,
} from "@/db/constants/attendance";

import { z } from "zod";

export const attendanceStatusSchema = z.enum(
  ATTENDANCE_STATUS_VALUES as [AttendanceStatus, ...AttendanceStatus[]],
);

export const attendanceListQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),

    pageSize: z.coerce.number().int().min(1).max(100).default(10),

    status: attendanceStatusSchema.optional(),

    userId: z.string().uuid().optional(),

    dateFrom: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),

    dateTo: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),

    search: z.string().trim().max(100).optional(),
  })
  .superRefine((data, context) => {
    if (data.dateFrom && data.dateTo && data.dateFrom > data.dateTo) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["dateTo"],
        message: "The end date must be after the start date.",
      });
    }
  });

export const updateAttendanceSchema = z.object({
  status: attendanceStatusSchema.optional(),

  checkInAt: z.coerce.date().nullable().optional(),

  checkOutAt: z.coerce.date().nullable().optional(),

  note: z.string().trim().max(1000).nullable().optional(),
});

export type AttendanceListQuery = z.infer<typeof attendanceListQuerySchema>;

export type UpdateAttendanceValues = z.infer<typeof updateAttendanceSchema>;
