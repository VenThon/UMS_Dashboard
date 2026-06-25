import { z } from "zod";
import { REVIEW_REPORT_STATUS } from "../constants/daily-report-status";

export const reviewDailyReportSchema = z
  .object({
    status: z.enum([
      REVIEW_REPORT_STATUS.APPROVED,
      REVIEW_REPORT_STATUS.REJECTED,
    ]),

    comment: z
      .string()
      .trim()
      .max(1000, "Comment must not exceed 1,000 characters.")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.status === REVIEW_REPORT_STATUS.REJECTED && !data.comment) {
      ctx.addIssue({
        code: "custom",
        path: ["comment"],
        message: "A comment is required when rejecting a report.",
      });
    }
  });

export type ReviewDailyReportFormValues = z.infer<
  typeof reviewDailyReportSchema
>;
