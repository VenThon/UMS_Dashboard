"use client";

import { useSearchParams } from "next/navigation";

import { DataTable } from "@/components/data-table";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaginationWithLinks } from "@/components/ui/pagination-link";
import type { UserRole } from "@/db/types/user.type";
import { useGetDailyReports } from "@/hooks/report/use-daily-report";

import { ButtonCreateDailyReport } from "./button-daily-report";
import { getColumnsDataTableDevelopmentTeam } from "./data-table-developement";
import { FilterReportDevelopmentTeam } from "./filter-report";
import { useLocale } from "next-intl";
import { TableLoadingSkeleton } from "../tableLoadingSkeleton";

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
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <CardTitle className="text-xl font-semibold tracking-tight sm:text-xl">
              Daily Development Reports
            </CardTitle>

            <CardDescription className="text-muted-foreground max-w-2xl text-sm leading-6">
              Monitor, review, and manage daily reports submitted by developers
              to ensure project progress and team alignment.
            </CardDescription>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <FilterReportDevelopmentTeam />
            <ButtonCreateDailyReport />
          </div>
        </CardHeader>
      </Card>

      <div className="mt-8">
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
