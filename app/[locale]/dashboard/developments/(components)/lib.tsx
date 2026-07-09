import {
  LEAVE_DURATION_TYPES,
  LeaveDurationType,
} from "@/db/constants/request-leave-status";

export function getTodayDate() {
  const today = new Date();
  const timezoneOffset = today.getTimezoneOffset() * 60_000;

  return new Date(today.getTime() - timezoneOffset).toISOString().split("T")[0];
}

export function calculateTotalLeaveDays({
  startDate,
  endDate,
  durationType,
}: {
  startDate?: string;
  endDate?: string;
  durationType?: LeaveDurationType;
}) {
  if (!startDate || !endDate || !durationType) {
    return 0;
  }

  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime()) ||
    end < start
  ) {
    return 0;
  }

  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  const totalCalendarDays =
    Math.round((end.getTime() - start.getTime()) / millisecondsPerDay) + 1;

  if (
    durationType === LEAVE_DURATION_TYPES.HALF_DAY_MORNING ||
    durationType === LEAVE_DURATION_TYPES.HALF_DAY_AFTERNOON
  ) {
    return 0.5;
  }

  return totalCalendarDays;
}
