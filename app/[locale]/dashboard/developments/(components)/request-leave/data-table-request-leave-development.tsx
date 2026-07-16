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
                    type="button"
                    size="icon"
                    variant="outline"
                    aria-label="View report details"
                    className="text-muted-foreground hover:bg-muted hover:text-foreground size-8"
                  >
                    <Eye className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Report</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    aria-label="Update report"
                    className="size-8 border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800 dark:border-amber-900/60 dark:text-amber-400 dark:hover:bg-amber-950/50"
                  >
                    <SquarePen className="size-4" />
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
