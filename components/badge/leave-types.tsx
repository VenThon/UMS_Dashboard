import { Badge } from "@/components/ui/badge";
import {
  LEAVE_TYPES_LABELS,
  LeaveTypes,
} from "@/db/constants/request-leave-status";
import { cn } from "@/lib/utils";

import { cva } from "class-variance-authority";

const LeaveTypesBadgeTone = cva("", {
  variants: {
    tone: {
      annual_leave: "bg-teal-50 text-teal-700",
      sick_leave: "bg-blue-50 text-blue-700",
      personal_leave: "bg-yellow-50 text-yellow-700",
      emergency_leave: "bg-gray-100 text-gray-700",
      maternity_leave: "bg-orange-50 text-orange-700",
      wedding_leave: "bg-green-50 text-green-700",
      other: "bg-sky-50 text-sky-700",
    },
  },
});

type ReportStatusBadgeProps = React.ComponentProps<typeof Badge> & {
  status: LeaveTypes;
};

export function LeaveTypesBadge({
  status,
  className,
  ...props
}: ReportStatusBadgeProps) {
  return (
    <Badge
      data-slot="report-status-badge"
      className={cn(LeaveTypesBadgeTone({ tone: status }), className)}
      {...props}
    >
      {LEAVE_TYPES_LABELS[status]}
    </Badge>
  );
}
