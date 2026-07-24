// src/lib/attendance.ts

const TIME_ZONE = "Asia/Phnom_Penh";

export function getCambodiaDateString(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function getCambodiaTimeParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const value = Object.fromEntries(
    parts.map((part) => [part.type, part.value]),
  );

  return {
    hour: Number(value.hour),
    minute: Number(value.minute),
    second: Number(value.second),
  };
}

export function calculateLateMinutes(
  checkInAt: Date,
  officeStartHour = 8,
  officeStartMinute = 0,
) {
  const time = getCambodiaTimeParts(checkInAt);

  const actualMinutes = time.hour * 60 + time.minute;
  const expectedMinutes = officeStartHour * 60 + officeStartMinute;

  return Math.max(0, actualMinutes - expectedMinutes);
}

export function calculateWorkedMinutes(checkInAt: Date, checkOutAt: Date) {
  const difference = checkOutAt.getTime() - checkInAt.getTime();

  return Math.max(0, Math.floor(difference / 60_000));
}
