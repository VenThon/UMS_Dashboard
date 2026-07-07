import { z } from "zod";

import { DAILY_REPORT_STATUS } from "../constants/daily-report-status";

export const createDailyReportFormSchema = z.object({
  projectName: z.string().min(1, "Project name is required."),
  reportDate: z.date({
    message: "Report date is required.",
  }),
  previousTasks: z.string().min(1, "Previous tasks are required."),
  completedTasks: z.string().min(1, "Completed tasks are required."),
  inProgressTasks: z.string().min(1, "Tasks in progress are required."),
  blockers: z.string().optional(),
  tomorrowPlan: z.string().min(1, "Tomorrow's plan is required."),
  remarks: z.string().optional(),
});

export const createDailyReportSchema = z.object({
  projectName: z.string().min(1, "Project name is required."),
  reportDate: z.coerce.date({
    message: "Report date is required.",
  }),
  previousTasks: z.string().min(1, "Previous tasks are required."),
  completedTasks: z.string().min(1, "Completed tasks are required."),
  inProgressTasks: z.string().min(1, "Tasks in progress are required."),
  blockers: z.string().optional(),
  tomorrowPlan: z.string().min(1, "Tomorrow's plan is required."),
  remarks: z.string().optional(),
  status: z
    .enum([DAILY_REPORT_STATUS.DRAFT, DAILY_REPORT_STATUS.PENDING])
    .default(DAILY_REPORT_STATUS.PENDING),
});

export type CreateDailyReportFormValues = z.infer<
  typeof createDailyReportFormSchema
>;

export type CreateDailyReportValues = z.infer<typeof createDailyReportSchema>;
export type UpdateDailyReportValues = z.infer<typeof createDailyReportSchema>;
