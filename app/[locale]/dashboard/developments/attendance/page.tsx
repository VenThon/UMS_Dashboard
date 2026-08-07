import { redirect } from "next/navigation";

import { getUserFromRequest } from "@/lib/auth/verify";

import { ClipboardCheck } from "lucide-react";

import { AttendanceList } from "../(components)/attendance/attendance-list";
import { TodayAttendanceCard } from "../(components)/attendance/today-attendance-card";

export default async function AttendancePage() {
  const currentUser = await getUserFromRequest();

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <main className="container w-full space-y-6 px-4 py-6">
      <header className="flex items-start gap-3">
        <div className="bg-muted rounded-lg p-2.5">
          <ClipboardCheck className="size-5" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Attendance Management
          </h1>

          <p className="text-muted-foreground mt-1 text-sm">
            Check in, check out, and review your daily attendance history.
          </p>
        </div>
      </header>

      <TodayAttendanceCard />

      <AttendanceList />
    </main>
  );
}
