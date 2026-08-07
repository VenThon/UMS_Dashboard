import type {
  GeneralRequestApprovalStatus,
  GeneralRequestStatus,
  GeneralRequestType,
  RequestPriority,
} from "@/db/constants/general-request";

export type GeneralRequestAttachment = {
  name: string;
  url: string;
  key?: string;
  size?: number;
  mimeType?: string;
};

export type GeneralRequestItem = {
  id: string;
  userId: string;
  requestType: GeneralRequestType;
  title: string;
  description: string;
  reason: string;
  expectedBenefit: string;
  priority: RequestPriority;
  requiredDate: string | null;
  estimatedCost: string | null;
  currency: string | null;
  attachments: GeneralRequestAttachment[];
  status: GeneralRequestStatus;
  revision: number;
  reviewedById: string | null;
  reviewerComment: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GeneralRequestReview = {
  id: string;
  generalRequestId: string;
  reviewerId: string;
  reviewerName: string | null;
  approvalLevel: number;
  revision: number;
  status: GeneralRequestApprovalStatus;
  comment: string | null;
  reviewedAt: string;
};

export type GeneralRequestPagination = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type GeneralRequestListResponse = {
  success: boolean;
  data: GeneralRequestItem[];
  pagination: GeneralRequestPagination;
};

export type GeneralRequestDetailResponse = {
  success: boolean;
  data: GeneralRequestItem;
};

export type GeneralRequestReviewsResponse = {
  success: boolean;
  data: GeneralRequestReview[];
};

export type GeneralRequestMutationResponse = {
  success: boolean;
  message: string;
  data: GeneralRequestItem;
};

export type GeneralRequestReviewMutationResponse = {
  success: boolean;
  message: string;
  data: {
    request: GeneralRequestItem;
    review: GeneralRequestReview;
  };
};

export type GeneralRequestSummary = {
  totalGeneralRequests: number;
  totalPendingRequests: number;
  totalApprovedRequests: number;
  totalRejectedRequests: number;
};
