// src/server/services/attendance-service.ts
import {
  ATTENDANCE_ACTIONS,
  ATTENDANCE_STATUSES,
  type AttendanceStatus,
} from "@/db/constants/attendance";
import type {
  AttendanceListQuery,
  UpdateAttendanceValues,
} from "@/db/validation/attendance";
import {
  calculateLateMinutes,
  calculateWorkedMinutes,
  getCambodiaDateString,
} from "@/lib/attendance";
import {
  createAttendance,
  createAttendanceHistory,
  findAttendanceById,
  findAttendanceByUserAndDate,
  getAttendanceHistory,
  getPaginatedAttendances,
  updateAttendanceById,
} from "@/server/repositories/attendance-repository";

export class AttendanceServiceError extends Error {
  constructor(
    message: string,
    public statusCode = 400,
  ) {
    super(message);
    this.name = "AttendanceServiceError";
  }
}

export async function checkInAttendance(userId: string) {
  const now = new Date();
  const attendanceDate = getCambodiaDateString(now);

  const existingAttendance = await findAttendanceByUserAndDate(
    userId,
    attendanceDate,
  );

  if (existingAttendance?.checkInAt) {
    throw new AttendanceServiceError("You have already checked in today.", 409);
  }

  const lateMinutes = calculateLateMinutes(now);

  const status: AttendanceStatus =
    lateMinutes > 0 ? ATTENDANCE_STATUSES.LATE : ATTENDANCE_STATUSES.PRESENT;

  const attendance = await createAttendance({
    userId,
    attendanceDate,
    checkInAt: now,
    status,
    lateMinutes,
  });

  await createAttendanceHistory({
    attendanceId: attendance.id,
    action: ATTENDANCE_ACTIONS.CHECK_IN,
    performedById: userId,
    newData: {
      checkInAt: attendance.checkInAt,
      status: attendance.status,
      lateMinutes: attendance.lateMinutes,
    },
    description: "User checked in.",
  });

  return attendance;
}

export async function checkOutAttendance(userId: string) {
  const now = new Date();
  const attendanceDate = getCambodiaDateString(now);

  const attendance = await findAttendanceByUserAndDate(userId, attendanceDate);

  if (!attendance?.checkInAt) {
    throw new AttendanceServiceError(
      "You must check in before checking out.",
      400,
    );
  }

  if (attendance.checkOutAt) {
    throw new AttendanceServiceError(
      "You have already checked out today.",
      409,
    );
  }

  const workedMinutes = calculateWorkedMinutes(attendance.checkInAt, now);

  const updatedAttendance = await updateAttendanceById(attendance.id, {
    checkOutAt: now,
    workedMinutes,
  });

  if (!updatedAttendance) {
    throw new AttendanceServiceError("Attendance record was not found.", 404);
  }

  await createAttendanceHistory({
    attendanceId: attendance.id,
    action: ATTENDANCE_ACTIONS.CHECK_OUT,
    performedById: userId,
    previousData: {
      checkOutAt: attendance.checkOutAt,
      workedMinutes: attendance.workedMinutes,
    },
    newData: {
      checkOutAt: updatedAttendance.checkOutAt,
      workedMinutes: updatedAttendance.workedMinutes,
    },
    description: "User checked out.",
  });

  return updatedAttendance;
}

export async function getTodayAttendance(userId: string) {
  const attendanceDate = getCambodiaDateString();

  return findAttendanceByUserAndDate(userId, attendanceDate);
}

export async function getAttendanceList(query: AttendanceListQuery) {
  return getPaginatedAttendances(query);
}

export async function getAttendanceDetail(id: string) {
  const attendance = await findAttendanceById(id);

  if (!attendance) {
    throw new AttendanceServiceError("Attendance record was not found.", 404);
  }

  const history = await getAttendanceHistory(id);

  return {
    ...attendance,
    history,
  };
}

export async function updateAttendanceByAdmin({
  attendanceId,
  performedById,
  values,
}: {
  attendanceId: string;
  performedById: string;
  values: UpdateAttendanceValues;
}) {
  const currentAttendance = await findAttendanceById(attendanceId);

  if (!currentAttendance) {
    throw new AttendanceServiceError("Attendance record was not found.", 404);
  }

  let workedMinutes = currentAttendance.workedMinutes;

  const checkInAt =
    values.checkInAt !== undefined
      ? values.checkInAt
      : currentAttendance.checkInAt;

  const checkOutAt =
    values.checkOutAt !== undefined
      ? values.checkOutAt
      : currentAttendance.checkOutAt;

  if (checkInAt && checkOutAt) {
    if (checkOutAt < checkInAt) {
      throw new AttendanceServiceError(
        "Check-out time cannot be before check-in time.",
      );
    }

    workedMinutes = calculateWorkedMinutes(checkInAt, checkOutAt);
  }

  const updatedAttendance = await updateAttendanceById(attendanceId, {
    ...values,
    workedMinutes,
  });

  if (!updatedAttendance) {
    throw new AttendanceServiceError("Attendance record was not found.", 404);
  }

  const action =
    values.status && values.status !== currentAttendance.status
      ? ATTENDANCE_ACTIONS.STATUS_CHANGED
      : ATTENDANCE_ACTIONS.UPDATED;

  await createAttendanceHistory({
    attendanceId,
    action,
    performedById,
    previousData: currentAttendance,
    newData: updatedAttendance,
    description:
      action === ATTENDANCE_ACTIONS.STATUS_CHANGED
        ? `Attendance status changed from ${currentAttendance.status} to ${updatedAttendance.status}.`
        : "Attendance record was updated.",
  });

  return updatedAttendance;
}
