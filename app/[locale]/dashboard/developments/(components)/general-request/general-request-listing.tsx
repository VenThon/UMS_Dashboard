"use client";

import { useMemo, useState } from "react";

import { useSearchParams } from "next/navigation";

import { DataTable } from "@/components/data-table";
import { PaginationWithLinks } from "@/components/ui/pagination-link";
import type { GeneralRequestStatus } from "@/db/constants/general-request";
import type { UserRole } from "@/db/types/user.type";
import { getGeneralRequestApprovalLevel } from "@/utils/general-request/request-leave-permission";

import { useGeneralRequests } from "../../general-request/_hooks/use-general-request";
import type { GeneralRequestItem } from "../../general-request/general-request-types";
import { ApproveGeneralRequestDialog } from "./approve-general-request-dialog";
import { ButtonSubmitGeneralRequest } from "./button-general-request";
import { CancelGeneralRequestDialog } from "./cancel-general-request-dialog";
import { getColumnsDataTableGeneralRequestDevelopmentTeam } from "./data-table-rgeneral-equest-development";
import { DeleteGeneralRequestDialog } from "./delete-general-request-dialog";
import { ViewGeneralRequestDialog } from "./detail-dailog";
import { EditGeneralRequestDialog } from "./edit-general-request-dialog";
import { FilterGeneralRequesDevelopmentTeam } from "./filter-general-request";
import { RejectGeneralRequestDialog } from "./reject-general-request-dialog";
import { ResubmitGeneralRequestDialog } from "./resubmit-general-request-dialog";
import { SectionCardsDevelopments } from "../section-card-development";

type GeneralRequestListingProps = {
  currentUserId: string;
  currentUserRole: UserRole;
};

