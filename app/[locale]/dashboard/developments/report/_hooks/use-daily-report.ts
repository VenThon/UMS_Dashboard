import { useRouter } from "next/navigation";

import { dailyReportKeys } from "@/app/[locale]/dashboard/developments/report/_hooks/daily-report-query-key";
import {
  CreateDailyReportPayload,
  UpdateDailyReportPayload,
  approveDailyReportService,
  createDailyReportService,
  deleteDailyReportService,
  getDailyReportByIdService,
  getDailyReportSummaryApi,
  getDailyReportsService,
  rejectDailyReportService,
  reviewDailyReportService,
  submitDailyReportService,
  updateDailyReportService,
} from "@/service/daily-report/daily-report.service";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetDailyReports() {
  return useQuery({
    queryKey: dailyReportKeys.lists(),
    queryFn: getDailyReportsService,
  });
}

export function useGetDailyReportById(id: string) {
  return useQuery({
    queryKey: dailyReportKeys.detail(id),
    queryFn: () => getDailyReportByIdService(id),
    enabled: Boolean(id),
  });
}

export function useCreateDailyReport() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (values: CreateDailyReportPayload) =>
      createDailyReportService(values),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: dailyReportKeys.lists(),
      });

      toast.success("Daily report created successfully.");
      router.push("/dashboard/developments/report");
    },

    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
            : "Something went wrong.";

      toast.error(message);
    },
  });
}
export function useUpdateDailyReport() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: UpdateDailyReportPayload;
    }) => updateDailyReportService(id, values),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: dailyReportKeys.lists(),
      });

      toast.success("Daily report updated successfully.");
      router.push("/dashboard/developments/report");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteDailyReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDailyReportService(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: dailyReportKeys.lists(),
      });

      toast.success("Daily report deleted successfully.");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useReviewDailyReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewDailyReportService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: dailyReportKeys.lists(),
      });

      toast.success("Daily report reviewed successfully.");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useSubmitDailyReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => submitDailyReportService(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: dailyReportKeys.lists(),
      });

      toast.success("Daily report submitted successfully.");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useApproveDailyReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => approveDailyReportService(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: dailyReportKeys.lists(),
      });

      toast.success("Daily report approved successfully.");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useRejectDailyReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectDailyReportService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: dailyReportKeys.lists(),
      });

      toast.success("Daily report rejected successfully.");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useDailyReportSummary() {
  return useQuery({
    queryKey: dailyReportKeys.summary(),
    queryFn: getDailyReportSummaryApi,
    staleTime: 30_000,
  });
}
