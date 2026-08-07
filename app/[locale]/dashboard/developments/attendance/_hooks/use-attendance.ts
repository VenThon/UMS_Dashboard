// src/features/attendance/hooks/use-attendance.ts
import type {
  AttendanceListQuery,
  UpdateAttendanceValues,
} from "@/db/validation/attendance";
import {
  checkInAttendanceApi,
  checkOutAttendanceApi,
  getAttendanceDetailApi,
  getAttendancesApi,
  getTodayAttendanceApi,
  updateAttendanceApi,
} from "@/service/attendance/attendance-api";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { attendanceKeys } from "./attendance-query-keys";

export function useTodayAttendance() {
  return useQuery({
    queryKey: attendanceKeys.today(),
    queryFn: getTodayAttendanceApi,
  });
}

export function useAttendances(query: AttendanceListQuery) {
  return useQuery({
    queryKey: attendanceKeys.list(query),
    queryFn: () => getAttendancesApi(query),
    placeholderData: (previousData) => previousData,
  });
}

export function useAttendanceDetail(id: string) {
  return useQuery({
    queryKey: attendanceKeys.detail(id),
    queryFn: () => getAttendanceDetailApi(id),
    enabled: Boolean(id),
  });
}

export function useCheckInAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkInAttendanceApi,
    onSuccess: async () => {
      toast.success("Checked in successfully.");

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: attendanceKeys.today(),
        }),
        queryClient.invalidateQueries({
          queryKey: attendanceKeys.lists(),
        }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useCheckOutAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkOutAttendanceApi,
    onSuccess: async () => {
      toast.success("Checked out successfully.");

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: attendanceKeys.today(),
        }),
        queryClient.invalidateQueries({
          queryKey: attendanceKeys.lists(),
        }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateAttendance(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: UpdateAttendanceValues) =>
      updateAttendanceApi(id, values),

    onSuccess: async () => {
      toast.success("Attendance updated successfully.");

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: attendanceKeys.detail(id),
        }),
        queryClient.invalidateQueries({
          queryKey: attendanceKeys.lists(),
        }),
      ]);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}
