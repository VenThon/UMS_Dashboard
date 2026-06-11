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

import { Check, ListFilter } from "lucide-react";
import { USER_ROLE, UserRole, UserRoleLabels } from "@/db/types/user.type";

export function FilterUsers() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentRole = searchParams.get("role") as UserRole | null;

  const handleGenderChange = (role: UserRole | "") => {
    const params = new URLSearchParams(searchParams);

    if (role) {
      params.set("role", role);
    } else {
      params.delete("role");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          <ListFilter className="h-4 w-4" />
          <span>Filter by Role</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup className="overflow-y-auto h-100">
          <DropdownMenuItem
            onClick={() => handleGenderChange("")}
            className="flex items-center gap-2 "
          >
            {currentRole === null && <Check className="h-4 w-4" />}
            <span>All</span>
          </DropdownMenuItem>

          {Object.values(USER_ROLE).map((role) => {
            const labels = UserRoleLabels[role];
            return (
              <DropdownMenuItem
                key={role}
                onClick={() => handleGenderChange(role)}
                className="flex items-center gap-2"
              >
                {currentRole === role && <Check className="h-4 w-4" />}
                <span>{labels}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
