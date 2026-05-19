import z from "zod";

export const USER_ROLE = {
    IT_MANAGER: "it_manager",
    PROJECT_MANAGER: "project_manager",
    BUSINESS_ANALYSIS: "business_analysis",
    SYSTEM_ANALYSIS: "system_analysis",
    PRODUCT_OWNER: "product_owner",
    UX_UI_DESIGNER: "ux_ui_designer",
    GRAPHIC_DESIGNER: "graphic_designer",
    TEAM_LEAD_FRONTEND: "team_lead_frontend",
    TEAM_LEAD_BACKEND: "team_lead_backend",
    FRONTEND_DEVELOPER: "frontend_developer",
    BACKEND_DEVELOPER: "backend_developer",
    FULLSTACK_DEVELOPER: "fullstack_developer",
    MOBILE_DEVELOPER: "mobile_developer",
    DEVEOPS_ENGINEER: "devops_engineer",
    CLOUD_ENGINEER: "cloud_engineer",
    DATABASE_ADMINISTRARION: "database_administrator",
    NETWORK_ENGINEER: "network_engineer",
    SECURITY_ENGINEER: "security_engineer",
    QUALITY_ASSURANCE: "quality_assurance",
    IT_SUPPORT: "it_support",
    HELPDESK_OFFICER: "helpdesk_officer"
} as const;

export type UserRole =(typeof USER_ROLE)[keyof typeof USER_ROLE]

export const UserRoleEnum = z.enum([
    USER_ROLE.IT_MANAGER,
    USER_ROLE.PROJECT_MANAGER,
    USER_ROLE.BUSINESS_ANALYSIS,
    USER_ROLE.SYSTEM_ANALYSIS,
    USER_ROLE.PRODUCT_OWNER,
    USER_ROLE.UX_UI_DESIGNER,
    USER_ROLE.GRAPHIC_DESIGNER,
    USER_ROLE.TEAM_LEAD_FRONTEND,
    USER_ROLE.TEAM_LEAD_BACKEND,
    USER_ROLE.FRONTEND_DEVELOPER,
    USER_ROLE.BACKEND_DEVELOPER,
    USER_ROLE.MOBILE_DEVELOPER,
    USER_ROLE.FULLSTACK_DEVELOPER,
    USER_ROLE.DEVEOPS_ENGINEER,
    USER_ROLE.CLOUD_ENGINEER,
    USER_ROLE.DATABASE_ADMINISTRARION,
    USER_ROLE.NETWORK_ENGINEER,
    USER_ROLE.SECURITY_ENGINEER,
    USER_ROLE.QUALITY_ASSURANCE,
    USER_ROLE.IT_SUPPORT,
    USER_ROLE.HELPDESK_OFFICER
])