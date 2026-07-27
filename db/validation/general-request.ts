import {
  GENERAL_REQUEST_STATUS,
  GENERAL_REQUEST_STATUS_VALUES,
  GENERAL_REQUEST_TYPE_VALUES,
  REQUEST_PRIORITY_VALUES,
} from "@/db/constants/general-request";

import { z } from "zod";

const attachmentSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  key: z.string().optional(),
  size: z.number().int().nonnegative().optional(),
  mimeType: z.string().optional(),
});

export const generalRequestBaseSchema = z.object({
  requestType: z.enum(GENERAL_REQUEST_TYPE_VALUES),

  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(200, "Title must not exceed 200 characters."),

  description: z.string().trim().min(1, "Description is required."),

  reason: z.string().trim().min(1, "Reason is required."),

  expectedBenefit: z.string().trim().min(1, "Expected benefit is required."),

  priority: z.enum(REQUEST_PRIORITY_VALUES),

  requiredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid required date.")
    .optional()
    .or(z.literal("")),

  estimatedCost: z
    .number()
    .nonnegative("Estimated cost cannot be negative.")
    .optional(),

  currency: z
    .string()
    .trim()
    .length(3, "Currency must contain three characters.")
    .transform((value) => value.toUpperCase())
    .optional(),

  attachments: z.array(attachmentSchema).default([]),
});

export const createGeneralRequestSchema = generalRequestBaseSchema.extend({
  status: z
    .enum([
      GENERAL_REQUEST_STATUS.DRAFT,
      GENERAL_REQUEST_STATUS.PENDING_FIRST_APPROVAL,
    ])
    .default(GENERAL_REQUEST_STATUS.PENDING_FIRST_APPROVAL),
});

export const updateGeneralRequestSchema = generalRequestBaseSchema.partial();

export const reviewGeneralRequestSchema = z.object({
  comment: z
    .string()
    .trim()
    .max(2000, "Comment must not exceed 2,000 characters.")
    .optional(),
});

export const rejectGeneralRequestSchema = z.object({
  comment: z.string().trim().min(1, "Rejection comment is required.").max(2000),
});

export const resubmitGeneralRequestSchema = generalRequestBaseSchema;

export const generalRequestQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  pageSize: z.coerce.number().int().min(1).max(100).default(10),

  status: z.enum(GENERAL_REQUEST_STATUS_VALUES).optional(),

  priority: z.enum(REQUEST_PRIORITY_VALUES).optional(),

  requestType: z.enum(GENERAL_REQUEST_TYPE_VALUES).optional(),

  search: z.string().trim().optional(),
});

export type CreateGeneralRequestInput = z.input<
  typeof createGeneralRequestSchema
>;

export type CreateGeneralRequestValue = z.output<
  typeof createGeneralRequestSchema
>;

export type UpdateGeneralRequestValue = z.output<
  typeof updateGeneralRequestSchema
>;

export type ReviewGeneralRequestValue = z.output<
  typeof reviewGeneralRequestSchema
>;

export type RejectGeneralRequestValue = z.output<
  typeof rejectGeneralRequestSchema
>;

export type ResubmitGeneralRequestValue = z.output<
  typeof resubmitGeneralRequestSchema
>;

export type GeneralRequestQueryValue = z.output<
  typeof generalRequestQuerySchema
>;

export const generalRequestFormSchema = generalRequestBaseSchema
  .omit({
    attachments: true,
  })
  .extend({
    attachments: z
      .array(z.instanceof(File))
      .max(5, "You can upload up to five files.")
      .optional(),
  });

export type GeneralRequestFormValues = z.input<typeof generalRequestFormSchema>;

export type ResubmitGeneralRequestInput = z.input<
  typeof resubmitGeneralRequestSchema
>;
