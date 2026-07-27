"use client";

import type { RequestLeaveStatus } from "@/db/constants/request-leave-status";
import type {
  CreateRequestLeaveInput,
  UpdateRequestLeaveValue,
} from "@/db/validation/leave-request";
import {
  approveRequestLeave,
  cancelRequestLeave,
  createRequestLeave,
  deleteRequestLeave,
  getRequestLeaveById,
  getRequestLeaveReviewHistory,
  getRequestLeaveSummaryApi,
  getRequestLeaves,
  rejectRequestLeave,
  resubmitRequestLeave,
  updateRequestLeave,
} from "@/service/leave-request/leave-request.service";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { requestLeaveKeys } from "./request-leave-keys";

export function useRequestLeaves(params: {
  page: number;
  pageSize: number;
  status?: RequestLeaveStatus;
}) {
  return useQuery({
    queryKey: requestLeaveKeys.list(params),
    queryFn: () => getRequestLeaves(params),
  });
}

export function useRequestLeaveById(id: string) {
  return useQuery({
    queryKey: requestLeaveKeys.detail(id),
    queryFn: () => getRequestLeaveById(id),
    enabled: Boolean(id),
  });
}

export function useRequestLeaveReviews(id: string) {
  return useQuery({
    queryKey: requestLeaveKeys.reviews(id),
    queryFn: () => getRequestLeaveReviewHistory(id),
    enabled: Boolean(id),
  });
}

export function useCreateRequestLeave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: CreateRequestLeaveInput) => createRequestLeave(values),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: requestLeaveKeys.lists(),
      });

      toast.success(response.message);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateRequestLeave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: UpdateRequestLeaveValue;
    }) => updateRequestLeave(id, values),

    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: requestLeaveKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: requestLeaveKeys.detail(variables.id),
      });

      toast.success(response.message);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteRequestLeave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRequestLeave,

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: requestLeaveKeys.lists(),
      });

      toast.success(response.message);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useCancelRequestLeave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelRequestLeave,

    onSuccess: (response, id) => {
      queryClient.invalidateQueries({
        queryKey: requestLeaveKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: requestLeaveKeys.detail(id),
      });

      toast.success(response.message);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useApproveRequestLeave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, comment }: { id: string; comment?: string }) =>
      approveRequestLeave(id, comment),

    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: requestLeaveKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: requestLeaveKeys.detail(variables.id),
      });

      queryClient.invalidateQueries({
        queryKey: requestLeaveKeys.reviews(variables.id),
      });

      toast.success(response.message);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useRejectRequestLeave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, comment }: { id: string; comment: string }) =>
      rejectRequestLeave(id, comment),

    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: requestLeaveKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: requestLeaveKeys.detail(variables.id),
      });

      queryClient.invalidateQueries({
        queryKey: requestLeaveKeys.reviews(variables.id),
      });

      toast.success(response.message);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useResubmitRequestLeave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: UpdateRequestLeaveValue;
    }) => resubmitRequestLeave(id, values),

    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: requestLeaveKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: requestLeaveKeys.detail(variables.id),
      });

      queryClient.invalidateQueries({
        queryKey: requestLeaveKeys.reviews(variables.id),
      });

      toast.success(response.message);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useRequestLeaveSummary() {
  return useQuery({
    queryKey: requestLeaveKeys.summary(),
    queryFn: getRequestLeaveSummaryApi,
    staleTime: 30_000,
  });
}
