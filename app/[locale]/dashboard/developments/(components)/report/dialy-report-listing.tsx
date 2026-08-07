"use client";

import { useSearchParams } from "next/navigation";

import { useGetDailyReports } from "@/app/[locale]/dashboard/developments/report/_hooks/use-daily-report";
import { DataTable } from "@/components/data-table";
import { PaginationWithLinks } from "@/components/ui/pagination-link";
import type { UserRole } from "@/db/types/user.type";

import { ClipboardList } from "lucide-react";
import { useLocale } from "next-intl";

import { SectionCardsDailyReport } from "../dashboard/dashboard-daily-report";
import { TableLoadingSkeleton } from "../tableLoadingSkeleton";
import { ButtonCreateDailyReport } from "./button-daily-report";
import { getColumnsDataTableDevelopmentTeam } from "./data-table-developement";
import { FilterReportDevelopmentTeam } from "./filter-report";

type DailyReportListingPageProps = {
  currentUserId: string;
  currentUserRole: UserRole;
};

export function DailyReportListingPage({
  currentUserId,
  currentUserRole,
}: DailyReportListingPageProps) {
  const locale = useLocale();
  const searchParam = useSearchParams();

  const page = Number.parseInt(searchParam.get("page") || "1");
  const pageSize = Number.parseInt(searchParam.get("pageSize") || "10");

  const { data, isLoading, error } = useGetDailyReports();

  const reports = data?.data ?? [];

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const totalItems = reports.length;

  const paginatedReports = reports.slice(startIndex, endIndex);

  const columns = getColumnsDataTableDevelopmentTeam({
    currentUserId,
    currentUserRole,
    locale,
  });

  if (isLoading) {
    return (
      <section className="space-y-4">
        <TableLoadingSkeleton rows={10} columns={5} />
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <p className="text-sm text-red-500">
          {error instanceof Error
            ? error.message
            : "Failed to load daily reports."}
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className="space-y-4">
        <section className="">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <div className="text-foreground mt-3 flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gray-200">
                <ClipboardList className="size-6" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Daily Development Reports
                </h1>

                <p className="text-muted-foreground mt-1 text-sm leading-6">
                  Monitor, review, and manage daily reports submitted by
                  developers to ensure project progress and team alignment.
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
              <FilterReportDevelopmentTeam />

              <ButtonCreateDailyReport />
            </div>
          </div>
        </section>

        <SectionCardsDailyReport />
      </div>
      <div className="mt-6">
        <DataTable data={paginatedReports} columns={columns} />

        <div className="mt-5 flex flex-col gap-3 bg-white px-2 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-muted-foreground text-sm">
            Showing{" "}
            <span className="text-foreground font-medium">
              {totalItems === 0 ? 0 : startIndex + 1}
            </span>
            -
            <span className="text-foreground font-medium">
              {Math.min(endIndex, totalItems)}
            </span>{" "}
            of <span className="text-foreground font-medium">{totalItems}</span>{" "}
            items
          </div>

          <div className="flex justify-start sm:justify-end">
            <PaginationWithLinks
              page={page}
              pageSize={pageSize}
              totalCount={totalItems}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
