"use client";

import { ReportTypesStatusBadge } from "@/components/badge/status-report";
import { DAILY_REPORT_STATUS } from "@/db/constants/daily-report-status";
import { USER_ROLE, UserRole } from "@/db/types/user.type";
import { formatDate } from "@/lib/utils";

import { ColumnDef } from "@tanstack/react-table";

import { ApproveDailyReportButton } from "./approve-button";
import { DailyReportItem } from "./daily-report.type";
import { DeleteDailyReportDialog } from "./delete-daily-report-button";
import { UpdateDailyReportDialog } from "./edit-daily-report";
import { RejectDailyReportDialog } from "./reject-button";
import { SubmitDailyReportButton } from "./submit-resubmit-button";
import { ViewDailyReportDetailDialog } from "./view-daily-report-detail-dialog";

const REVIEW_ROLES: readonly UserRole[] = [
  USER_ROLE.LEAD_FRONTEND,
  USER_ROLE.LEAD_BACKEND,
];
export function getColumnsDataTableDevelopmentTeam({
  currentUserId,
  currentUserRole,
  locale,
}: {
  currentUserId: string;
  locale: string;
  currentUserRole: UserRole;
}): ColumnDef<DailyReportItem>[] {
  return [
    {
      accessorKey: "id",
      header: () => <div className="ml-2">Nº</div>,
      enableHiding: false,
      cell: ({ row, table }) => {
        const rowNumber =
          table
            .getSortedRowModel()
            .flatRows.findIndex((flatRow) => flatRow.id === row.id) + 1;

        return <div className="ml-2">{rowNumber}</div>;
      },
    },
    {
      accessorKey: "projectName",
      header: "Project Name",
      cell: ({ row }) => <section>{row.original.projectName}</section>,
    },
    {
      accessorKey: "reportDate",
      header: "Report Date",
      cell: ({ row }) => (
        <section>
          {formatDate(new Date(row.original.reportDate), {
            formatStr: "dd-LLL-yyyy pp",
            localeCode: locale,
          })}
        </section>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <section>
          <ReportTypesStatusBadge status={row.original.status} />
        </section>
      ),
    },
    {
      id: "actions",
      header: () => <span className="flex justify-center">Actions</span>,
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;

        const isOwner = item.userId === currentUserId;

        const isDraft = item.status === DAILY_REPORT_STATUS.DRAFT;
        const isPending = item.status === DAILY_REPORT_STATUS.PENDING;
        const isRejected = item.status === DAILY_REPORT_STATUS.REJECTED;
        const isApproved = item.status === DAILY_REPORT_STATUS.APPROVED;

        const isReviewer = REVIEW_ROLES.includes(currentUserRole);

        const canReview = isReviewer && !isOwner && isPending;

        const canView = isPending || isApproved || canReview || isRejected;

        const canEdit = isOwner && (isDraft || isPending || isRejected);

        const canSubmit = isOwner && isDraft;

        const canResubmit = isOwner && isRejected;

        const canDelete = isOwner && isDraft;

        return (
          <section className="flex items-center justify-center gap-1.5">
            <div className="flex items-center justify-end gap-2">
              {canView && <ViewDailyReportDetailDialog item={item} />}

              {canEdit && <UpdateDailyReportDialog item={item} />}

              {canSubmit && (
                <SubmitDailyReportButton id={item.id} type="submit" />
              )}

              {canResubmit && (
                <SubmitDailyReportButton id={item.id} type="resubmit" />
              )}

              {canDelete && <DeleteDailyReportDialog id={item.id} />}

              {canReview && (
                <>
                  <ApproveDailyReportButton id={item.id} />
                  <RejectDailyReportDialog id={item.id} />
                </>
              )}
            </div>
          </section>
        );
      },
    },
  ];
}
