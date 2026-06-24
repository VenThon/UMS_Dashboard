"use client";

import { GeneralRequestProps } from "@/app/[locale]/mock/development-team";
import {
  GeneralRequestStatusBadge,
  RequestPriorityBadge,
} from "@/components/badge/general-request-status";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GENERAL_REQUEST_TYPE_LABELS } from "@/db/constants/general-request";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, SquarePen } from "lucide-react";

export const columnsDataTableGeneralRequestDevelopmentTeam: ColumnDef<GeneralRequestProps>[] =
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
      accessorKey: "requestType",
      header: "Request Type",
      cell: ({ row }) => {
        return (
          <section>
            {GENERAL_REQUEST_TYPE_LABELS[row.original.requestType]}
          </section>
        );
      },
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        return (
          <section>
            <RequestPriorityBadge priority={row.original.priority} />
          </section>
        );
      },
    },
    {
      accessorKey: "requiredDate",
      header: "Required Date",
      cell: ({ row }) => {
        return <section>{row.original.requiredDate}</section>;
      },
    },
    {
      accessorKey: "estimatedCost",
      header: "Estimated Cost",
      cell: ({ row }) => {
        return <section>{row.original.estimatedCost}</section>;
      },
    },
    {
      accessorKey: "status",
      header: "Request Status",
      cell: ({ row }) => {
        return (
          <section>
            <GeneralRequestStatusBadge status={row.original.status} />
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
