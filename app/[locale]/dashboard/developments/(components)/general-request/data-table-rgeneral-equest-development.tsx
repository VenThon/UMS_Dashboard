"use client";

import {
  GeneralRequestStatusBadge,
  GeneralRequestTypeBadge,
  RequestPriorityBadge,
} from "@/components/badge/general-request-status";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GENERAL_REQUEST_STATUS } from "@/db/constants/general-request";

import type { ColumnDef } from "@tanstack/react-table";
import { Ban, Check, Eye, RotateCcw, SquarePen, Trash2, X } from "lucide-react";

import { GeneralRequestItem } from "../../general-request/_hooks/general-request-types";

type GeneralRequestColumnOptions = {
  currentUserId: string;
  approvalLevel: 1 | 2 | null;
  onView: (item: GeneralRequestItem) => void;
  onEdit: (item: GeneralRequestItem) => void;
  onDelete: (item: GeneralRequestItem) => void;
  onCancel: (item: GeneralRequestItem) => void;
  onApprove: (item: GeneralRequestItem) => void;
  onReject: (item: GeneralRequestItem) => void;
  onResubmit: (item: GeneralRequestItem) => void;
};

export function getColumnsDataTableGeneralRequestDevelopmentTeam({
  currentUserId,
  approvalLevel,
  onView,
  onEdit,
  onDelete,
  onCancel,
  onApprove,
  onReject,
  onResubmit,
}: GeneralRequestColumnOptions): ColumnDef<GeneralRequestItem>[] {
  return [
    {
      id: "number",
      header: () => <div className="ml-2">Nº</div>,
      enableHiding: false,
      cell: ({ row, table }) => {
        const rowIndex = table
          .getSortedRowModel()
          .flatRows.findIndex((flatRow) => flatRow.id === row.id);

        return <div className="ml-2">{rowIndex + 1}</div>;
      },
    },
    {
      accessorKey: "requestType",
      header: "Request Type",
      cell: ({ row }) => (
        <span>
          <GeneralRequestTypeBadge requestType={row.original.requestType} />
        </span>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="max-w-64">
          <p className="truncate font-medium">{row.original.title}</p>
        </div>
      ),
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => (
        <RequestPriorityBadge priority={row.original.priority} />
      ),
    },
    {
      accessorKey: "requiredDate",
      header: "Required Date",
      cell: ({ row }) => (
        <span>
          {row.original.requiredDate
            ? formatDisplayDate(row.original.requiredDate)
            : "—"}
        </span>
      ),
    },
    {
      accessorKey: "estimatedCost",
      header: "Estimated Cost",
      cell: ({ row }) => (
        <span>
          {formatEstimatedCost(
            row.original.estimatedCost,
            row.original.currency,
          )}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Request Status",
      cell: ({ row }) => (
        <GeneralRequestStatusBadge status={row.original.status} />
      ),
    },
    {
      id: "actions",
      header: () => <span className="flex justify-center">Actions</span>,
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;
        const isOwner = item.userId === currentUserId;

        const canEdit =
          isOwner &&
          (item.status === GENERAL_REQUEST_STATUS.DRAFT ||
            item.status === GENERAL_REQUEST_STATUS.PENDING_FIRST_APPROVAL);

        const canDelete =
          isOwner &&
          item.status === GENERAL_REQUEST_STATUS.PENDING_FIRST_APPROVAL;

        const canCancel =
          isOwner &&
          item.status === GENERAL_REQUEST_STATUS.PENDING_FIRST_APPROVAL;

        const canResubmit =
          isOwner && item.status === GENERAL_REQUEST_STATUS.REJECTED;

        const canReviewFirstLevel =
          approvalLevel === 1 &&
          item.status === GENERAL_REQUEST_STATUS.PENDING_FIRST_APPROVAL;

        const canReviewSecondLevel =
          approvalLevel === 2 &&
          item.status === GENERAL_REQUEST_STATUS.PENDING_SECOND_APPROVAL;

        const canApprove = canReviewFirstLevel || canReviewSecondLevel;

        const canReject = canApprove;

        return (
          <div className="flex items-center justify-center gap-1.5">
            <ActionButton
              label="View Request"
              ariaLabel="View general request details"
              onClick={() => onView(item)}
            >
              <Eye className="size-4" />
            </ActionButton>

            {canEdit && (
              <ActionButton
                label="Edit Request"
                ariaLabel="Edit general request"
                className="border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800 dark:border-amber-900/60 dark:text-amber-400 dark:hover:bg-amber-950/50"
                onClick={() => onEdit(item)}
              >
                <SquarePen className="size-4" />
              </ActionButton>
            )}

            {canApprove && (
              <ActionButton
                label="Approve Request"
                ariaLabel="Approve general request"
                className="border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 dark:border-green-900/60 dark:text-green-400 dark:hover:bg-green-950/50"
                onClick={() => onApprove(item)}
              >
                <Check className="size-4" />
              </ActionButton>
            )}

            {canReject && (
              <ActionButton
                label="Reject Request"
                ariaLabel="Reject general request"
                className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/50"
                onClick={() => onReject(item)}
              >
                <X className="size-4" />
              </ActionButton>
            )}

            {canResubmit && (
              <ActionButton
                label="Resubmit Request"
                ariaLabel="Resubmit general request"
                className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 dark:border-blue-900/60 dark:text-blue-400 dark:hover:bg-blue-950/50"
                onClick={() => onResubmit(item)}
              >
                <RotateCcw className="size-4" />
              </ActionButton>
            )}

            {canCancel && (
              <ActionButton
                label="Cancel Request"
                ariaLabel="Cancel general request"
                className="border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800 dark:border-orange-900/60 dark:text-orange-400 dark:hover:bg-orange-950/50"
                onClick={() => onCancel(item)}
              >
                <Ban className="size-4" />
              </ActionButton>
            )}

            {canDelete && (
              <ActionButton
                label="Delete Request"
                ariaLabel="Delete general request"
                className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/50"
                onClick={() => onDelete(item)}
              >
                <Trash2 className="size-4" />
              </ActionButton>
            )}
          </div>
        );
      },
    },
  ];
}

type ActionButtonProps = {
  label: string;
  ariaLabel: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
};

function ActionButton({
  label,
  ariaLabel,
  onClick,
  className,
  children,
}: ActionButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant="outline"
          aria-label={ariaLabel}
          className={`size-8 ${className ?? ""}`}
          onClick={onClick}
        >
          {children}
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

function formatDisplayDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

function formatEstimatedCost(
  estimatedCost: string | null,
  currency: string | null,
) {
  if (!estimatedCost) {
    return "—";
  }

  const amount = Number(estimatedCost);

  if (Number.isNaN(amount)) {
    return estimatedCost;
  }

  if (!currency) {
    return amount.toLocaleString();
  }

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString()} ${currency}`;
  }
}
