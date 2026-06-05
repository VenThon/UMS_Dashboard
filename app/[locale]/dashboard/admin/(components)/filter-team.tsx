"use client";

import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "@/i18n/navigation";

import { ArrowDownToLine, Check } from "lucide-react";
import { UNDER_TEAM, UnderTeam, UnderTeamLabel } from "@/db/types/team.type";

export function FilterByTeam() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTeam = searchParams.get("team") as UnderTeam | null;

  const handleGenderChange = (team: UnderTeam | "") => {
    const params = new URLSearchParams(searchParams);

    if (team) {
      params.set("team", team);
    } else {
      params.delete("team");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <ArrowDownToLine className="w-4 h-4" />
          <span>Filter by Team</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => handleGenderChange("")}
            className="flex items-center gap-2 "
          >
            {currentTeam === null && <Check className="h-4 w-4" />}
            <span>All</span>
          </DropdownMenuItem>

          {Object.values(UNDER_TEAM).map((team) => {
            const labels = UnderTeamLabel[team];
            return (
              <DropdownMenuItem
                key={team}
                onClick={() => handleGenderChange(team)}
                className="flex items-center gap-2"
              >
                {currentTeam === team && <Check className="h-4 w-4" />}
                <span>{labels}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
