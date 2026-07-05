"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { REVIEW_REPORT_STATUS } from "@/db/constants/daily-report-status";
import { useReviewDailyReport } from "@/hooks/report/use-daily-report";

import { XCircle } from "lucide-react";

type RejectDailyReportDialogProps = {
  id: string;
};

export function RejectDailyReportDialog({ id }: RejectDailyReportDialogProps) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");

  const reviewDailyReport = useReviewDailyReport();

  function handleReject() {
    reviewDailyReport.mutate(
      {
        id,
        values: {
          status: REVIEW_REPORT_STATUS.REJECTED,
          comment,
        },
      },
      {
        onSuccess: () => {
          setComment("");
          setOpen(false);
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant="outline"
          aria-label="Reject report"
          className="size-8 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/50"
        >
          <XCircle className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0 sm:max-w-xl">
        <DialogHeader className="border-b px-6 py-5">
          <div className="space-y-1 pr-10">
            <DialogTitle>Reject daily report?</DialogTitle>
            <DialogDescription>
              Please provide a reason so the user can update and resubmit this
              report.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="px-6 py-5">
          <Textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Enter rejection reason..."
            className="min-h-28 resize-y"
          />
        </div>

        <DialogFooter className="px-6 py-4">
          <Button
            type="button"
            variant="outline"
            disabled={reviewDailyReport.isPending}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={reviewDailyReport.isPending || !comment.trim()}
            onClick={handleReject}
          >
            <XCircle className="size-4" />
            {reviewDailyReport.isPending ? "Rejecting..." : "Reject Report"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
