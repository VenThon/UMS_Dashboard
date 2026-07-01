"use client";

import { RequestLeaveProps } from "@/app/[locale]/mock/development-team";
import { LeaveTypesBadge } from "@/components/badge/leave-types";
import { RequestLeaveStatusBadge } from "@/components/badge/status-request-leave";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, SquarePen } from "lucide-react";

export const columnsDataTableRequestLeaveDevelopmentTeam: ColumnDef<RequestLeaveProps>[] =
  [
    {
      accessorKey: "id",
      header: () => <div className="ml-2">Nº</div>,
      enableHiding: false,
      cell: ({ row, table }) => {
        return (
          <div className="ml-2">
            {(table
              .getSortedRowModel()
              ?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) +
              1}
          </div>
        );
      },
    },
    {
      accessorKey: "leaveType",
      header: "Leave Type",
      cell: ({ row }) => {
        return (
          <section>
            <LeaveTypesBadge status={row.original.leaveType} />
          </section>
        );
      },
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) => {
        return <section>{row.original.startDate}</section>;
      },
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) => {
        return <section>{row.original.endDate}</section>;
      },
    },
    {
      accessorKey: "durationDays",
      header: "Duration",
      cell: ({ row }) => {
        return <section>{row.original.durationDays}</section>;
      },
    },
    {
      accessorKey: "reason",
      header: "Reason",
      cell: ({ row }) => {
        return <section>{row.original.reason}</section>;
      },
    },
    {
      accessorKey: "status",
      header: "Request Status",
      cell: ({ row }) => {
        return (
          <section>
            <RequestLeaveStatusBadge status={row.original.status} />
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
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    aria-label="View Report"
                    className="bg-blue-600 p-2 text-white hover:bg-blue-500"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Report</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    aria-label="Edit Report"
                    className="bg-[#058248] text-white hover:bg-green-600"
                  >
                    <SquarePen className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit Report</p>
                </TooltipContent>
              </Tooltip>
            </>
          </section>
        );
      },
    },
  ];
