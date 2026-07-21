"use client";

import {
  GeneralRequestStatusBadge,
  RequestPriorityBadge,
} from "@/components/badge/general-request-status";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { GENERAL_REQUEST_TYPE_LABEL } from "@/db/constants/general-request";

import { format } from "date-fns";
import {
  CalendarDays,
  CircleDollarSign,
  FileText,
  History,
  Loader2,
  Paperclip,
  Target,
} from "lucide-react";

import {
  useGeneralRequestById,
  useGeneralRequestReviews,
} from "../../general-request/_hooks/use-general-request";

type ViewGeneralRequestDialogProps = {
  generalRequestId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ViewGeneralRequestDialog({
  generalRequestId,
  open,
  onOpenChange,
}: ViewGeneralRequestDialogProps) {
  const id = generalRequestId ?? "";
  const requestQuery = useGeneralRequestById(id);
  const reviewsQuery = useGeneralRequestReviews(id);

  const request = requestQuery.data?.data;
  const reviews = reviewsQuery.data?.data ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader className="flex flex-col gap-3 pr-10 text-left sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-1">
            <DialogTitle>General Request Details</DialogTitle>

            <DialogDescription>
              View the request information and approval history.
            </DialogDescription>
          </div>

          {request && (
            <GeneralRequestStatusBadge
              status={request.status}
              className="w-fit shrink-0"
            />
          )}
        </DialogHeader>
        {requestQuery.isLoading ? (
          <div className="flex min-h-52 items-center justify-center">
            <Loader2 className="text-muted-foreground size-6 animate-spin" />
          </div>
        ) : requestQuery.isError ? (
          <ErrorState message={requestQuery.error.message} />
        ) : request ? (
          <div className="space-y-6">
            <div className="bg-muted/30 flex flex-wrap items-center gap-2 rounded-lg border p-3">
              <div className="bg-background flex items-center gap-2 rounded-md px-2.5 py-1.5">
                <span className="text-muted-foreground text-xs font-medium">
                  Request type
                </span>

                <Badge variant="secondary">
                  {GENERAL_REQUEST_TYPE_LABEL[request.requestType]}
                </Badge>
              </div>

              <div className="bg-background flex items-center gap-2 rounded-md px-2.5 py-1.5">
                <span className="text-muted-foreground text-xs font-medium">
                  Priority
                </span>

                <RequestPriorityBadge priority={request.priority} />
              </div>

              <div className="bg-background flex items-center gap-2 rounded-md px-2.5 py-1.5">
                <span className="text-muted-foreground text-xs font-medium">
                  Revision
                </span>

                <Badge variant="outline">{request.revision}</Badge>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem
                label="Required Date"
                icon={CalendarDays}
                value={
                  request.requiredDate
                    ? formatDate(request.requiredDate)
                    : "Not specified"
                }
              />

              <DetailItem
                label="Estimated Cost"
                icon={CircleDollarSign}
                value={formatEstimatedCost(
                  request.estimatedCost,
                  request.currency,
                )}
              />

              <DetailItem
                label="Submitted At"
                icon={History}
                value={formatDateTime(request.createdAt)}
              />

              <DetailItem
                label="Last Updated"
                icon={History}
                value={formatDateTime(request.updatedAt)}
              />
            </div>

            <ContentSection
              icon={FileText}
              title="Title"
              content={request.title}
            />

            <ContentSection
              icon={FileText}
              title="Description"
              content={request.description}
            />

            <ContentSection
              icon={Target}
              title="Reason"
              content={request.reason}
            />

            <ContentSection
              icon={Target}
              title="Expected Benefit"
              content={request.expectedBenefit}
            />

            {request.attachments.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Paperclip className="size-4" />
                  Attachments
                </div>

                <div className="space-y-2">
                  {request.attachments.map((attachment) => (
                    <a
                      key={attachment.url}
                      href={attachment.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:bg-muted flex items-center justify-between rounded-lg border p-3 text-sm transition-colors"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <Paperclip className="text-muted-foreground size-4 shrink-0" />

                        <span className="truncate">{attachment.name}</span>
                      </div>

                      {attachment.size !== undefined && (
                        <span className="text-muted-foreground text-xs">
                          {formatFileSize(attachment.size)}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Review History</h3>

                <p className="text-muted-foreground text-sm">
                  Approval and rejection activities for every revision.
                </p>
              </div>

              {reviewsQuery.isLoading ? (
                <div className="flex min-h-24 items-center justify-center">
                  <Loader2 className="text-muted-foreground size-5 animate-spin" />
                </div>
              ) : reviewsQuery.isError ? (
                <ErrorState message={reviewsQuery.error.message} />
              ) : reviews.length === 0 ? (
                <div className="text-muted-foreground rounded-lg border border-dashed p-5 text-center text-sm">
                  No review history yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="rounded-lg border p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="font-medium">
                            Approval Level {review.approvalLevel}
                          </p>

                          <p className="text-muted-foreground text-sm">
                            {review.reviewerName ?? "Unknown reviewer"}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            Revision {review.revision}
                          </Badge>

                          <Badge
                            variant="outline"
                            className={
                              review.status === "approved"
                                ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300"
                                : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
                            }
                          >
                            {review.status === "approved"
                              ? "Approved"
                              : "Rejected"}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-muted-foreground mt-2 text-xs">
                        {formatDateTime(review.reviewedAt)}
                      </p>

                      {review.comment && (
                        <p className="bg-muted/40 mt-3 rounded-md border p-3 text-sm whitespace-pre-wrap">
                          {review.comment}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

type DetailItemProps = {
  label: string;
  value: string;
  icon: React.ElementType;
};

function DetailItem({ label, value, icon: Icon }: DetailItemProps) {
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

type ContentSectionProps = {
  title: string;
  content: string;
  icon: React.ElementType;
};

function ContentSection({ title, content, icon: Icon }: ContentSectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Icon className="size-4" />
        {title}
      </div>

      <div className="bg-muted/40 min-h-20 rounded-lg border p-4 text-sm leading-6 whitespace-pre-wrap">
        {content}
      </div>
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

function formatDate(value: string) {
  return format(new Date(`${value}T00:00:00`), "dd MMM yyyy");
}

function formatDateTime(value: string) {
  return format(new Date(value), "dd MMM yyyy, hh:mm a");
}

function formatEstimatedCost(
  estimatedCost: string | null,
  currency: string | null,
) {
  if (!estimatedCost) {
    return "Not specified";
  }

  const amount = Number(estimatedCost);

  if (Number.isNaN(amount)) {
    return estimatedCost;
  }

  return `${amount.toLocaleString()} ${currency ?? ""}`.trim();
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
