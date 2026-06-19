import { UNDER_TEAM, UnderTeam, UnderTeamLabel } from "@/db/types/team.type";

import { match } from "ts-pattern";

interface UserTeamSwitchProps {
  team: UnderTeam;
}

export function UserTeamSwitch({ team }: UserTeamSwitchProps) {
  return match<UnderTeam>(team)
    .with(UNDER_TEAM.MANAGEMENT, () => (
      <span className="inline-flex items-center justify-center">
        {UnderTeamLabel[UNDER_TEAM.MANAGEMENT]}
      </span>
    ))
    .with(UNDER_TEAM.BUSINESS_ANALYSIS, () => (
      <span className="inline-flex items-center justify-center">
        {UnderTeamLabel[UNDER_TEAM.BUSINESS_ANALYSIS]}
      </span>
    ))
    .with(UNDER_TEAM.DESIGN, () => (
      <span className="inline-flex items-center justify-center">
        {UnderTeamLabel[UNDER_TEAM.DESIGN]}
      </span>
    ))
    .with(UNDER_TEAM.DEVELOPMENT, () => (
      <span className="inline-flex items-center justify-center">
        {UnderTeamLabel[UNDER_TEAM.DEVELOPMENT]}
      </span>
    ))
    .with(UNDER_TEAM.INFRASTRUCTUR_OPERATION, () => (
      <span className="inline-flex items-center justify-center">
        {UnderTeamLabel[UNDER_TEAM.INFRASTRUCTUR_OPERATION]}
      </span>
    ))
    .with(UNDER_TEAM.QUALITY_ASSURANCE, () => (
      <span className="inline-flex items-center justify-center">
        {UnderTeamLabel[UNDER_TEAM.QUALITY_ASSURANCE]}
      </span>
    ))
    .with(UNDER_TEAM.SUPPORT, () => (
      <span className="inline-flex items-center justify-center">
        {UnderTeamLabel[UNDER_TEAM.SUPPORT]}
      </span>
    ))
    .with(UNDER_TEAM.HIGH_LEVEL, () => (
      <span className="inline-flex items-center justify-center">
        {UnderTeamLabel[UNDER_TEAM.HIGH_LEVEL]}
      </span>
    ))

    .exhaustive();
}
