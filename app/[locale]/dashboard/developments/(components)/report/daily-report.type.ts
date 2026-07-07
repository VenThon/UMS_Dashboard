import { ReviewReportTypes } from "@/db/constants/daily-report-status";

export type DailyReportItem = {
  reviews: boolean;
  id: string;
  userId: string;
  projectName: string;
  reportDate: string;
  previousTasks: string;
  completedTasks: string;
  inProgressTasks: string;
  blockers: string | null;
  tomorrowPlan: string;
  remarks: string | null;
  status: "draft" | "pending" | "approved" | "rejected";
  reviewedById: string | null;
  reviewComment: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type DailyReportReviewItem = {
  id: string;
  status: ReviewReportTypes;
  comment?: string | null;
  reviewedAt: string | Date;
  reviewer?: {
    id: string;
    username?: string | null;
    email?: string | null;
  };
};
