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
import {
  REQUEST_STATUS,
  Requeststatus,
  Requeststatuslabel,
} from "@/db/types/status.type";

export function FilterReportDevelopmentTeam() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") as Requeststatus | null;

  const handleGenderChange = (status: Requeststatus | "") => {
    const params = new URLSearchParams(searchParams);

    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          <ListFilter className="h-4 w-4" />
          <span>Filter by Status</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup className="w-">
          <DropdownMenuItem
            onClick={() => handleGenderChange("")}
            className="flex items-center gap-2"
          >
            {currentStatus === null && <Check className="h-4 w-4" />}
            <span>All</span>
          </DropdownMenuItem>

          {Object.values(REQUEST_STATUS).map((status) => {
            const labels = Requeststatuslabel[status];
            return (
              <DropdownMenuItem
                key={status}
                onClick={() => handleGenderChange(status)}
                className="flex items-center gap-2"
              >
                {currentStatus === status && <Check className="h-4 w-4" />}
                <span>{labels}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
