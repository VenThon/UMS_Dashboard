"use client";

import { ReportTypesStatusBadge } from "@/components/badge/status-report";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { format } from "date-fns";
import {
  CalendarClock,
  Clock,
  Eye,
  History,
  MessageSquareText,
  UserRoundCheck,
} from "lucide-react";

import { DailyReportItem } from "./daily-report.type";

type ViewDailyReportDetailDialogProps = {
  item: DailyReportItem;
};

export function ViewDailyReportDetailDialog({
  item,
}: ViewDailyReportDetailDialogProps) {
  const reviews = Array.isArray(item.reviews) ? item.reviews : [];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant="outline"
          aria-label="View report details"
          className="text-muted-foreground hover:bg-muted hover:text-foreground size-8"
        >
          <Eye className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0 sm:max-w-3xl">
        <DialogHeader className="border-b px-6 py-5">
          <div className="flex flex-col gap-4 pr-10 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-lg font-semibold">
                Daily Report Detail
              </DialogTitle>

              <DialogDescription>
                View the submitted daily report information.
              </DialogDescription>
            </div>

            <div className="flex shrink-0 justify-start sm:justify-end">
              <ReportTypesStatusBadge status={item.status} />
            </div>
          </div>
        </DialogHeader>

        <div className="max-h-[70vh] space-y-5 overflow-y-auto px-6 py-5">
          <section className="bg-muted/30 rounded-xl border p-4">
            <SectionTitle title="General Information" />

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem label="Project name" value={item.projectName} />
              <DetailItem
                label="Report date"
                value={formatDate(item.reportDate)}
              />
            </div>
          </section>

          <section className="bg-muted/30 rounded-xl border p-4">
            <SectionTitle title="Task Information" />

            <div className="grid gap-4">
              <DetailItem label="Previous tasks" value={item.previousTasks} />
              <DetailItem label="Completed tasks" value={item.completedTasks} />
              <DetailItem
                label="Tasks in progress"
                value={item.inProgressTasks}
              />
              <DetailItem label="Blockers" value={item.blockers || "-"} />
            </div>
          </section>

          <section className="bg-muted/30 rounded-xl border p-4">
            <SectionTitle title="Next Plan and Remarks" />

            <div className="grid gap-4">
              <DetailItem label="Tomorrow's plan" value={item.tomorrowPlan} />
              <DetailItem label="Remarks" value={item.remarks || "-"} />
            </div>
          </section>

          <section className="bg-background rounded-xl border p-4">
            <SectionTitle title="System Information" />

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem
                label="Created at"
                value={formatDateTime(item.createdAt)}
                icon={<CalendarClock className="size-4" />}
              />

              <DetailItem
                label="Updated at"
                value={formatDateTime(item.updatedAt)}
                icon={<Clock className="size-4" />}
              />
            </div>
          </section>

          <section className="bg-muted/30 rounded-xl border p-4">
            <SectionTitle
              title="Review History"
              icon={<History className="size-4" />}
            />

            {reviews.length > 0 ? (
              <div className="space-y-3">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-background rounded-lg border p-3"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <ReportTypesStatusBadge status={review.status} />

                          <p className="text-muted-foreground text-xs">
                            {formatDateTime(review.reviewedAt)}
                          </p>
                        </div>

                        <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
                          <UserRoundCheck className="size-4" />
                          Reviewer:{" "}
                          <span className="text-foreground font-medium">
                            {review.reviewerName ?? review.reviewerEmail ?? "-"}
                          </span>
                        </p>
                      </div>
                    </div>

                    {review.comment && (
                      <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900/60 dark:bg-red-950/30">
                        <p className="mb-1 flex items-center gap-1.5 text-xs font-medium text-red-700 dark:text-red-400">
                          <MessageSquareText className="size-3.5" />
                          Comment
                        </p>

                        <p className="text-sm whitespace-pre-wrap text-red-800 italic dark:text-red-300">
                          {review.comment}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-background rounded-lg border p-3">
                <p className="text-muted-foreground text-sm">
                  No review history yet.
                </p>
              </div>
            )}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SectionTitle({
  title,
  icon,
}: {
  title: string;
  icon?: React.ReactNode;
}) {
  return (
    <h3 className="text-foreground mb-3 flex items-center gap-1.5 text-sm font-semibold">
      {icon}
      <span>{title}</span>
    </h3>
  );
}

function DetailItem({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string | number | Date | null;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-background space-y-1 rounded-lg border p-3">
      <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase">
        {icon}
        <span>{label}</span>
      </div>

      <p className="text-foreground text-sm font-medium wrap-break-word whitespace-pre-wrap">
        {value ? String(value) : "-"}
      </p>
    </div>
  );
}

function formatDate(value?: string | Date | null) {
  if (!value) return "-";

  return format(new Date(value), "dd MMM yyyy");
}

function formatDateTime(value?: string | Date | null) {
  if (!value) return "-";

  return format(new Date(value), "dd MMM yyyy, hh:mm a");
}
