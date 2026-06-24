import {
  DAILY_REPORT_STATUS,
  DailyReportTypes,
} from "@/db/constants/daily-report-status";
import {
  LEAVE_TYPES,
  LeaveTypes,
  REQUEST_LEAVE_STATUS,
  RequestLeaveStatus,
} from "@/db/constants/request-leave-status";

export type dataProps = {
  id: number;
  projectName: string;
  reportDate: string;
  previousTasks: string;
  completedTasks: string;
  inProgressTasks: string;
  blockers: string;
  tomorrowPlan: string;
  remarks: string;
  status: DailyReportTypes;
};

export type RequestLeaveProps = {
  id: number;
  leaveType: LeaveTypes;
  startDate: string;
  endDate: string;
  durationDays: string;
  reason: string;
  status: RequestLeaveStatus;
};

export const MockDataDevelopmentTeam: dataProps[] = [
  {
    id: 1,
    projectName: "Reporting System",
    reportDate: "23-06-2024",
    previousTasks: "Design Figma",
    completedTasks: "No, In Review",
    inProgressTasks: "Continue Design Figma",
    blockers: "read documents",
    tomorrowPlan: "Test qa CTC",
    remarks: "no comments",
    status: DAILY_REPORT_STATUS.PENDING,
  },
  {
    id: 2,
    projectName: "CTC Management System",
    reportDate: "24-06-2024",
    previousTasks: "Implemented the login page",
    completedTasks: "Login page completed",
    inProgressTasks: "Implementing the dashboard",
    blockers: "Waiting for the dashboard API",
    tomorrowPlan: "Continue implementing the dashboard",
    remarks: "API integration is pending",
    status: DAILY_REPORT_STATUS.PENDING,
  },
];

export const MockDataRequestLeave: RequestLeaveProps[] = [
  {
    id: 1,
    leaveType: LEAVE_TYPES.ANNUAL_LEAVE,
    startDate: "24-06-2026",
    endDate: "24-06-2026",
    durationDays: "1 day",
    reason: "Sick ",
    status: REQUEST_LEAVE_STATUS.PENDING,
  },
];
