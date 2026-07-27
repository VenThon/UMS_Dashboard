"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  BadgeCheck,
  CircleX,
  ClipboardClock,
  Clock3,
  type LucideIcon,
} from "lucide-react";

import { useDailyReportSummary } from "../../report/_hooks/use-daily-report";
import { DailyReportSummarySkeleton } from "../report/daily-report-summary-skeleton";

type DashboardCard = {
  title: string;
  value: number;
  subtitle: string;
  icon: LucideIcon;
  iconClassName: string;
};

export function SectionCardsDailyReport() {
  const summaryQuery = useDailyReportSummary();

  if (summaryQuery.isLoading) {
    return <DailyReportSummarySkeleton />;
  }

  if (summaryQuery.isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {summaryQuery.error instanceof Error
            ? summaryQuery.error.message
            : "Failed to load the daily report summary."}
        </AlertDescription>
      </Alert>
    );
  }

  const summary = summaryQuery.data;

  if (!summary) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Daily report summary data is unavailable.
        </AlertDescription>
      </Alert>
    );
  }

  const dashboardCards: DashboardCard[] = [
    {
      title: "Total Daily Reports",
      value: summary.totalDailyReports,
      subtitle: "All submitted daily reports",
      icon: ClipboardClock,
      iconClassName:
        "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400",
    },
    {
      title: "Pending Reports",
      value: summary.totalPendingReports,
      subtitle: "Waiting for review",
      icon: Clock3,
      iconClassName:
        "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    },
    {
      title: "Approved Reports",
      value: summary.totalApprovedReports,
      subtitle: "Successfully approved",
      icon: BadgeCheck,
      iconClassName:
        "bg-green-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    },
    {
      title: "Rejected Reports",
      value: summary.totalRejectedReports,
      subtitle: "Reports that were rejected",
      icon: CircleX,
      iconClassName:
        "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {dashboardCards.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className="border-border/70 bg-card relative overflow-hidden shadow-sm transition-shadow hover:shadow-md"
          >
            <CardHeader className="gap-4">
              <div className="space-y-1">
                <CardDescription className="text-sm font-medium">
                  {item.title}
                </CardDescription>

                <CardTitle className="text-3xl font-semibold tracking-tight tabular-nums">
                  {item.value.toLocaleString()}
                </CardTitle>

                <p className="text-muted-foreground text-xs">{item.subtitle}</p>
              </div>

              <CardAction>
                <Badge
                  variant="secondary"
                  className={`flex size-10 items-center justify-center rounded-lg border-0 p-0 ${item.iconClassName}`}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
