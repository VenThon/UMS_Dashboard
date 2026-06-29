import { Badge } from "@/components/ui/badge";
import {
  REQUEST_LEAVE_STATUS_LABELS,
  RequestLeaveStatus,
} from "@/db/constants/request-leave-status";
import { cn } from "@/lib/utils";

import { cva } from "class-variance-authority";

const leaveRequestStatusBadgeTone = cva("", {
  variants: {
    tone: {
      pending: "bg-red-50 text-red-700",
      approved: "bg-blue-50 text-blue-700",
      rejected: "bg-yellow-50 text-yellow-700",
      cancel: "bg-gray-100 text-gray-700",
    },
  },
});

type ReportStatusBadgeProps = React.ComponentProps<typeof Badge> & {
  status: RequestLeaveStatus;
};

export function RequestLeaveStatusBadge({
  status,
  className,
  ...props
}: ReportStatusBadgeProps) {
  return (
    <Badge
      data-slot="report-status-badge"
      className={cn(leaveRequestStatusBadgeTone({ tone: status }), className)}
      {...props}
    >
      {REQUEST_LEAVE_STATUS_LABELS[status]}
    </Badge>
  );
}
