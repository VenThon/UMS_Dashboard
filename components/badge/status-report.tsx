import { Badge } from "@/components/ui/badge";
import {
  DAILY_REPORT_STATUS_LABELS,
  DailyReportTypes,
} from "@/db/constants/daily-report-status";
import { cn } from "@/lib/utils";

import { cva } from "class-variance-authority";
import {
  CircleCheck,
  CircleDashed,
  CircleX,
  Clock3,
  type LucideIcon,
} from "lucide-react";

const reportStatusBadgeTone = cva(
  "inline-flex items-center p-3 gap-1.5 border",
  {
    variants: {
      tone: {
        draft: "border-gray-200 bg-gray-100 text-gray-600",
        pending: "border-orange-200 bg-orange-50 text-orange-700",
        approved: "border-green-200 bg-green-50 text-green-700",
        rejected: "border-red-200 bg-red-50 text-red-700",
      },
    },
  },
);

const REPORT_STATUS_ICONS: Record<DailyReportTypes, LucideIcon> = {
  draft: CircleDashed,
  pending: Clock3,
  approved: CircleCheck,
  rejected: CircleX,
};

type ReportStatusBadgeProps = React.ComponentProps<typeof Badge> & {
  status: DailyReportTypes;
};

export function ReportTypesStatusBadge({
  status,
  className,
  ...props
}: ReportStatusBadgeProps) {
  const StatusIcon = REPORT_STATUS_ICONS[status];

  return (
    <Badge
      data-slot="report-status-badge"
      className={cn(reportStatusBadgeTone({ tone: status }), className)}
      {...props}
    >
      <StatusIcon className="size-4" aria-hidden="true" />
      {DAILY_REPORT_STATUS_LABELS[status]}
    </Badge>
  );
}
