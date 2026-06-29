import { Badge } from "@/components/ui/badge";
import {
  DAILY_REPORT_STATUS_LABELS,
  DailyReportTypes,
} from "@/db/constants/daily-report-status";
import { cn } from "@/lib/utils";

import { cva } from "class-variance-authority";

const reportStatusBadgeTone = cva("", {
  variants: {
    tone: {
      pending: "bg-red-50 text-red-700",
      approved: "bg-blue-50 text-blue-700",
      rejected: "bg-yellow-50 text-yellow-700",
    },
  },
});

type ReportStatusBadgeProps = React.ComponentProps<typeof Badge> & {
  status: DailyReportTypes;
};

export function ReportTypesStatusBadge({
  status,
  className,
  ...props
}: ReportStatusBadgeProps) {
  return (
    <Badge
      data-slot="report-status-badge"
      className={cn(reportStatusBadgeTone({ tone: status }), className)}
      {...props}
    >
      {DAILY_REPORT_STATUS_LABELS[status]}
    </Badge>
  );
}
