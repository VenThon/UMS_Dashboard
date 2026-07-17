"use client";
import { useSearchParams } from "next/navigation";

import { mockDataGeneralRequests } from "@/app/[locale]/mock/development-team";
import { DataTable } from "@/components/data-table";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaginationWithLinks } from "@/components/ui/pagination-link";

import { ButtonSubmitGeneralRequest } from "./button-general-request";
import { columnsDataTableGeneralRequestDevelopmentTeam } from "./data-table-rgeneral-equest-development";
import { FilterGeneralRequesDevelopmentTeam } from "./filter-general-request";

export function GeneralRequestListing() {
  const searchParam = useSearchParams();
  const page = Number.parseInt(searchParam.get("page") || "1");
  const pageSize = Number.parseInt(searchParam.get("pageSize") || "10");
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const totalItems = 10;
  return (
    <section>
      <Card className="flex justify-between border-slate-200 shadow-sm">
        <CardHeader className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              General Request
            </CardTitle>

            <CardDescription className="text-muted-foreground max-w-2xl text-sm leading-6">
              Monitor, review, and manage general requests submitted by the
              development team to ensure clear communication and smooth
              workflow.
            </CardDescription>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <FilterGeneralRequesDevelopmentTeam />
            <ButtonSubmitGeneralRequest />
          </div>
        </CardHeader>
      </Card>
      <div className="mt-8">
        <div>
          <DataTable
            data={mockDataGeneralRequests}
            columns={columnsDataTableGeneralRequestDevelopmentTeam}
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
