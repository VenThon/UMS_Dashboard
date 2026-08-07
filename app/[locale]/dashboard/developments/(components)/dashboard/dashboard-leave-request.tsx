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
  CalendarDays,
  CircleX,
  Clock3,
  type LucideIcon,
} from "lucide-react";

import { useRequestLeaveSummary } from "../../leave-request/_hooks/use-request-leave";
import { RequestLeaveSummarySkeleton } from "../request-leave/request-leave-summary-skeleton";

type DashboardCard = {
  title: string;
  value: number;
  subtitle: string;
  icon: LucideIcon;
  iconClassName: string;
};

export function SectionCardsRequestLeave() {
  const summaryQuery = useRequestLeaveSummary();

  if (summaryQuery.isLoading) {
    return <RequestLeaveSummarySkeleton />;
  }

  if (summaryQuery.isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {summaryQuery.error instanceof Error
            ? summaryQuery.error.message
            : "Failed to load the leave request summary."}
        </AlertDescription>
      </Alert>
    );
  }

  const summary = summaryQuery.data;

  if (!summary) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Leave request summary data is unavailable.
        </AlertDescription>
      </Alert>
    );
  }

  const dashboardCards: DashboardCard[] = [
    {
      title: "Total Leave Requests",
      value: summary.totalLeaveRequests,
      subtitle: "All submitted leave requests",
      icon: CalendarDays,
      iconClassName:
        "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400",
    },
    {
      title: "Pending Requests",
      value: summary.totalPendingRequests,
      subtitle: "Waiting for approval",
      icon: Clock3,
      iconClassName:
        "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    },
    {
      title: "Approved Requests",
      value: summary.totalApprovedRequests,
      subtitle: "Successfully approved",
      icon: BadgeCheck,
      iconClassName:
        "bg-green-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    },
    {
      title: "Rejected Requests",
      value: summary.totalRejectedRequests,
      subtitle: "Requests that were rejected",
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
