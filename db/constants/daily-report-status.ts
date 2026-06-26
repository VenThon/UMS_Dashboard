import z from "zod";

export const DAILY_REPORT_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export type DailyReportTypes =
  (typeof DAILY_REPORT_STATUS)[keyof typeof DAILY_REPORT_STATUS];

export const DevelopmentReportTypesSchema = z.enum([
  DAILY_REPORT_STATUS.PENDING,
  DAILY_REPORT_STATUS.APPROVED,
  DAILY_REPORT_STATUS.REJECTED,
]);

export const DAILY_REPORT_STATUS_LABELS: Record<DailyReportTypes, string> = {
  [DAILY_REPORT_STATUS.PENDING]: "Pending",
  [DAILY_REPORT_STATUS.APPROVED]: "Approved",
  [DAILY_REPORT_STATUS.REJECTED]: "Rejected",
};

export const REVIEW_REPORT_STATUS = {
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;
export type ReviewReportTypes =
  (typeof REVIEW_REPORT_STATUS)[keyof typeof REVIEW_REPORT_STATUS];

export const ReviewDailyReportStatusSchema = z.enum([
  REVIEW_REPORT_STATUS.APPROVED,
  REVIEW_REPORT_STATUS.REJECTED,
]);

export const REVIEW_REPORT_STATUS_LABELS: Record<ReviewReportTypes, string> = {
  [REVIEW_REPORT_STATUS.APPROVED]: "Approved",
  [REVIEW_REPORT_STATUS.REJECTED]: "Rejected",
};
