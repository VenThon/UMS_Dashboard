import { Button } from "@/components/ui/button";
import { useSubmitDailyReport } from "@/hooks/report/use-daily-report";

import { RefreshCw, Send } from "lucide-react";

type SubmitDailyReportButtonProps = {
  id: string;
  type: "submit" | "resubmit";
};

export function SubmitDailyReportButton({
  id,
  type,
}: SubmitDailyReportButtonProps) {
  const submitDailyReport = useSubmitDailyReport();

  const isResubmit = type === "resubmit";

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      aria-label={isResubmit ? "Resubmit report" : "Submit report"}
      className={
        isResubmit
          ? "size-8 border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800 dark:border-orange-900/60 dark:text-orange-400 dark:hover:bg-orange-950/50"
          : "size-8 border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 dark:border-green-900/60 dark:text-green-400 dark:hover:bg-green-950/50"
      }
      disabled={submitDailyReport.isPending}
      onClick={() => submitDailyReport.mutate(id)}
    >
      {isResubmit ? (
        <RefreshCw className="size-4" />
      ) : (
        <Send className="size-4" />
      )}
    </Button>
  );
}
