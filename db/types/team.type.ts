import z from "zod";

export const UNDER_TEAM = {
  MANAGEMENT: "management",
  BUSINESS_ANALYSIS: "business_analysis",
  DESIGN: "design",
  DEVELOPMENT: "development",
  INFRASTRUCTUR_OPERATION: "infrastructure_operation",
  QUALITY_ASSURANCE: "quality_assurance",
  SUPPORT: "support",
  HIGH_LEVEL: "high_level",
} as const;

export type UnderTeam = (typeof UNDER_TEAM)[keyof typeof UNDER_TEAM];
export const UnderTeamEnum = z.enum([
  UNDER_TEAM.MANAGEMENT,
  UNDER_TEAM.BUSINESS_ANALYSIS,
  UNDER_TEAM.DESIGN,
  UNDER_TEAM.DEVELOPMENT,
  UNDER_TEAM.INFRASTRUCTUR_OPERATION,
  UNDER_TEAM.QUALITY_ASSURANCE,
  UNDER_TEAM.SUPPORT,
  UNDER_TEAM.HIGH_LEVEL,
]);

export const UnderTeamLabel: Record<UnderTeam, string> = {
  [UNDER_TEAM.MANAGEMENT]: "Management",
  [UNDER_TEAM.BUSINESS_ANALYSIS]: "Business Analysis",
  [UNDER_TEAM.DESIGN]: "Design",
  [UNDER_TEAM.DEVELOPMENT]: "Development",
  [UNDER_TEAM.INFRASTRUCTUR_OPERATION]: "Infrastructure Operation",
  [UNDER_TEAM.QUALITY_ASSURANCE]: "Quality Assurance",
  [UNDER_TEAM.SUPPORT]: "Support",
  [UNDER_TEAM.HIGH_LEVEL]: "High Level",
};
