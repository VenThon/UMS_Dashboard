"use client";

import type {
  CreateGeneralRequestInput,
  RejectGeneralRequestValue,
  ResubmitGeneralRequestValue,
  ReviewGeneralRequestValue,
  UpdateGeneralRequestValue,
} from "@/db/validation/general-request";
import {
  GetGeneralRequestsParams,
  approveGeneralRequest,
  cancelGeneralRequest,
  createGeneralRequest,
  deleteGeneralRequest,
  getGeneralRequestById,
  getGeneralRequestReviews,
  getGeneralRequestSummaryApi,
  getGeneralRequests,
  rejectGeneralRequest,
  resubmitGeneralRequest,
  updateGeneralRequest,
} from "@/service/general-request/general-request.service";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { generalRequestKeys } from "./general-request-keys";

export function useGeneralRequests(params: GetGeneralRequestsParams) {
  return useQuery({
    queryKey: generalRequestKeys.list(params),
    queryFn: () => getGeneralRequests(params),
  });
}

export function useGeneralRequestById(id: string) {
  return useQuery({
    queryKey: generalRequestKeys.detail(id),
    queryFn: () => getGeneralRequestById(id),
    enabled: Boolean(id),
  });
}

export function useGeneralRequestReviews(id: string) {
  return useQuery({
    queryKey: generalRequestKeys.reviews(id),
    queryFn: () => getGeneralRequestReviews(id),
    enabled: Boolean(id),
  });
}

export function useCreateGeneralRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: CreateGeneralRequestInput) =>
      createGeneralRequest(values),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: generalRequestKeys.lists(),
      });
    },
  });
}

export function useUpdateGeneralRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: UpdateGeneralRequestValue;
    }) => updateGeneralRequest(id, values),

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: generalRequestKeys.lists(),
        }),
        queryClient.invalidateQueries({
          queryKey: generalRequestKeys.detail(variables.id),
        }),
      ]);
    },
  });
}

export function useDeleteGeneralRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteGeneralRequest(id),

    onSuccess: async (_, id) => {
      queryClient.removeQueries({
        queryKey: generalRequestKeys.detail(id),
      });

      await queryClient.invalidateQueries({
        queryKey: generalRequestKeys.lists(),
      });
    },
  });
}

export function useCancelGeneralRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cancelGeneralRequest(id),

    onSuccess: async (_, id) => {
      await invalidateGeneralRequest(queryClient, id);
    },
  });
}

export function useApproveGeneralRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: ReviewGeneralRequestValue;
    }) => approveGeneralRequest(id, values),

    onSuccess: async (_, variables) => {
      await invalidateGeneralRequest(queryClient, variables.id);
    },
  });
}

export function useRejectGeneralRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: RejectGeneralRequestValue;
    }) => rejectGeneralRequest(id, values),

    onSuccess: async (_, variables) => {
      await invalidateGeneralRequest(queryClient, variables.id);
    },
  });
}

export function useResubmitGeneralRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: ResubmitGeneralRequestValue;
    }) => resubmitGeneralRequest(id, values),

    onSuccess: async (_, variables) => {
      await invalidateGeneralRequest(queryClient, variables.id);
    },
  });
}

export function useGeneralRequestSummary() {
  return useQuery({
    queryKey: generalRequestKeys.summary(),
    queryFn: getGeneralRequestSummaryApi,
    staleTime: 30_000,
  });
}

async function invalidateGeneralRequest(
  queryClient: ReturnType<typeof useQueryClient>,
  id: string,
) {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: generalRequestKeys.lists(),
    }),
    queryClient.invalidateQueries({
      queryKey: generalRequestKeys.detail(id),
    }),
    queryClient.invalidateQueries({
      queryKey: generalRequestKeys.reviews(id),
    }),
  ]);
}
