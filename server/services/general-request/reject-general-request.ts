import { GENERAL_REQUEST_APPROVAL_STATUS } from "@/db/constants/general-request";

import { reviewGeneralRequestService } from "./review-general-request";

type RejectGeneralRequestParams = {
  generalRequestId: string;
  reviewerId: string;
  approvalLevel: 1 | 2;
  comment: string;
};

export function rejectGeneralRequestService({
  generalRequestId,
  reviewerId,
  approvalLevel,
  comment,
}: RejectGeneralRequestParams) {
  return reviewGeneralRequestService({
    generalRequestId,
    reviewerId,
    approvalLevel,
    reviewStatus: GENERAL_REQUEST_APPROVAL_STATUS.REJECTED,
    comment,
  });
}
