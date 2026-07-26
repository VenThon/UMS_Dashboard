import { Badge } from "@/components/ui/badge";
import {
  GENERAL_REQUEST_STATUS_LABELS,
  GENERAL_REQUEST_TYPE_LABEL,
  type GeneralRequestStatus,
  GeneralRequestType,
  REQUEST_PRIORITY_LABEL,
  type RequestPriority,
} from "@/db/constants/general-request";
import { cn } from "@/lib/utils";

import { cva } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import {
  Ban,
  Boxes,
  CheckCircle2,
  CircleAlert,
  CircleDashed,
  CircleEllipsis,
  CircleX,
  Clock3,
  Flame,
  Gauge,
  GraduationCap,
  HandCoins,
  Laptop,
  Minus,
  ShieldAlert,
  Wrench,
} from "lucide-react";

const generalRequestStatusBadgeTone = cva("gap-1.5 border font-medium", {
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

const GENERAL_REQUEST_STATUS_ICONS: Record<GeneralRequestStatus, LucideIcon> = {
  draft: CircleDashed,
  pending_first_approval: Clock3,
  pending_second_approval: CircleAlert,
  approved: CheckCircle2,
  rejected: CircleX,
  cancelled: Ban,
};

type GeneralRequestStatusBadgeProps = React.ComponentProps<typeof Badge> & {
  status: GeneralRequestStatus;
};

export function GeneralRequestStatusBadge({
  status,
  className,
  ...props
}: GeneralRequestStatusBadgeProps) {
  const StatusIcon = GENERAL_REQUEST_STATUS_ICONS[status];

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
      <StatusIcon className="size-3.5 shrink-0" aria-hidden="true" />

      <span>{GENERAL_REQUEST_STATUS_LABELS[status]}</span>
    </Badge>
  );
}

const requestPriorityBadgeTone = cva("gap-1.5 border font-medium", {
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

const REQUEST_PRIORITY_ICONS: Record<RequestPriority, LucideIcon> = {
  low: Minus,
  medium: Gauge,
  high: ShieldAlert,
  urgent: Flame,
};

type RequestPriorityBadgeProps = React.ComponentProps<typeof Badge> & {
  priority: RequestPriority;
};

export function RequestPriorityBadge({
  priority,
  className,
  ...props
}: RequestPriorityBadgeProps) {
  const PriorityIcon = REQUEST_PRIORITY_ICONS[priority];

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
      <PriorityIcon className="size-3.5 shrink-0" aria-hidden="true" />

      <span>{REQUEST_PRIORITY_LABEL[priority]}</span>
    </Badge>
  );
}

export const GENERAL_REQUEST_TYPE_ICONS: Record<
  GeneralRequestType,
  LucideIcon
> = {
  equipment: Boxes,
  software: Laptop,
  training: GraduationCap,
  budget: HandCoins,
  service: Wrench,
  other: CircleEllipsis,
};

type GeneralRequestTypeBadgeProps = React.ComponentProps<typeof Badge> & {
  requestType: GeneralRequestType;
};

export function GeneralRequestTypeBadge({
  requestType,
  className,
  ...props
}: GeneralRequestTypeBadgeProps) {
  const TypeIcon = GENERAL_REQUEST_TYPE_ICONS[requestType];

  return (
    <Badge
      variant="secondary"
      data-slot="general-request-type-badge"
      className={cn("gap-1.5 font-medium", className)}
      {...props}
    >
      <TypeIcon className="size-3.5 shrink-0" aria-hidden="true" />

      <span>{GENERAL_REQUEST_TYPE_LABEL[requestType]}</span>
    </Badge>
  );
}
