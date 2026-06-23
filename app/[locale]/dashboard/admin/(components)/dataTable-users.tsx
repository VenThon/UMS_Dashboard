"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User } from "@/db/schema";
import { UnderTeam } from "@/db/types/team.type";
import { USER_ROLE, UserRole } from "@/db/types/user.type";
import { Link } from "@/i18n/navigation";

import { ColumnDef } from "@tanstack/react-table";
import { SquarePen } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

import { DeleteUserDialog } from "./delete-user-dialog";
import { getCountryCode } from "./get-country-code";
import { UserRoleSwitch } from "./user-role-switch";
import { UserTeamSwitch } from "./user-team-switch";
import { ViewDetailUserDialog } from "./user-view-detail-dialog";

export const columnsDataTableUsers: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: () => <div className="ml-2">Nº</div>,
    enableHiding: false,
    cell: ({ row, table }) => {
      return (
        <div className="ml-2">
          {(table
            .getSortedRowModel()
            ?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1}
        </div>
      );
    },
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => {
      return <section>{row.original.username}</section>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <section>{row.original.email}</section>;
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => {
      const phoneNumber = row.original.phoneNumber;
      if (!phoneNumber) {
        return "-";
      }
      const countryCode = getCountryCode(phoneNumber);

      return (
        <div className="flex items-center gap-2">
          {countryCode?.country && (
            <ReactCountryFlag
              countryCode={countryCode?.country}
              svg
              style={{
                width: "1.25rem",
                height: "1.25rem",
              }}
            />
          )}
          <span>{countryCode?.formatInternational()}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "team",
    header: "Team",
    cell: ({ row }) => {
      return (
        <section>
          {<UserTeamSwitch team={row.original.team as UnderTeam} />}
        </section>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Position",
    cell: ({ row }) => {
      return (
        <section>
          {<UserRoleSwitch role={row.original.role as UserRole} />}
        </section>
      );
    },
  },
  {
    id: "actions",
    header: () => <span className="flex justify-center">Actions</span>,
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <section className="flex items-center justify-center gap-1.5">
          {row.original.role !== USER_ROLE.ADMIN && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    aria-label="View User"
                    className="bg-blue-600 text-white hover:bg-blue-500"
                  >
                    <ViewDetailUserDialog id={row.original.id} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View User</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    size="icon"
                    aria-label="Edit User"
                    className="bg-[#058248] text-white hover:bg-green-600"
                  >
                    <Link href={`/dashboard/admin/users/${row.original.id}`}>
                      <SquarePen className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit info</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    aria-label="Delete User"
                    variant="destructive"
                  >
                    <DeleteUserDialog id={row.original.id} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete User</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}
        </section>
      );
    },
  },
];
