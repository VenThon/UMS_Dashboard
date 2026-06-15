import { USER_ROLE } from "@/db/types/user.type";

const developmentDashboard = "/dashboard/developments/statistics";
const businessAndAnalysisDashboard = "/dashboard/business-analysis/statistics";
const ctoDashboard = "/dashboard/cto/statistics";
const designDashboard = "/dashboard/design/statistics";
const infrastructureAndOperationDashboard =
  "/dashboard/infrastructure-operation/statistics";
const managementDashboard = "/dashboard/managements/statistics";
const qualityAndassuranceDashboard = "/dashboard/quality-assurance/statistics";
const suportDashboard = "/dashboard/support/statistics";

const developmentSettings = "/dashboard/developments/settings";
const businessAndAnalysisSettings = "/dashboard/business-analysis/settings";
const ctoSettings = "/dashboard/cto/settings";
const designSettings = "/dashboard/design/settings";
const infrastructureAndOperationSettings =
  "/dashboard/infrastructure-operation/settings";
const managementSettings = "/dashboard/managements/settings";
const qualityAndassuranceSettings = "/dashboard/quality-assurance/settings";
const supportSettings = "/dashboard/support/settings";

export const roleRoutes: Record<string, string> = {
  [USER_ROLE.ADMIN]: "/dashboard/admin/statistics",
  [USER_ROLE.LEAD_BACKEND]: developmentDashboard,
  [USER_ROLE.LEAD_FRONTEND]: developmentDashboard,
  [USER_ROLE.FRONTEND_DEVELOPER]: developmentDashboard,
  [USER_ROLE.BACKEND_DEVELOPER]: developmentDashboard,
  [USER_ROLE.FULLSTACK_DEVELOPER]: developmentDashboard,
  [USER_ROLE.MOBILE_DEVELOPER]: developmentDashboard,
  [USER_ROLE.BUSINESS_ANALYSIS]: businessAndAnalysisDashboard,
  [USER_ROLE.SYSTEM_ANALYSIS]: businessAndAnalysisDashboard,
  [USER_ROLE.PRODUCT_OWNER]: businessAndAnalysisDashboard,
  [USER_ROLE.CTO]: ctoDashboard,
  [USER_ROLE.UX_UI_DESIGNER]: designDashboard,
  [USER_ROLE.GRAPHIC_DESIGNER]: designDashboard,
  [USER_ROLE.LEAD_INFRASTRUCTUR]: infrastructureAndOperationDashboard,
  [USER_ROLE.DEVOPS_ENGINEER]: infrastructureAndOperationDashboard,
  [USER_ROLE.CLOUD_ENGINEER]: infrastructureAndOperationDashboard,
  [USER_ROLE.DATABASE_ADMINISTRARION]: infrastructureAndOperationDashboard,
  [USER_ROLE.NETWORK_ENGINEER]: infrastructureAndOperationDashboard,
  [USER_ROLE.SECURITY_ENGINEER]: infrastructureAndOperationDashboard,
  [USER_ROLE.IT_MANAGER]: managementDashboard,
  [USER_ROLE.PROJECT_MANAGER]: managementDashboard,
  [USER_ROLE.QUALITY_ASSURANCE]: qualityAndassuranceDashboard,
  [USER_ROLE.IT_SUPPORT]: suportDashboard,
  [USER_ROLE.HELPDESK_OFFICER]: suportDashboard,
};

export const roleSettingRoutes: Record<string, string> = {
  [USER_ROLE.ADMIN]: "/dashboard/admin/settings",
  [USER_ROLE.LEAD_BACKEND]: developmentSettings,
  [USER_ROLE.LEAD_FRONTEND]: developmentSettings,
  [USER_ROLE.FRONTEND_DEVELOPER]: developmentSettings,
  [USER_ROLE.BACKEND_DEVELOPER]: developmentSettings,
  [USER_ROLE.FULLSTACK_DEVELOPER]: developmentSettings,
  [USER_ROLE.MOBILE_DEVELOPER]: developmentSettings,
  [USER_ROLE.BUSINESS_ANALYSIS]: businessAndAnalysisSettings,
  [USER_ROLE.SYSTEM_ANALYSIS]: businessAndAnalysisSettings,
  [USER_ROLE.PRODUCT_OWNER]: businessAndAnalysisSettings,
  [USER_ROLE.CTO]: ctoSettings,
  [USER_ROLE.UX_UI_DESIGNER]: designSettings,
  [USER_ROLE.GRAPHIC_DESIGNER]: designSettings,
  [USER_ROLE.LEAD_INFRASTRUCTUR]: infrastructureAndOperationSettings,
  [USER_ROLE.DEVOPS_ENGINEER]: infrastructureAndOperationSettings,
  [USER_ROLE.CLOUD_ENGINEER]: infrastructureAndOperationSettings,
  [USER_ROLE.DATABASE_ADMINISTRARION]: infrastructureAndOperationSettings,
  [USER_ROLE.NETWORK_ENGINEER]: infrastructureAndOperationSettings,
  [USER_ROLE.SECURITY_ENGINEER]: infrastructureAndOperationSettings,
  [USER_ROLE.IT_MANAGER]: managementSettings,
  [USER_ROLE.PROJECT_MANAGER]: managementSettings,
  [USER_ROLE.QUALITY_ASSURANCE]: qualityAndassuranceSettings,
  [USER_ROLE.IT_SUPPORT]: supportSettings,
  [USER_ROLE.HELPDESK_OFFICER]: supportSettings,
};
