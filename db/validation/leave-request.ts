import { z } from "zod";

import {
  LEAVE_DURATION_TYPES,
  LEAVE_TYPES,
  LeaveDurationType,
  LeaveTypes,
} from "../constants/request-leave-status";

const leaveTypeValues = Object.values(LEAVE_TYPES) as [
  LeaveTypes,
  ...LeaveTypes[],
];

const leaveDurationValues = Object.values(LEAVE_DURATION_TYPES) as [
  LeaveDurationType,
  ...LeaveDurationType[],
];

export const requestLeaveSchema = z
  .object({
    leaveType: z.enum(leaveTypeValues, {
      message: "Leave type is required.",
    }),

    startDate: z.string().min(1, "Start date is required."),

    endDate: z.string().min(1, "End date is required."),

    durationDays: z.enum(leaveDurationValues, {
      message: "Leave duration is required.",
    }),

    reason: z
      .string()
      .trim()
      .min(10, "Reason must contain at least 10 characters.")
      .max(1000, "Reason must not exceed 1,000 characters."),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true;

      return new Date(data.endDate) >= new Date(data.startDate);
    },
    {
      message: "End date must be on or after the start date.",
      path: ["endDate"],
    },
  );

export type RequestLeaveFormValues = z.infer<typeof requestLeaveSchema>;
