import { z } from "zod";
import {
  GENERAL_REQUEST_TYPES,
  GeneralRequestType,
  REQUEST_PRIORITIES,
  StatusRequestPriority,
} from "../constants/general-request";

const generalRequestTypeValues = Object.values(GENERAL_REQUEST_TYPES) as [
  GeneralRequestType,
  ...GeneralRequestType[],
];

const requestPriorityValues = Object.values(REQUEST_PRIORITIES) as [
  StatusRequestPriority,
  ...StatusRequestPriority[],
];

export const createGeneralRequestSchema = z
  .object({
    requestType: z.enum(generalRequestTypeValues, {
      message: "Request type is required.",
    }),

    title: z
      .string()
      .trim()
      .min(5, "Title must contain at least 5 characters.")
      .max(150, "Title must not exceed 150 characters."),

    description: z
      .string()
      .trim()
      .min(10, "Description must contain at least 10 characters.")
      .max(2000, "Description must not exceed 2,000 characters."),

    reason: z
      .string()
      .trim()
      .min(10, "Reason must contain at least 10 characters.")
      .max(2000, "Reason must not exceed 2,000 characters."),

    expectedBenefit: z
      .string()
      .trim()
      .max(2000, "Expected benefit must not exceed 2,000 characters.")
      .optional(),

    priority: z.enum(requestPriorityValues, {
      message: "Priority is required.",
    }),

    requiredDate: z.string().optional(),

    estimatedCost: z
      .number({
        message: "Estimated cost must be a number.",
      })
      .min(0, "Estimated cost cannot be negative.")
      .optional(),

    currency: z.enum(["USD", "KHR"]).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.estimatedCost !== undefined && !data.currency) {
      ctx.addIssue({
        code: "custom",
        path: ["currency"],
        message: "Currency is required when an estimated cost is entered.",
      });
    }

    if (data.currency && data.estimatedCost === undefined) {
      ctx.addIssue({
        code: "custom",
        path: ["estimatedCost"],
        message: "Estimated cost is required when a currency is selected.",
      });
    }
  });

export type CreateGeneralRequestFormValues = z.infer<
  typeof createGeneralRequestSchema
>;
