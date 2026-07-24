// src/features/attendance/types.ts
import type {
  AttendanceAction,
  AttendanceStatus,
} from "@/db/constants/attendance";

export type Attendance = {
  id: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  attendanceDate: string;
  checkInAt: string | Date | null;
  checkOutAt: string | Date | null;
  status: AttendanceStatus;
  lateMinutes: number;
  workedMinutes: number | null;
  note: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type AttendanceHistory = {
  id: string;
  action: AttendanceAction;
  description: string | null;
  previousData: unknown;
  newData: unknown;
  performedById: string;
  performedByName: string;
  createdAt: string | Date;
};

export type AttendanceDetail = Attendance & {
  history: AttendanceHistory[];
};

export type PaginatedAttendanceResponse = {
  data: Attendance[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};
