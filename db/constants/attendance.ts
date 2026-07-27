export const ATTENDANCE_STATUSES = {
  PRESENT: "PRESENT",
  LATE: "LATE",
  ABSENT: "ABSENT",
  ON_LEAVE: "ON_LEAVE",
  HALF_DAY: "HALF_DAY",
  WORK_FROM_HOME: "WORK_FROM_HOME",
} as const;

export type AttendanceStatus =
  (typeof ATTENDANCE_STATUSES)[keyof typeof ATTENDANCE_STATUSES];

export const ATTENDANCE_STATUS_VALUES = Object.values(ATTENDANCE_STATUSES);

export const ATTENDANCE_STATUS_LABELS: Record<AttendanceStatus, string> = {
  PRESENT: "Present",
  LATE: "Late",
  ABSENT: "Absent",
  ON_LEAVE: "On Leave",
  HALF_DAY: "Half Day",
  WORK_FROM_HOME: "Work From Home",
};

export const ATTENDANCE_ACTIONS = {
  CHECK_IN: "CHECK_IN",
  CHECK_OUT: "CHECK_OUT",
  UPDATED: "UPDATED",
  STATUS_CHANGED: "STATUS_CHANGED",
} as const;

export type AttendanceAction =
  (typeof ATTENDANCE_ACTIONS)[keyof typeof ATTENDANCE_ACTIONS];

export const ATTENDANCE_ACTION_VALUES = Object.values(ATTENDANCE_ACTIONS);
