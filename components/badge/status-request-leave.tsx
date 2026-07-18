import { Badge } from "@/components/ui/badge";
import {
  REQUEST_LEAVE_STATUS,
  REQUEST_LEAVE_STATUS_LABELS,
  RequestLeaveStatus,
} from "@/db/constants/request-leave-status";
import { cn } from "@/lib/utils";

import { cva } from "class-variance-authority";
import {
  Ban,
  CheckCircle2,
  CircleHelp,
  CircleX,
  Clock3,
  Hourglass,
  type LucideIcon,
} from "lucide-react";

const leaveRequestStatusBadgeTone = cva(
  "inline-flex items-center gap-1.5 border-0 font-medium",
  {
    variants: {
      tone: {
        pending_first_approval:
          "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",

        pending_second_approval:
          "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",

        approved:
          "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300",

        rejected: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300",

        cancelled:
          "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
      },
    },
  },
);

const REQUEST_LEAVE_STATUS_ICONS: Record<RequestLeaveStatus, LucideIcon> = {
  [REQUEST_LEAVE_STATUS.PENDING_FIRST_APPROVAL]: Clock3,
  [REQUEST_LEAVE_STATUS.PENDING_SECOND_APPROVAL]: Hourglass,
  [REQUEST_LEAVE_STATUS.APPROVED]: CheckCircle2,
  [REQUEST_LEAVE_STATUS.REJECTED]: CircleX,
  [REQUEST_LEAVE_STATUS.CANCELLED]: Ban,
};

type RequestLeaveStatusBadgeProps = React.ComponentProps<typeof Badge> & {
  status: RequestLeaveStatus;
};

export function RequestLeaveStatusBadge({
  status,
  className,
  ...props
}: RequestLeaveStatusBadgeProps) {
  const Icon = REQUEST_LEAVE_STATUS_ICONS[status] ?? CircleHelp;

  const label = REQUEST_LEAVE_STATUS_LABELS[status] ?? "Unknown status";

  return (
    <Badge
      data-slot="request-leave-status-badge"
      className={cn(
        leaveRequestStatusBadgeTone({
          tone: status,
        }),
        className,
      )}
      {...props}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </Badge>
  );
}
