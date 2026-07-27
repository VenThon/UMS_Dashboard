"use client";

import { useState } from "react";

import type { AttendanceStatus } from "@/db/constants/attendance";

import { useAttendances } from "../../attendance/_hooks/use-attendance";
import { AttendancePagination } from "./attendance-pagination";
import { AttendanceStatusFilter } from "./attendance-status-filter";

export function AttendanceList() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<AttendanceStatus>();

  const attendanceQuery = useAttendances({
    page,
    pageSize: 10,
    status,
  });

  const result = attendanceQuery.data;

  function handleStatusChange(newStatus: AttendanceStatus | undefined) {
    setStatus(newStatus);
    setPage(1);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Attendance Records</h2>

          <p className="text-muted-foreground text-sm">
            Review employee attendance and daily working times.
          </p>
        </div>

        <AttendanceStatusFilter
          value={status}
          onValueChange={handleStatusChange}
        />
      </div>

      {attendanceQuery.isLoading ? (
        <div>Loading attendance records...</div>
      ) : null}

      {result?.data.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          No attendance records found.
        </div>
      ) : null}

      <div className="overflow-hidden rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Check-in</th>
              <th className="px-4 py-3 text-left">Check-out</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {result?.data.map((attendance) => (
              <tr key={attendance.id} className="border-t">
                <td className="px-4 py-3">
                  <p className="font-medium">{attendance.userName}</p>

                  <p className="text-muted-foreground text-xs">
                    {attendance.userEmail}
                  </p>
                </td>

                <td className="px-4 py-3">{attendance.attendanceDate}</td>

                <td className="px-4 py-3">
                  {attendance.checkInAt
                    ? new Date(attendance.checkInAt).toLocaleTimeString()
                    : "—"}
                </td>

                <td className="px-4 py-3">
                  {attendance.checkOutAt
                    ? new Date(attendance.checkOutAt).toLocaleTimeString()
                    : "—"}
                </td>

                <td className="px-4 py-3">{attendance.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {result ? (
        <AttendancePagination
          page={result.pagination.page}
          totalPages={result.pagination.totalPages}
          hasNextPage={result.pagination.hasNextPage}
          hasPreviousPage={result.pagination.hasPreviousPage}
          onPageChange={setPage}
        />
      ) : null}
    </div>
  );
}
