// src/features/attendance/components/today-attendance-card.tsx

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CalendarDays, Clock3, LogIn, LogOut } from "lucide-react";

import {
  useCheckInAttendance,
  useCheckOutAttendance,
  useTodayAttendance,
} from "../../attendance/_hooks/use-attendance";

function formatTime(value: string | Date | null) {
  if (!value) {
    return "Not recorded";
  }

  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Phnom_Penh",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function TodayAttendanceCard() {
  const attendanceQuery = useTodayAttendance();
  const checkInMutation = useCheckInAttendance();
  const checkOutMutation = useCheckOutAttendance();

  const attendance = attendanceQuery.data;

  const canCheckIn = !attendance?.checkInAt;

  const canCheckOut = Boolean(attendance?.checkInAt) && !attendance?.checkOutAt;

  if (attendanceQuery.isLoading) {
    return <div>Loading today’s attendance...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="bg-muted rounded-lg p-2.5">
            <CalendarDays className="size-5" />
          </div>

          <div>
            <CardTitle>Today&apos;s Attendance</CardTitle>

            <CardDescription>
              Record your daily check-in and check-out.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border p-4">
            <p className="text-muted-foreground text-sm">Status</p>

            <p className="mt-1 font-medium">
              {attendance?.status ?? "Not checked in"}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-muted-foreground text-sm">Check-in</p>

            <p className="mt-1 font-medium">
              {formatTime(attendance?.checkInAt ?? null)}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-muted-foreground text-sm">Check-out</p>

            <p className="mt-1 font-medium">
              {formatTime(attendance?.checkOutAt ?? null)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => checkInMutation.mutate()}
            disabled={!canCheckIn || checkInMutation.isPending}
          >
            <LogIn className="size-4" />

            {checkInMutation.isPending ? "Checking in..." : "Check In"}
          </Button>

          <Button
            variant="outline"
            onClick={() => checkOutMutation.mutate()}
            disabled={!canCheckOut || checkOutMutation.isPending}
          >
            <LogOut className="size-4" />

            {checkOutMutation.isPending ? "Checking out..." : "Check Out"}
          </Button>
        </div>

        {attendance?.lateMinutes ? (
          <div className="bg-muted flex items-center gap-2 rounded-lg p-3 text-sm">
            <Clock3 className="size-4" />
            You checked in {attendance.lateMinutes} minutes late.
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
