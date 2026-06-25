"use client";

import { dataProps } from "@/app/[locale]/mock/development-team";
import { ReportTypesStatusBadge } from "@/components/badge/status-report";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, SquarePen } from "lucide-react";

export const columnsDataTableDevelopmentTeam: ColumnDef<dataProps>[] = [
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
    accessorKey: "projectName",
    header: "Project Name",
    cell: ({ row }) => {
      return <section>{row.original.projectName}</section>;
    },
  },
  {
    accessorKey: "reportDate",
    header: "Report Date",
    cell: ({ row }) => {
      return <section>{row.original.reportDate}</section>;
    },
  },
  {
    accessorKey: "previousTasks",
    header: "Previous Task",
    cell: ({ row }) => {
      return <section>{row.original.previousTasks}</section>;
    },
  },
  {
    accessorKey: "completedTasks",
    header: "Commpleted Task",
    cell: ({ row }) => {
      return <section>{row.original.completedTasks}</section>;
    },
  },
  {
    accessorKey: "inProgressTasks",
    header: "In Progess Task",
    cell: ({ row }) => {
      return <section>{row.original.inProgressTasks}</section>;
    },
  },
  {
    accessorKey: "blockers",
    header: "Bloacked Task",
    cell: ({ row }) => {
      return <section>{row.original.blockers}</section>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <section>
          <ReportTypesStatusBadge status={row.original.status} />
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
