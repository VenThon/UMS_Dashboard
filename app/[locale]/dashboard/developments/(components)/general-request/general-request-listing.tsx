"use client";
import { useSearchParams } from "next/navigation";

import { mockDataGeneralRequests } from "@/app/[locale]/mock/development-team";
import { DataTable } from "@/components/data-table";
import {
  Card,
  CardContent,
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
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">General Request </CardTitle>
          <CardDescription>
            Monitor, review, and manage daily reports submitted by developers to
            ensure project progress and team alignment.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4 flex gap-2">
          <FilterGeneralRequesDevelopmentTeam />
          <ButtonSubmitGeneralRequest />
        </CardContent>
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
