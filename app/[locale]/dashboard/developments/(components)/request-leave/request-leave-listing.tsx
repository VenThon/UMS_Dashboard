"use client";

import { useMemo } from "react";

import { useSearchParams } from "next/navigation";

import { DataTable } from "@/components/data-table";
import { PaginationWithLinks } from "@/components/ui/pagination-link";
import type { RequestLeaveStatus } from "@/db/constants/request-leave-status";
import { type UserRole } from "@/db/types/user.type";
import { getRequestLeaveApprovalLevel } from "@/utils/general-request/request-leave-permission";

import { useRequestLeaves } from "../../leave-request/_hooks/use-request-leave";
import { SectionCardsLeaveRequest } from "../dashboard/dashboard-leave-request";
import { RequestLeaveListingSkeleton } from "./RequestLeaveListingSkeleton";
import { ButtonSubmitRequestLeave } from "./button-submit-request-leave";
import { getcolumnsDataTableRequestLeaveDevelopmentTeam } from "./data-table-request-leave-development";
import { FilterRequestLeaveDevelopmentTeam } from "./filter-request-leave";

type RequestLeaveListingPageProps = {
  currentUserId: string;
  currentUserRole: UserRole;
};

export function RequestLeaveListing({
  currentUserId,
  currentUserRole,
}: RequestLeaveListingPageProps) {
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
    (searchParams.get("status") as RequestLeaveStatus | null) ?? undefined;

  const approvalLevel = getRequestLeaveApprovalLevel(currentUserRole);

  const pageContent = getPageContent(approvalLevel);

  const requestLeavesQuery = useRequestLeaves({
    page,
    pageSize,
    status,
  });

  const requestLeaves = requestLeavesQuery.data?.data ?? [];
  const pagination = requestLeavesQuery.data?.pagination;

  const totalItems = pagination?.totalItems ?? 0;

  const startIndex = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;

  const endIndex = Math.min(page * pageSize, totalItems);

  const columns = useMemo(
    () =>
      getcolumnsDataTableRequestLeaveDevelopmentTeam(
        currentUserId,
        approvalLevel,
      ),
    [currentUserId, approvalLevel],
  );

  return (
    <section>
      {/* <Card className="border-border/60 shadow-sm">
        <CardHeader className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <CardTitle className="text-xl font-semibold tracking-tight sm:text-2xl">
              {pageContent.title}
            </CardTitle>

            <CardDescription className="text-muted-foreground max-w-2xl text-sm leading-6">
              {pageContent.description}
            </CardDescription>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <FilterRequestLeaveDevelopmentTeam />

            {approvalLevel === null && <ButtonSubmitRequestLeave />}
          </div>
          <SectionCardsLeaveRequest />
        </CardHeader>
      </Card> */}
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
            <FilterRequestLeaveDevelopmentTeam />

            {approvalLevel === null && <ButtonSubmitRequestLeave />}
          </div>
        </div>
        <SectionCardsLeaveRequest />
      </div>

      <div className="mt-6">
        {requestLeavesQuery.isLoading ? (
          <RequestLeaveListingSkeleton rows={pageSize} />
        ) : requestLeavesQuery.isError ? (
          <div className="flex min-h-48 items-center justify-center rounded-lg border border-red-200 bg-red-50 px-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
            {requestLeavesQuery.error.message}
          </div>
        ) : requestLeaves.length === 0 ? (
          <div className="text-muted-foreground flex min-h-48 items-center justify-center rounded-lg border border-dashed px-4 text-center text-sm">
            {pageContent.emptyMessage}
          </div>
        ) : (
          <>
            <DataTable data={requestLeaves} columns={columns} />

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-muted-foreground text-sm">
                Showing {startIndex}-{endIndex} of {totalItems} items
              </p>

              {totalItems > 0 && (
                <PaginationWithLinks
                  page={pagination?.page ?? page}
                  pageSize={pagination?.pageSize ?? pageSize}
                  totalCount={totalItems}
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function getPageContent(approvalLevel: 1 | 2 | null) {
  if (approvalLevel === 1) {
    return {
      title: "First Approval",
      description:
        "Review leave requests waiting for first-level approval. You can approve or reject each request.",
      emptyMessage: "There are no leave requests waiting for first approval.",
    };
  }

  if (approvalLevel === 2) {
    return {
      title: "Second Approval",
      description:
        "Review leave requests that have passed first approval and are waiting for final approval.",
      emptyMessage: "There are no leave requests waiting for second approval.",
    };
  }

  return {
    title: "My Leave Requests",
    description:
      "Submit, monitor, and manage your leave requests and approval progress.",
    emptyMessage: "You have not submitted any leave requests yet.",
  };
}
