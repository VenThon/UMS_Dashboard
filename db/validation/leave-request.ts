import { z } from "zod";

import {
  LEAVE_DURATION_TYPES,
  LEAVE_TYPES,
  LeaveDurationType,
  LeaveTypes,
  REQUEST_LEAVE_STATUS,
} from "../constants/request-leave-status";

const leaveTypeValues = Object.values(LEAVE_TYPES) as [
  LeaveTypes,
  ...LeaveTypes[],
];

const leaveDurationValues = Object.values(LEAVE_DURATION_TYPES) as [
  LeaveDurationType,
  ...LeaveDurationType[],
];

const dateStringSchema = z
  .string()
  .min(1, "Date is required.")
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must use the YYYY-MM-DD format.");

const requestLeaveBaseSchema = z.object({
  leaveType: z.enum(leaveTypeValues, {
    message: "Leave type is required.",
  }),

  startDate: dateStringSchema.refine(
    (value) => !Number.isNaN(Date.parse(`${value}T00:00:00`)),
    {
      message: "Start date is invalid.",
    },
  ),

  endDate: dateStringSchema.refine(
    (value) => !Number.isNaN(Date.parse(`${value}T00:00:00`)),
    {
      message: "End date is invalid.",
    },
  ),

  durationType: z.enum(leaveDurationValues, {
    message: "Leave duration is required.",
  }),

  reason: z
    .string()
    .trim()
    .min(10, "Reason must contain at least 10 characters.")
    .max(1000, "Reason must not exceed 1,000 characters."),
});

function validateDateRange(
  data: {
    startDate?: string;
    endDate?: string;
  },
  ctx: z.RefinementCtx,
) {
  if (!data.startDate || !data.endDate) {
    return;
  }

  if (data.endDate < data.startDate) {
    ctx.addIssue({
      code: "custom",
      path: ["endDate"],
      message: "End date must be on or after the start date.",
    });
  }
}

export const createRequestLeaveFormSchema =
  requestLeaveBaseSchema.superRefine(validateDateRange);

export const createRequestLeaveSchema = requestLeaveBaseSchema
  .extend({
    status: z
      .literal(REQUEST_LEAVE_STATUS.PENDING_FIRST_APPROVAL)
      .default(REQUEST_LEAVE_STATUS.PENDING_FIRST_APPROVAL),
  })
  .superRefine(validateDateRange);
export const updateRequestLeaveSchema = requestLeaveBaseSchema
  .partial()
  .superRefine(validateDateRange);

export type RequestLeaveFormValues = z.infer<
  typeof createRequestLeaveFormSchema
>;

// export type CreateRequestLeaveValue = z.infer<typeof createRequestLeaveSchema>;
export type CreateRequestLeaveInput = z.input<typeof createRequestLeaveSchema>;

export type CreateRequestLeaveValue = z.output<typeof createRequestLeaveSchema>;

export type UpdateRequestLeaveValue = z.infer<typeof updateRequestLeaveSchema>;

export const resubmitRequestLeaveSchema =
  requestLeaveBaseSchema.superRefine(validateDateRange);

export type ResubmitRequestLeaveValue = z.infer<
  typeof resubmitRequestLeaveSchema
>;
