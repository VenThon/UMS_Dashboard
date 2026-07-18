import { Badge } from "@/components/ui/badge";
import {
  LEAVE_TYPES_LABELS,
  LeaveTypes,
} from "@/db/constants/request-leave-status";
import { cn } from "@/lib/utils";

import { cva } from "class-variance-authority";
import {
  Baby,
  CalendarDays,
  CircleHelp,
  HeartPulse,
  type LucideIcon,
  PartyPopper,
  PersonStanding,
  Siren,
} from "lucide-react";

const leaveTypeBadgeTone = cva("inline-flex items-center gap-1.5 border-0", {
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

const LEAVE_TYPE_ICONS: Record<LeaveTypes, LucideIcon> = {
  annual_leave: CalendarDays,
  sick_leave: HeartPulse,
  personal_leave: PersonStanding,
  emergency_leave: Siren,
  maternity_leave: Baby,
  wedding_leave: PartyPopper,
  other: CircleHelp,
};

type LeaveTypesBadgeProps = React.ComponentProps<typeof Badge> & {
  status: LeaveTypes;
};

export function LeaveTypesBadge({
  status,
  className,
  ...props
}: LeaveTypesBadgeProps) {
  const Icon = LEAVE_TYPE_ICONS[status];

  return (
    <Badge
      data-slot="leave-type-badge"
      className={cn(leaveTypeBadgeTone({ tone: status }), className)}
      {...props}
    >
      <Icon className="size-3.5" />
      {LEAVE_TYPES_LABELS[status]}
    </Badge>
  );
}
