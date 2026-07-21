import z from "zod";

export const LEAVE_TYPES = {
  ANNUAL_LEAVE: "annual_leave",
  SICK_LEAVE: "sick_leave",
  PERSONAL_LEAVE: "personal_leave",
  EMERGENCY_LEAVE: "emergency_leave",
  MATERNITY_LEAVE: "maternity_leave",
  WEDDING_LEAVE: "wedding_leave",
  OTHER: "other",
} as const;

export type LeaveTypes = (typeof LEAVE_TYPES)[keyof typeof LEAVE_TYPES];
export const LeaveTypesSchema = z.enum([
  LEAVE_TYPES.ANNUAL_LEAVE,
  LEAVE_TYPES.SICK_LEAVE,
  LEAVE_TYPES.PERSONAL_LEAVE,
  LEAVE_TYPES.EMERGENCY_LEAVE,
  LEAVE_TYPES.MATERNITY_LEAVE,
  LEAVE_TYPES.WEDDING_LEAVE,
  LEAVE_TYPES.OTHER,
]);

export const LEAVE_TYPES_LABELS: Record<LeaveTypes, string> = {
  [LEAVE_TYPES.ANNUAL_LEAVE]: "Annual Leave",
  [LEAVE_TYPES.SICK_LEAVE]: "Sick Leave",
  [LEAVE_TYPES.PERSONAL_LEAVE]: "Personal Leave",
  [LEAVE_TYPES.EMERGENCY_LEAVE]: "Emergency Leave",
  [LEAVE_TYPES.MATERNITY_LEAVE]: "Maternity Leave",
  [LEAVE_TYPES.WEDDING_LEAVE]: "Wedding Leave",
  [LEAVE_TYPES.OTHER]: "Others",
};

export const REQUEST_LEAVE_STATUS = {
  PENDING_FIRST_APPROVAL: "pending_first_approval",
  PENDING_SECOND_APPROVAL: "pending_second_approval",
  APPROVED: "approved",
  REJECTED: "rejected",
  CANCELLED: "cancelled",
} as const;

export type RequestLeaveStatus =
  (typeof REQUEST_LEAVE_STATUS)[keyof typeof REQUEST_LEAVE_STATUS];

export const requestLeaveStatusSchema = z.enum([
  REQUEST_LEAVE_STATUS.PENDING_FIRST_APPROVAL,
  REQUEST_LEAVE_STATUS.PENDING_SECOND_APPROVAL,
  REQUEST_LEAVE_STATUS.APPROVED,
  REQUEST_LEAVE_STATUS.REJECTED,
  REQUEST_LEAVE_STATUS.CANCELLED,
]);

export const REQUEST_LEAVE_STATUS_LABELS: Record<RequestLeaveStatus, string> = {
  [REQUEST_LEAVE_STATUS.PENDING_FIRST_APPROVAL]: "Pending First Approval",
  [REQUEST_LEAVE_STATUS.PENDING_SECOND_APPROVAL]: "Pending Second Approval",
  [REQUEST_LEAVE_STATUS.APPROVED]: "Approved",
  [REQUEST_LEAVE_STATUS.REJECTED]: "Rejected",
  [REQUEST_LEAVE_STATUS.CANCELLED]: "Cancelled",
};

export const LEAVE_DURATION_TYPES = {
  FULL_DAY: "full_day",
  HALF_DAY_MORNING: "half_day_morning",
  HALF_DAY_AFTERNOON: "half_day_afternoon",
} as const;

export type LeaveDurationType =
  (typeof LEAVE_DURATION_TYPES)[keyof typeof LEAVE_DURATION_TYPES];

export const LEAVE_DURATION_LABELS: Record<LeaveDurationType, string> = {
  [LEAVE_DURATION_TYPES.FULL_DAY]: "Full day",
  [LEAVE_DURATION_TYPES.HALF_DAY_MORNING]: "Half-day morning",
  [LEAVE_DURATION_TYPES.HALF_DAY_AFTERNOON]: "Half-day afternoon",
};
