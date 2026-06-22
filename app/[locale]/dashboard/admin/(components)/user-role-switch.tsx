import { USER_ROLE, UserRole, UserRoleLabels } from "@/db/types/user.type";

import { match } from "ts-pattern";

interface UserRoleSwitchProps {
  role: UserRole;
}

export function UserRoleSwitch({ role }: UserRoleSwitchProps) {
  return match<UserRole>(role)
    .with(USER_ROLE.ADMIN, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.ADMIN]}
      </span>
    ))
    .with(USER_ROLE.IT_MANAGER, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.IT_MANAGER]}
      </span>
    ))
    .with(USER_ROLE.PROJECT_MANAGER, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.PROJECT_MANAGER]}
      </span>
    ))
    .with(USER_ROLE.BUSINESS_ANALYSIS, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.BUSINESS_ANALYSIS]}
      </span>
    ))
    .with(USER_ROLE.SYSTEM_ANALYSIS, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.SYSTEM_ANALYSIS]}
      </span>
    ))
    .with(USER_ROLE.PRODUCT_OWNER, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.PRODUCT_OWNER]}
      </span>
    ))
    .with(USER_ROLE.UX_UI_DESIGNER, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.UX_UI_DESIGNER]}
      </span>
    ))
    .with(USER_ROLE.GRAPHIC_DESIGNER, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.GRAPHIC_DESIGNER]}
      </span>
    ))
    .with(USER_ROLE.LEAD_FRONTEND, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.LEAD_FRONTEND]}
      </span>
    ))
    .with(USER_ROLE.LEAD_BACKEND, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.LEAD_BACKEND]}
      </span>
    ))
    .with(USER_ROLE.FRONTEND_DEVELOPER, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.FRONTEND_DEVELOPER]}
      </span>
    ))
    .with(USER_ROLE.BACKEND_DEVELOPER, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.BACKEND_DEVELOPER]}
      </span>
    ))
    .with(USER_ROLE.FULLSTACK_DEVELOPER, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.FULLSTACK_DEVELOPER]}
      </span>
    ))
    .with(USER_ROLE.MOBILE_DEVELOPER, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.MOBILE_DEVELOPER]}
      </span>
    ))
    .with(USER_ROLE.LEAD_INFRASTRUCTUR, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.LEAD_INFRASTRUCTUR]}
      </span>
    ))
    .with(USER_ROLE.DEVOPS_ENGINEER, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.DEVOPS_ENGINEER]}
      </span>
    ))
    .with(USER_ROLE.CLOUD_ENGINEER, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.CLOUD_ENGINEER]}
      </span>
    ))
    .with(USER_ROLE.DATABASE_ADMINISTRARION, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.DATABASE_ADMINISTRARION]}
      </span>
    ))
    .with(USER_ROLE.NETWORK_ENGINEER, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.NETWORK_ENGINEER]}
      </span>
    ))
    .with(USER_ROLE.SECURITY_ENGINEER, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.SECURITY_ENGINEER]}
      </span>
    ))
    .with(USER_ROLE.QUALITY_ASSURANCE, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.QUALITY_ASSURANCE]}
      </span>
    ))
    .with(USER_ROLE.IT_SUPPORT, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.IT_SUPPORT]}
      </span>
    ))
    .with(USER_ROLE.HELPDESK_OFFICER, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.HELPDESK_OFFICER]}
      </span>
    ))
    .with(USER_ROLE.CTO, () => (
      <span className="inline-flex items-center justify-center">
        {UserRoleLabels[USER_ROLE.CTO]}
      </span>
    ))

    .exhaustive();
}
