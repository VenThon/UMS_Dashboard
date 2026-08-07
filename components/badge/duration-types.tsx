import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { cva } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { CalendarDays, Sunrise, Sunset } from "lucide-react";

export const LEAVE_DURATION_TYPES = {
  FULL_DAY: "full_day",
  HALF_DAY_MORNING: "half_day_morning",
  HALF_DAY_AFTERNOON: "half_day_afternoon",
} as const;

export type LeaveDurationType =
  (typeof LEAVE_DURATION_TYPES)[keyof typeof LEAVE_DURATION_TYPES];

export const LEAVE_DURATION_TYPE_LABELS: Record<LeaveDurationType, string> = {
  full_day: "Full Day",
  half_day_morning: "Morning Half Day",
  half_day_afternoon: "Afternoon Half Day",
};

const LEAVE_DURATION_TYPE_ICONS: Record<LeaveDurationType, LucideIcon> = {
  full_day: CalendarDays,
  half_day_morning: Sunrise,
  half_day_afternoon: Sunset,
};

const leaveDurationTypeBadgeTone = cva("gap-1.5 border font-medium", {
  variants: {
    duration: {
      full_day:
        "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300",

      half_day_morning:
        "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300",

      half_day_afternoon:
        "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/60 dark:bg-orange-950/40 dark:text-orange-300",
    },
  },
});

type LeaveDurationTypeBadgeProps = React.ComponentProps<typeof Badge> & {
  durationType: LeaveDurationType;
};

export function LeaveDurationTypeBadge({
  durationType,
  className,
  ...props
}: LeaveDurationTypeBadgeProps) {
  const DurationIcon = LEAVE_DURATION_TYPE_ICONS[durationType];

  return (
    <Badge
      variant="outline"
      data-slot="leave-duration-type-badge"
      className={cn(
        leaveDurationTypeBadgeTone({
          duration: durationType,
        }),
        className,
      )}
      {...props}
    >
      <DurationIcon className="size-3.5 shrink-0" aria-hidden="true" />

      <span>{LEAVE_DURATION_TYPE_LABELS[durationType]}</span>
    </Badge>
  );
}
