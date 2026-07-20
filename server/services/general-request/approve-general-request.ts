// src/server/services/general-request/approve-general-request.ts
import { GENERAL_REQUEST_APPROVAL_STATUS } from "@/db/constants/general-request";

import { reviewGeneralRequestService } from "./review-general-request";

type ApproveGeneralRequestParams = {
  generalRequestId: string;
  reviewerId: string;
  approvalLevel: 1 | 2;
  comment?: string;
};

export function approveGeneralRequestService({
  generalRequestId,
  reviewerId,
  approvalLevel,
  comment,
}: ApproveGeneralRequestParams) {
  return reviewGeneralRequestService({
    generalRequestId,
    reviewerId,
    approvalLevel,
    reviewStatus: GENERAL_REQUEST_APPROVAL_STATUS.APPROVED,
    comment,
  });
}
