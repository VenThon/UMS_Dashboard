import z from "zod";

// Request Status
export const REQUEST_STATUS = {
  PENDING_LEAD_FRONTEND: "pending_lead_frontend",
  PENDING_LEAD_BACKEND: "pending_lead_backend",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export type Requeststatus =
  (typeof REQUEST_STATUS)[keyof typeof REQUEST_STATUS];

export const RequeststatusSchema = z.enum([
  REQUEST_STATUS.PENDING_LEAD_FRONTEND,
  REQUEST_STATUS.PENDING_LEAD_BACKEND,
  REQUEST_STATUS.APPROVED,
  REQUEST_STATUS.REJECTED,
]);

export const Requeststatuslabel: Record<Requeststatus, string> = {
  [REQUEST_STATUS.PENDING_LEAD_FRONTEND]: "Pending Lead Frontend",
  [REQUEST_STATUS.PENDING_LEAD_BACKEND]: "Pending Lead Backend",
  [REQUEST_STATUS.APPROVED]: "Approved",
  [REQUEST_STATUS.REJECTED]: "Rejected",
};

// Review request status
export const REQUEST_REVIEW_STATUS = {
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export const RequestreviewstatusSchema = z.enum([
  REQUEST_REVIEW_STATUS.APPROVED,
  REQUEST_REVIEW_STATUS.REJECTED,
]);
export type RequestReviewStatus =
  (typeof REQUEST_REVIEW_STATUS)[keyof typeof REQUEST_REVIEW_STATUS];

export const Requestreviewlabel: Record<RequestReviewStatus, string> = {
  [REQUEST_REVIEW_STATUS.APPROVED]: "Approved",
  [REQUEST_REVIEW_STATUS.REJECTED]: "Rejected",
};

export const RequestReviewSchemaValidator = z.object({
  comment: z.string().optional(),
});

export type RequestReviewSchema = z.infer<typeof RequestReviewSchemaValidator>;
