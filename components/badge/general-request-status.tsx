import { Badge } from "@/components/ui/badge";
import {
  GENERAL_REQUEST_STATUS_LABELS,
  type GeneralRequestStatus,
  REQUEST_PRIORITY_LABEL,
  type RequestPriority,
} from "@/db/constants/general-request";
import { cn } from "@/lib/utils";

import { cva } from "class-variance-authority";

const generalRequestStatusBadgeTone = cva("border font-medium", {
  variants: {
    tone: {
      draft:
        "border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-800 dark:bg-gray-950/50 dark:text-gray-300",

      pending_first_approval:
        "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900/60 dark:bg-yellow-950/40 dark:text-yellow-300",

      pending_second_approval:
        "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300",

      approved:
        "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300",

      rejected:
        "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300",

      cancelled:
        "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-300",
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
      variant="outline"
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

const requestPriorityBadgeTone = cva("border font-medium", {
  variants: {
    priority: {
      low: "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-300",

      medium:
        "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300",

      high: "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/60 dark:bg-orange-950/40 dark:text-orange-300",

      urgent:
        "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300",
    },
  },
});

type RequestPriorityBadgeProps = React.ComponentProps<typeof Badge> & {
  priority: RequestPriority;
};

export function RequestPriorityBadge({
  priority,
  className,
  ...props
}: RequestPriorityBadgeProps) {
  return (
    <Badge
      variant="outline"
      data-slot="request-priority-badge"
      className={cn(
        requestPriorityBadgeTone({
          priority,
        }),
        className,
      )}
      {...props}
    >
      {REQUEST_PRIORITY_LABEL[priority]}
    </Badge>
  );
}
