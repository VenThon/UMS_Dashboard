"use client";

import { useReviewDailyReport } from "@/app/[locale]/dashboard/developments/report/_hooks/use-daily-report";
import { Button } from "@/components/ui/button";
import { REVIEW_REPORT_STATUS } from "@/db/constants/daily-report-status";

import { CheckCircle2 } from "lucide-react";

type ApproveDailyReportButtonProps = {
  id: string;
};

export function ApproveDailyReportButton({
  id,
}: ApproveDailyReportButtonProps) {
  const reviewDailyReport = useReviewDailyReport();

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      aria-label="Approve report"
      className="size-8 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 dark:border-emerald-900/60 dark:text-emerald-400 dark:hover:bg-emerald-950/50"
      disabled={reviewDailyReport.isPending}
      onClick={() =>
        reviewDailyReport.mutate({
          id,
          values: {
            status: REVIEW_REPORT_STATUS.APPROVED,
          },
        })
      }
    >
      <CheckCircle2 className="size-4" />
    </Button>
  );
}