export function GeneralRequestListing({
  currentUserId,
  currentUserRole,
}: GeneralRequestListingProps) {
  const searchParams = useSearchParams();

  const page = Math.max(
    Number.parseInt(searchParams.get("page") ?? "1", 10) || 1,
    1,
  );

  const pageSize = Math.min(
    Math.max(
      Number.parseInt(searchParams.get("pageSize") ?? "10", 10) || 10,
      1,
    ),
    100,
  );

  const status =
    (searchParams.get("status") as GeneralRequestStatus | null) ?? undefined;

  const search = searchParams.get("search")?.trim() || undefined;

  const approvalLevel = getGeneralRequestApprovalLevel(currentUserRole);

  const generalRequestsQuery = useGeneralRequests({
    page,
    pageSize,
    status,
    search,
  });

  const generalRequests = generalRequestsQuery.data?.data ?? [];

  const pagination = generalRequestsQuery.data?.pagination;

  const totalItems = pagination?.totalItems ?? 0;

  const startIndex = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;

  const endIndex = Math.min(page * pageSize, totalItems);

  const [viewingRequest, setViewingRequest] =
    useState<GeneralRequestItem | null>(null);

  const [editingRequest, setEditingRequest] =
    useState<GeneralRequestItem | null>(null);

  const [deletingRequest, setDeletingRequest] =
    useState<GeneralRequestItem | null>(null);

  const [cancellingRequest, setCancellingRequest] =
    useState<GeneralRequestItem | null>(null);

  const [approvingRequest, setApprovingRequest] =
    useState<GeneralRequestItem | null>(null);

  const [rejectingRequest, setRejectingRequest] =
    useState<GeneralRequestItem | null>(null);

  const [resubmittingRequest, setResubmittingRequest] =
    useState<GeneralRequestItem | null>(null);

  const columns = useMemo(
    () =>
      getColumnsDataTableGeneralRequestDevelopmentTeam({
        currentUserId,
        approvalLevel,
        onView: setViewingRequest,
        onEdit: setEditingRequest,
        onDelete: setDeletingRequest,
        onCancel: setCancellingRequest,
        onApprove: setApprovingRequest,
        onReject: setRejectingRequest,
        onResubmit: setResubmittingRequest,
      }),
    [currentUserId, approvalLevel],
  );

  const pageContent = getPageContent(approvalLevel);

  return (
    <>
      <section>
        <div className="mt-2 space-y-4">
          <div className="flex flex-col gap-4 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 space-y-1.5">
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {pageContent.title}
              </h1>

              <p className="text-muted-foreground max-w-2xl text-sm leading-6">
                {pageContent.description}
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
              <FilterGeneralRequesDevelopmentTeam />

              {approvalLevel === null && <ButtonSubmitGeneralRequest />}
            </div>
          </div>
          <SectionCardsDevelopments />
        </div>
        <div className="mt-6">
          {generalRequestsQuery.isLoading ? (
            <GeneralRequestTableSkeleton rows={pageSize} />
          ) : generalRequestsQuery.isError ? (
            <div className="flex min-h-48 items-center justify-center rounded-lg border border-red-200 bg-red-50 px-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
              {generalRequestsQuery.error.message}
            </div>
          ) : generalRequests.length === 0 ? (
            <div className="text-muted-foreground flex min-h-48 items-center justify-center rounded-lg border border-dashed px-4 text-center text-sm">
              {pageContent.emptyMessage}
            </div>
          ) : (
            <>
              <DataTable data={generalRequests} columns={columns} />

              <div className="mt-4 flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-muted-foreground text-sm">
                  Showing{" "}
                  <span className="text-foreground font-medium">
                    {startIndex}-{endIndex}
                  </span>{" "}
                  of{" "}
                  <span className="text-foreground font-medium">
                    {totalItems}
                  </span>{" "}
                  items
                </p>

                {totalItems > 0 && (
                  <div className="flex justify-start sm:justify-end">
                    <PaginationWithLinks
                      page={pagination?.page ?? page}
                      pageSize={pagination?.pageSize ?? pageSize}
                      totalCount={totalItems}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      <ViewGeneralRequestDialog
        generalRequestId={viewingRequest?.id ?? null}
        open={Boolean(viewingRequest)}
        onOpenChange={(open) => {
          if (!open) {
            setViewingRequest(null);
          }
        }}
      />

      <EditGeneralRequestDialog
        request={editingRequest}
        open={Boolean(editingRequest)}
        onOpenChange={(open) => {
          if (!open) {
            setEditingRequest(null);
          }
        }}
      />

      <ApproveGeneralRequestDialog
        request={approvingRequest}
        open={Boolean(approvingRequest)}
        onOpenChange={(open) => {
          if (!open) {
            setApprovingRequest(null);
          }
        }}
      />

      <RejectGeneralRequestDialog
        request={rejectingRequest}
        open={Boolean(rejectingRequest)}
        onOpenChange={(open) => {
          if (!open) {
            setRejectingRequest(null);
          }
        }}
      />

      <CancelGeneralRequestDialog
        request={cancellingRequest}
        open={Boolean(cancellingRequest)}
        onOpenChange={(open) => {
          if (!open) {
            setCancellingRequest(null);
          }
        }}
      />

      <DeleteGeneralRequestDialog
        request={deletingRequest}
        open={Boolean(deletingRequest)}
        onOpenChange={(open) => {
          if (!open) {
            setDeletingRequest(null);
          }
        }}
      />

      <ResubmitGeneralRequestDialog
        request={resubmittingRequest}
        open={Boolean(resubmittingRequest)}
        onOpenChange={(open) => {
          if (!open) {
            setResubmittingRequest(null);
          }
        }}
      />
    </>
  );
}

function getPageContent(approvalLevel: 1 | 2 | null) {
  if (approvalLevel === 1) {
    return {
      title: "First Approval",
      description: "Review general requests waiting for first-level approval.",
      emptyMessage: "There are no general requests waiting for first approval.",
    };
  }

  if (approvalLevel === 2) {
    return {
      title: "Second Approval",
      description:
        "Review general requests that passed first approval and are waiting for final approval.",
      emptyMessage:
        "There are no general requests waiting for second approval.",
    };
  }

  return {
    title: "General Requests",
    description:
      "Submit, monitor, and manage your general requests and approval progress.",
    emptyMessage: "You have not submitted any general requests yet.",
  };
}

function GeneralRequestTableSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-lg border">
        <div className="bg-muted/40 hidden border-b px-4 py-3 md:grid md:grid-cols-8 md:gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-muted h-4 animate-pulse rounded" />
          ))}
        </div>

        <div className="divide-y">
          {Array.from({
            length: Math.min(rows, 10),
          }).map((_, index) => (
            <div
              key={index}
              className="grid gap-4 px-4 py-4 md:grid-cols-8 md:items-center"
            >
              {Array.from({ length: 7 }).map((_, cellIndex) => (
                <div
                  key={cellIndex}
                  className="bg-muted h-4 animate-pulse rounded"
                />
              ))}

              <div className="flex justify-end">
                <div className="bg-muted size-8 animate-pulse rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="bg-muted h-4 w-44 animate-pulse rounded" />

        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-muted size-9 animate-pulse rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
