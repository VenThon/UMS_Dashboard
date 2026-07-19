"use client";

import { useState } from "react";

import { LeaveTypesBadge } from "@/components/badge/leave-types";
import { RequestLeaveStatusBadge } from "@/components/badge/status-request-leave";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LEAVE_DURATION_LABELS,
  REQUEST_LEAVE_STATUS,
} from "@/db/constants/request-leave-status";
import { RequestLeaveItem } from "@/service/leave-request/leave-request.service";

import type { ColumnDef } from "@tanstack/react-table";
import {
  Ban,
  CheckCircle2,
  Eye,
  RotateCcw,
  SquarePen,
  Trash2,
  XCircle,
} from "lucide-react";

import { ApproveRequestLeaveDialog } from "./approve-request-leave-dialog";
import { CancelRequestLeaveDialog } from "./cancel-request-leave";
import { DeleteRequestLeaveDialog } from "./delete-request-leave-dialog";
import { EditRequestLeaveDialog } from "./edit-request-leave-dialog";
import { RejectRequestLeaveDialog } from "./reject-request-leave-dialog";
import { ResubmitRequestLeaveDialog } from "./resubmit-request-leave-dialog";
import { ViewRequestLeaveDialog } from "./view-request-leave-dialog";

type RequestLeaveActionsProps = {
  item: RequestLeaveItem;
  currentUserId: string;
  approvalLevel: 1 | 2 | null;
};

export function RequestLeaveActions({
  item,
  currentUserId,
  approvalLevel,
}: RequestLeaveActionsProps) {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isResubmitOpen, setIsResubmitOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const isOwner = item.userId === currentUserId;
  const canEdit =
    isOwner && item.status === REQUEST_LEAVE_STATUS.PENDING_FIRST_APPROVAL;

  const canDelete =
    isOwner && item.status === REQUEST_LEAVE_STATUS.PENDING_FIRST_APPROVAL;

  const canCancel =
    isOwner &&
    (item.status === REQUEST_LEAVE_STATUS.PENDING_FIRST_APPROVAL ||
      item.status === REQUEST_LEAVE_STATUS.PENDING_SECOND_APPROVAL);

  const canResubmit = isOwner && item.status === REQUEST_LEAVE_STATUS.REJECTED;

  const canApprove =
    (approvalLevel === 1 &&
      item.status === REQUEST_LEAVE_STATUS.PENDING_FIRST_APPROVAL) ||
    (approvalLevel === 2 &&
      item.status === REQUEST_LEAVE_STATUS.PENDING_SECOND_APPROVAL);

  const canReject = canApprove;
  return (
    <>
      <div className="flex items-center justify-center gap-1.5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant="outline"
              aria-label="View leave request details"
              className="text-muted-foreground hover:bg-muted hover:text-foreground size-8"
              onClick={() => setIsViewOpen(true)}
            >
              <Eye className="size-4" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <p>View details</p>
          </TooltipContent>
        </Tooltip>

        {canEdit && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="outline"
                aria-label="Edit leave request"
                className="size-8 border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800 dark:border-amber-900/60 dark:text-amber-400 dark:hover:bg-amber-950/50"
                onClick={() => setIsEditOpen(true)}
              >
                <SquarePen className="size-4" />
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>Edit leave request</p>
            </TooltipContent>
          </Tooltip>
        )}
        {canDelete && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="outline"
                aria-label="Delete leave request"
                className="size-8 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/50"
                onClick={() => setIsDeleteOpen(true)}
              >
                <Trash2 className="size-4" />
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>Delete leave request</p>
            </TooltipContent>
          </Tooltip>
        )}
        {canCancel && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="outline"
                aria-label="Cancel leave request"
                className="size-8 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={() => setIsCancelOpen(true)}
              >
                <Ban className="size-4" />
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>Cancel leave request</p>
            </TooltipContent>
          </Tooltip>
        )}
        {canApprove && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="outline"
                aria-label="Approve leave request"
                className="size-8 border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 dark:border-green-900/60 dark:text-green-400 dark:hover:bg-green-950/50"
                onClick={() => setIsApproveOpen(true)}
              >
                <CheckCircle2 className="size-4" />
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>Approve leave request</p>
            </TooltipContent>
          </Tooltip>
        )}
        {canReject && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="outline"
                aria-label="Reject leave request"
                className="size-8 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/50"
                onClick={() => setIsRejectOpen(true)}
              >
                <XCircle className="size-4" />
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>Reject leave request</p>
            </TooltipContent>
          </Tooltip>
        )}
        {canResubmit && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="outline"
                aria-label="Resubmit leave request"
                className="size-8 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 dark:border-blue-900/60 dark:text-blue-400 dark:hover:bg-blue-950/50"
                onClick={() => setIsResubmitOpen(true)}
              >
                <RotateCcw className="size-4" />
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>Resubmit leave request</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      <ViewRequestLeaveDialog
        requestLeaveId={item.id}
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
      />

      <EditRequestLeaveDialog
        requestLeaveId={item.id}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
      <DeleteRequestLeaveDialog
        requestLeaveId={item.id}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
      <CancelRequestLeaveDialog
        requestLeaveId={item.id}
        open={isCancelOpen}
        onOpenChange={setIsCancelOpen}
      />
      <ApproveRequestLeaveDialog
        requestLeaveId={item.id}
        open={isApproveOpen}
        onOpenChange={setIsApproveOpen}
      />

      <RejectRequestLeaveDialog
        requestLeaveId={item.id}
        open={isRejectOpen}
        onOpenChange={setIsRejectOpen}
      />

      <ResubmitRequestLeaveDialog
        requestLeaveId={item.id}
        open={isResubmitOpen}
        onOpenChange={setIsResubmitOpen}
      />
    </>
  );
}

export function getcolumnsDataTableRequestLeaveDevelopmentTeam(
  currentUserId: string,
  approvalLevel: 1 | 2 | null,
): ColumnDef<RequestLeaveItem>[] {
  return [
    {
      id: "number",
      header: () => <div className="ml-2">Nº</div>,
      enableHiding: false,
      cell: ({ row }) => <div className="ml-2">{row.index + 1}</div>,
    },
    {
      accessorKey: "leaveType",
      header: "Leave Type",
      cell: ({ row }) => <LeaveTypesBadge status={row.original.leaveType} />,
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) => <span>{row.original.startDate}</span>,
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) => <span>{row.original.endDate}</span>,
    },
    {
      accessorKey: "durationType",
      header: "Duration",
      cell: ({ row }) => (
        <span>{LEAVE_DURATION_LABELS[row.original.durationType]}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Request Status",
      cell: ({ row }) => (
        <RequestLeaveStatusBadge status={row.original.status} />
      ),
    },
    {
      id: "actions",
      header: () => <span className="flex justify-center">Actions</span>,
      enableHiding: false,
      cell: ({ row }) => (
        <RequestLeaveActions
          item={row.original}
          currentUserId={currentUserId}
          approvalLevel={approvalLevel}
        />
      ),
    },
  ];
}
