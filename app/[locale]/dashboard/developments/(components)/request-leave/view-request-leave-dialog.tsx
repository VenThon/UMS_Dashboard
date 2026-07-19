"use client";

import { LeaveTypesBadge } from "@/components/badge/leave-types";
import { RequestLeaveStatusBadge } from "@/components/badge/status-request-leave";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { REVIEW_REPORT_STATUS } from "@/db/constants/daily-report-status";
import { LEAVE_DURATION_LABELS } from "@/db/constants/request-leave-status";
import { cn } from "@/lib/utils";
import { RequestLeaveReview } from "@/service/leave-request/leave-request.service";

import { format } from "date-fns";
import {
  CalendarDays,
  CheckCircle2,
  CircleX,
  Clock3,
  FileText,
  History,
  Loader2,
  UserRoundCheck,
} from "lucide-react";

import {
  useRequestLeaveById,
  useRequestLeaveReviews,
} from "../../leave-request/_hooks/use-request-leave";

type ViewRequestLeaveDialogProps = {
  requestLeaveId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ViewRequestLeaveDialog({
  requestLeaveId,
  open,
  onOpenChange,
}: ViewRequestLeaveDialogProps) {
  const id = requestLeaveId ?? "";

  const requestLeaveQuery = useRequestLeaveById(id);
  const reviewsQuery = useRequestLeaveReviews(id);

  const requestLeave = requestLeaveQuery.data?.data;
  const reviews = reviewsQuery.data?.data ?? [];
  const groupedReviews = groupReviewsByRevision(reviews);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Leave Request Details</DialogTitle>
          <DialogDescription>
            Review the leave information and approval history.
          </DialogDescription>
        </DialogHeader>

        {requestLeaveQuery.isLoading ? (
          <LoadingState className="min-h-52" />
        ) : requestLeaveQuery.isError ? (
          <ErrorState message={requestLeaveQuery.error.message} />
        ) : requestLeave ? (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <LeaveTypesBadge status={requestLeave.leaveType} />
              <RequestLeaveStatusBadge status={requestLeave.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem
                icon={CalendarDays}
                label="Start Date"
                value={formatDate(requestLeave.startDate)}
              />

              <DetailItem
                icon={CalendarDays}
                label="End Date"
                value={formatDate(requestLeave.endDate)}
              />

              <DetailItem
                icon={Clock3}
                label="Duration"
                value={LEAVE_DURATION_LABELS[requestLeave.durationType]}
              />

              <DetailItem
                icon={History}
                label="Submitted At"
                value={formatDateTime(requestLeave.createdAt)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <FileText className="size-4" />
                Reason
              </div>

              <div className="bg-muted/40 min-h-24 rounded-lg border p-4 text-sm leading-6 whitespace-pre-wrap">
                {requestLeave.reason}
              </div>
            </div>

            <Separator />

            <section className="space-y-4">
              <div>
                <h3 className="flex items-center gap-2 font-semibold">
                  <History className="size-4" />
                  Review History
                </h3>

                <p className="text-muted-foreground text-sm">
                  Approval and rejection activities for each submission.
                </p>
              </div>

              {reviewsQuery.isLoading ? (
                <LoadingState className="min-h-24" />
              ) : reviewsQuery.isError ? (
                <ErrorState message={reviewsQuery.error.message} />
              ) : groupedReviews.length === 0 ? (
                <div className="text-muted-foreground rounded-lg border border-dashed p-5 text-center text-sm">
                  No review history yet.
                </div>
              ) : (
                <div className="space-y-6">
                  {groupedReviews.map(([revision, revisionReviews], index) => (
                    <div key={revision} className="space-y-4">
                      {index > 0 && <Separator />}

                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h4 className="font-medium">
                            Submission #{revision}
                          </h4>

                          <p className="text-muted-foreground text-xs">
                            {revisionReviews.length}{" "}
                            {revisionReviews.length === 1
                              ? "review"
                              : "reviews"}
                          </p>
                        </div>

                        <Badge variant="secondary">Revision {revision}</Badge>
                      </div>

                      <div className="space-y-3">
                        {revisionReviews.map((review) => (
                          <ReviewHistoryItem key={review.id} review={review} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

type DetailItemProps = {
  icon: React.ElementType;
  label: string;
  value: string;
};

function DetailItem({ icon: Icon, label, value }: DetailItemProps) {
  return (
    <div className="rounded-lg border p-4">
      <div className="text-muted-foreground flex items-center gap-2 text-xs">
        <Icon className="size-4" />
        {label}
      </div>

      <p className="mt-2 text-sm font-medium">{value}</p>
    </div>
  );
}

type ReviewHistoryItemProps = {
  review: RequestLeaveReview;
};

function ReviewHistoryItem({ review }: ReviewHistoryItemProps) {
  const isApproved = review.status === REVIEW_REPORT_STATUS.APPROVED;

  const StatusIcon = isApproved ? CheckCircle2 : CircleX;

  return (
    <div className="rounded-lg border p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="font-medium">Approval Level {review.approvalLevel}</p>

          <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <UserRoundCheck className="size-4" />
            Reviewed by {review.reviewerName ?? "Unknown reviewer"}
          </p>
        </div>

        <Badge
          variant="outline"
          className={cn(
            "gap-1.5",
            isApproved
              ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300",
          )}
        >
          <StatusIcon className="size-3.5" />
          {isApproved ? "Approved" : "Rejected"}
        </Badge>
      </div>

      <p className="text-muted-foreground mt-3 flex items-center gap-1.5 text-xs">
        <Clock3 className="size-3.5" />
        {isApproved ? "Approved at" : "Rejected at"}:{" "}
        {formatDateTime(review.reviewedAt)}
      </p>

      {review.comment && (
        <div className="bg-muted/40 mt-3 rounded-md border p-3">
          <p className="text-muted-foreground mb-1 text-xs font-medium">
            Comment
          </p>

          <p className="text-sm leading-6 whitespace-pre-wrap">
            {review.comment}
          </p>
        </div>
      )}
    </div>
  );
}

function LoadingState({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Loader2 className="text-muted-foreground size-5 animate-spin" />
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
      {message}
    </div>
  );
}

function groupReviewsByRevision(
  reviews: RequestLeaveReview[],
): Array<[number, RequestLeaveReview[]]> {
  const groups = reviews.reduce<Map<number, RequestLeaveReview[]>>(
    (map, review) => {
      const revision = review.revision ?? 1;
      const currentReviews = map.get(revision) ?? [];

      currentReviews.push(review);
      map.set(revision, currentReviews);

      return map;
    },
    new Map(),
  );

  return Array.from(groups.entries())
    .map(
      ([revision, revisionReviews]) =>
        [
          revision,
          revisionReviews.sort(
            (first, second) => first.approvalLevel - second.approvalLevel,
          ),
        ] as [number, RequestLeaveReview[]],
    )
    .sort(
      ([firstRevision], [secondRevision]) => secondRevision - firstRevision,
    );
}

function formatDate(value: string) {
  return format(new Date(`${value}T00:00:00`), "dd MMM yyyy");
}

function formatDateTime(value: string) {
  return format(new Date(value), "dd MMM yyyy, hh:mm a");
}
