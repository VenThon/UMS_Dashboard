import { USER_ROLE, UserRole } from "@/db/types/user.type";

export const CREATE_REQUEST_LEAVE_ROLES = [
  USER_ROLE.FRONTEND_DEVELOPER,
  USER_ROLE.BACKEND_DEVELOPER,
  USER_ROLE.FULLSTACK_DEVELOPER,
  USER_ROLE.LEAD_FRONTEND,
  USER_ROLE.LEAD_BACKEND,
] as const;

export const VIEW_REQUEST_LEAVE_ROLES = [
  USER_ROLE.FRONTEND_DEVELOPER,
  USER_ROLE.BACKEND_DEVELOPER,
  USER_ROLE.FULLSTACK_DEVELOPER,
  USER_ROLE.LEAD_FRONTEND,
  USER_ROLE.IT_MANAGER,
  USER_ROLE.LEAD_BACKEND,
] as const;

export const REVIEW_REQUEST_LEAVE_ROLES = [
  USER_ROLE.LEAD_FRONTEND,
  USER_ROLE.IT_MANAGER,
] as const;

export function getRequestLeaveApprovalLevel(role: UserRole): 1 | 2 | null {
  if (role === USER_ROLE.LEAD_FRONTEND) {
    return 1;
  }

  if (role === USER_ROLE.IT_MANAGER) {
    return 2;
  }

  return null;
}

export const REVIEW_GENERAL_REQUEST_ROLES = [
  USER_ROLE.LEAD_FRONTEND,
  USER_ROLE.IT_MANAGER,
] as const;

export function getGeneralRequestApprovalLevel(role: UserRole): 1 | 2 | null {
  if (role === USER_ROLE.LEAD_FRONTEND) {
    return 1;
  }

  if (role === USER_ROLE.IT_MANAGER) {
    return 2;
  }

  return null;
}

export function isUserRole(role: string): role is UserRole {
  return Object.values(USER_ROLE).includes(role as UserRole);
}

export const CREATE_GENERAL_REQUEST_ROLES = [
  USER_ROLE.FRONTEND_DEVELOPER,
  USER_ROLE.BACKEND_DEVELOPER,
  USER_ROLE.FULLSTACK_DEVELOPER,
  USER_ROLE.LEAD_FRONTEND,
  USER_ROLE.LEAD_BACKEND,
] as const;
