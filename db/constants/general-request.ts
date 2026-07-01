import { z } from "zod";

export const GENERAL_REQUEST_TYPES = {
  TRAINING: "training",
  LANGUAGE_COURSE: "language_course",
  EQUIPMENT: "equipment",
  SOFTWARE: "software",
  WORKPLACE_SUPPORT: "workplace_support",
  FINANCIAL_SUPPORT: "financial_support",
  DOCUMENT: "document",
  OTHER: "other",
} as const;

export type GeneralRequestType =
  (typeof GENERAL_REQUEST_TYPES)[keyof typeof GENERAL_REQUEST_TYPES];

export const GENERAL_REQUEST_TYPE_LABELS: Record<GeneralRequestType, string> = {
  training: "Training or short course",
  language_course: "Language course",
  equipment: "Equipment request",
  software: "Software or system access",
  workplace_support: "Workplace support",
  financial_support: "Financial support",
  document: "Document request",
  other: "Other request",
};

export const REQUEST_PRIORITIES = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
} as const;

export type StatusRequestPriority =
  (typeof REQUEST_PRIORITIES)[keyof typeof REQUEST_PRIORITIES];

export const REQUEST_PRIORITY_LABELS: Record<StatusRequestPriority, string> = {
  [REQUEST_PRIORITIES.LOW]: "Low",
  [REQUEST_PRIORITIES.MEDIUM]: "Medium",
  [REQUEST_PRIORITIES.HIGH]: "High",
  [REQUEST_PRIORITIES.URGENT]: "Urgent",
};

export const requestPrioritySchema = z.enum([
  REQUEST_PRIORITIES.LOW,
  REQUEST_PRIORITIES.MEDIUM,
  REQUEST_PRIORITIES.HIGH,
  REQUEST_PRIORITIES.URGENT,
]);

export const GENERAL_REQUEST_STATUSES = {
  DRAFT: "draft",
  PENDING: "pending",
  UNDER_REVIEW: "under_review",
  APPROVED: "approved",
  REJECTED: "rejected",
  PROCESSING: "processing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export type GeneralRequestStatus =
  (typeof GENERAL_REQUEST_STATUSES)[keyof typeof GENERAL_REQUEST_STATUSES];

export const GENERAL_REQUEST_STATUS_LABELS: Record<
  GeneralRequestStatus,
  string
> = {
  draft: "Draft",
  pending: "Pending",
  under_review: "Under review",
  approved: "Approved",
  rejected: "Rejected",
  processing: "Processing",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const generalRequestStatusSchema = z.enum([
  GENERAL_REQUEST_STATUSES.DRAFT,
  GENERAL_REQUEST_STATUSES.PENDING,
  GENERAL_REQUEST_STATUSES.UNDER_REVIEW,
  GENERAL_REQUEST_STATUSES.APPROVED,
  GENERAL_REQUEST_STATUSES.REJECTED,
  GENERAL_REQUEST_STATUSES.PROCESSING,
  GENERAL_REQUEST_STATUSES.COMPLETED,
  GENERAL_REQUEST_STATUSES.CANCELLED,
]);
