import z from "zod";

export const dialyReportSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
});

export type DailyReportInput = z.infer<typeof dialyReportSchema>;

export const createDailyReportSchema = z.object({
  projectName: z
    .string()
    .trim()
    .min(1, "Project name is required.")
    .max(150, "Project name must not exceed 150 characters."),

  reportDate: z.date({
    message: "Report date is required.",
  }),

  previousTasks: z
    .string()
    .trim()
    .min(1, "Previous tasks are required.")
    .max(2000, "Previous tasks must not exceed 2,000 characters."),

  completedTasks: z
    .string()
    .trim()
    .min(1, "Completed tasks are required.")
    .max(2000, "Completed tasks must not exceed 2,000 characters."),

  inProgressTasks: z
    .string()
    .trim()
    .min(1, "In-progress tasks are required.")
    .max(2000, "In-progress tasks must not exceed 2,000 characters."),

  blockers: z
    .string()
    .trim()
    .max(2000, "Blockers must not exceed 2,000 characters.")
    .optional(),

  tomorrowPlan: z
    .string()
    .trim()
    .min(1, "Tomorrow's plan is required.")
    .max(2000, "Tomorrow's plan must not exceed 2,000 characters."),

  remarks: z
    .string()
    .trim()
    .max(2000, "Remarks must not exceed 2,000 characters.")
    .optional(),
});

export type CreateDailyReportFormValues = z.infer<
  typeof createDailyReportSchema
>;
