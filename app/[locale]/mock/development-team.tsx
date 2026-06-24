import {
  DAILY_REPORT_STATUS,
  DailyReportTypes,
} from "@/db/constants/daily-report-status";
import {
  GENERAL_REQUEST_STATUSES,
  GENERAL_REQUEST_TYPES,
  GeneralRequestStatus,
  GeneralRequestType,
  REQUEST_PRIORITIES,
  StatusRequestPriority,
} from "@/db/constants/general-request";
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

export type GeneralRequestProps = {
  id: number;
  requestType: GeneralRequestType;
  title: string;
  description: string;
  reason: string;
  expectedBenefit?: string;
  priority: StatusRequestPriority;
  requiredDate?: string;
  estimatedCost?: number;
  currency?: "USD" | "KHR";
  status: GeneralRequestStatus;
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

export const mockDataGeneralRequests: GeneralRequestProps[] = [
  {
    id: 1,
    requestType: GENERAL_REQUEST_TYPES.EQUIPMENT,
    title: "Request for a new development laptop",
    description:
      "Requesting a new laptop with enough performance for frontend development and Docker.",
    reason:
      "The current laptop is slow and frequently crashes while running development tools.",
    expectedBenefit:
      "It will improve development performance and reduce delays in project delivery.",
    priority: REQUEST_PRIORITIES.HIGH,
    requiredDate: "30-06-2026",
    estimatedCost: 1200,
    currency: "USD",
    status: GENERAL_REQUEST_STATUSES.PENDING,
  },
  {
    id: 2,
    requestType: GENERAL_REQUEST_TYPES.LANGUAGE_COURSE,
    title: "Request to attend an English course",
    description:
      "Requesting support to attend an English communication course.",
    reason:
      "English communication is important for technical documentation and international collaboration.",
    expectedBenefit:
      "It will improve communication with stakeholders and understanding of technical resources.",
    priority: REQUEST_PRIORITIES.LOW,
    requiredDate: "15-07-2026",
    estimatedCost: 350,
    currency: "USD",
    status: GENERAL_REQUEST_STATUSES.UNDER_REVIEW,
  },
];
