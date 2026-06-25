"use client";

import { useSearchParams } from "next/navigation";

import { MockDataDevelopmentTeam } from "@/app/[locale]/mock/development-team";
import { DataTable } from "@/components/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaginationWithLinks } from "@/components/ui/pagination-link";

import { ButtonCreateDailyReport } from "./button-daily-report";
import { columnsDataTableDevelopmentTeam } from "./data-table-developement";
import { FilterReportDevelopmentTeam } from "./filter-report";

export function DialyReportListingPage() {
  const searchParam = useSearchParams();
  const page = Number.parseInt(searchParam.get("page") || "1");
  const pageSize = Number.parseInt(searchParam.get("pageSize") || "10");
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const totalItems = 10;
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Daily Development Reports</CardTitle>
          <CardDescription>
            Monitor, review, and manage daily reports submitted by developers to
            ensure project progress and team alignment.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4 flex gap-2">
          <FilterReportDevelopmentTeam />
          <ButtonCreateDailyReport />
        </CardContent>
      </Card>
      <div className="mt-8">
        <div>
          <DataTable
            data={MockDataDevelopmentTeam}
            columns={columnsDataTableDevelopmentTeam}
          />
        </div>
        <div className="mt-5 flex justify-between">
          <div className="text-md text-gray-700">
            Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of{" "}
            {totalItems} Items
          </div>
          <div>
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
