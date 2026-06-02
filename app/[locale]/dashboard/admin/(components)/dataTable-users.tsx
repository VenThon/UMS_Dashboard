"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User } from "@/db/schema";
import { Link } from "@/i18n/navigation";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, SquarePen, Trash2 } from "lucide-react";

// import { StaffDeleteAlertDialog } from "../staff/delete/staff-delete-dialog";
// import { StaffViewDetailDialog } from "../staff/view/staff-view-dialog";

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
      return <section>{row.original.phoneNumber}</section>;
    },
  },
  {
    accessorKey: "team",
    header: "Team",
    cell: ({ row }) => {
      return <section>{row.original.team}</section>;
    },
  },
  {
    accessorKey: "role",
    header: "Position",
    cell: ({ row }) => {
      return <section>{row.original.role}</section>;
    },
  },
  {
    id: "actions",
    header: () => <span className="flex justify-center">Actions</span>,
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <section className="flex items-center gap-1.5 justify-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                size="icon"
                aria-label="View User"
                className="bg-blue-600 text-white hover:bg-blue-500"
              >
                <Link href={`/dashboard/staff/view/${row.original.id}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {/* <Link href={`/dashboard/admin/users/view/${row.original.id}`}></Link> */}
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
                <Link href={`/dashboard/staff/edit/${row.original.id}`}>
                  <SquarePen className="h-4 w-4" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {/* <Link href={`/dashboard/admin/users/edit/${row.original.id}`}></Link> */}
              <p>Edit User</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                aria-label="Delete User"
                variant="destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete User</p>
            </TooltipContent>
          </Tooltip>

          <div>{/* <StaffViewDetailDialog data={row.original} /> */}</div>
          <div>{/* <StaffDeleteAlertDialog /> */}</div>
        </section>
      );
    },
  },
];
