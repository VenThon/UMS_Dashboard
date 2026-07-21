import { z } from "zod";

import { requestLeaveStatusSchema } from "../constants/request-leave-status";

export const requestLeaveQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  pageSize: z.coerce.number().int().min(1).max(100).default(10),

  status: requestLeaveStatusSchema.optional(),
});

export type RequestLeaveQuery = z.infer<typeof requestLeaveQuerySchema>;
