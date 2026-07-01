import { Badge } from "@/components/ui/badge";
import {
  GENERAL_REQUEST_STATUS_LABELS,
  GeneralRequestStatus,
  REQUEST_PRIORITY_LABELS,
  StatusRequestPriority,
} from "@/db/constants/general-request";
import { cn } from "@/lib/utils";

import { cva } from "class-variance-authority";

const generalRequestStatusBadgeTone = cva("", {
  variants: {
    tone: {
      draft: "bg-gray-50 text-gray-700",
      pending: "bg-yellow-50 text-yellow-700",
      under_review: "bg-purple-50 text-purple-700",
      approved: "bg-blue-50 text-blue-700",
      rejected: "bg-red-50 text-red-700",
      processing: "bg-orange-50 text-orange-700",
      completed: "bg-green-50 text-green-700",
      cancelled: "bg-slate-50 text-slate-700",
    },
  },
});

type GeneralRequestStatusBadgeProps = React.ComponentProps<typeof Badge> & {
  status: GeneralRequestStatus;
};

export function GeneralRequestStatusBadge({
  status,
  className,
  ...props
}: GeneralRequestStatusBadgeProps) {
  return (
    <Badge
      data-slot="general-request-status-badge"
      className={cn(
        generalRequestStatusBadgeTone({
          tone: status,
        }),
        className,
      )}
      {...props}
    >
      {GENERAL_REQUEST_STATUS_LABELS[status]}
    </Badge>
  );
}

const requestPriorityBadgeTone = cva("border-transparent font-medium", {
  variants: {
    priority: {
      low: "bg-slate-100 text-slate-700 hover:bg-slate-100",
      medium: "bg-blue-100 text-blue-700 hover:bg-blue-100",
      high: "bg-orange-100 text-orange-700 hover:bg-orange-100",
      urgent: "bg-red-100 text-red-700 hover:bg-red-100",
    },
  },
});

type RequestPriorityBadgeProps = React.ComponentProps<typeof Badge> & {
  priority: StatusRequestPriority;
};

export function RequestPriorityBadge({
  priority,
  className,
  ...props
}: RequestPriorityBadgeProps) {
  return (
    <Badge
      data-slot="request-priority-badge"
      className={cn(requestPriorityBadgeTone({ priority }), className)}
      {...props}
    >
      {REQUEST_PRIORITY_LABELS[priority]}
    </Badge>
  );
}
