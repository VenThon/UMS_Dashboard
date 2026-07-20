// src/db/constants/general-request.ts

export const GENERAL_REQUEST_TYPES = {
  EQUIPMENT: "equipment",
  SOFTWARE: "software",
  TRAINING: "training",
  BUDGET: "budget",
  SERVICE: "service",
  OTHER: "other",
} as const;

export type GeneralRequestType =
  (typeof GENERAL_REQUEST_TYPES)[keyof typeof GENERAL_REQUEST_TYPES];

export const GENERAL_REQUEST_TYPE_VALUES = Object.values(
  GENERAL_REQUEST_TYPES,
) as [GeneralRequestType, ...GeneralRequestType[]];

export const GENERAL_REQUEST_TYPE_LABEL: Record<GeneralRequestType, string> = {
  [GENERAL_REQUEST_TYPES.EQUIPMENT]: "Equipment",
  [GENERAL_REQUEST_TYPES.SOFTWARE]: "Software",
  [GENERAL_REQUEST_TYPES.TRAINING]: "Traning",
  [GENERAL_REQUEST_TYPES.BUDGET]: "Budget",
  [GENERAL_REQUEST_TYPES.SERVICE]: "Service",
  [GENERAL_REQUEST_TYPES.OTHER]: "Others",
};

export const REQUEST_PRIORITIES = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
} as const;

export type RequestPriority =
  (typeof REQUEST_PRIORITIES)[keyof typeof REQUEST_PRIORITIES];

export const REQUEST_PRIORITY_VALUES = Object.values(REQUEST_PRIORITIES) as [
  RequestPriority,
  ...RequestPriority[],
];
export const REQUEST_PRIORITY_LABEL: Record<RequestPriority, string> = {
  [REQUEST_PRIORITIES.LOW]: "Low",
  [REQUEST_PRIORITIES.MEDIUM]: "Medium",
  [REQUEST_PRIORITIES.HIGH]: "High",
  [REQUEST_PRIORITIES.URGENT]: "Urgent",
};
export const GENERAL_REQUEST_STATUS = {
  DRAFT: "draft",
  PENDING_FIRST_APPROVAL: "pending_first_approval",
  PENDING_SECOND_APPROVAL: "pending_second_approval",
  APPROVED: "approved",
  REJECTED: "rejected",
  CANCELLED: "cancelled",
} as const;

export type GeneralRequestStatus =
  (typeof GENERAL_REQUEST_STATUS)[keyof typeof GENERAL_REQUEST_STATUS];

export const GENERAL_REQUEST_STATUS_VALUES = Object.values(
  GENERAL_REQUEST_STATUS,
) as [GeneralRequestStatus, ...GeneralRequestStatus[]];

export const GENERAL_REQUEST_APPROVAL_STATUS = {
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export const GENERAL_REQUEST_STATUS_LABELS: Record<
  GeneralRequestStatus,
  string
> = {
  [GENERAL_REQUEST_STATUS.DRAFT]: "Draff",
  [GENERAL_REQUEST_STATUS.PENDING_FIRST_APPROVAL]: "Pending First Approval",
  [GENERAL_REQUEST_STATUS.PENDING_SECOND_APPROVAL]: "Pending Second Approval",
  [GENERAL_REQUEST_STATUS.APPROVED]: "Approved",
  [GENERAL_REQUEST_STATUS.REJECTED]: "Rejected",
  [GENERAL_REQUEST_STATUS.CANCELLED]: "Cancelled",
};

export type GeneralRequestApprovalStatus =
  (typeof GENERAL_REQUEST_APPROVAL_STATUS)[keyof typeof GENERAL_REQUEST_APPROVAL_STATUS];

export const GENERAL_REQUEST_APPROVAL_STATUS_VALUES = Object.values(
  GENERAL_REQUEST_APPROVAL_STATUS,
) as [GeneralRequestApprovalStatus, ...GeneralRequestApprovalStatus[]];
