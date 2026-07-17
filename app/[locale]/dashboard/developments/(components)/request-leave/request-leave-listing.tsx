"use client";
import { useSearchParams } from "next/navigation";

import { MockDataRequestLeave } from "@/app/[locale]/mock/development-team";
import { DataTable } from "@/components/data-table";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaginationWithLinks } from "@/components/ui/pagination-link";

import { ButtonSubmitRequestLeave } from "./button-submit-request-leave";
import { columnsDataTableRequestLeaveDevelopmentTeam } from "./data-table-request-leave-development";
import { FilterRequestLeaveDevelopmentTeam } from "./filter-request-leave";

export function RequestLeaveListing() {
  const searchParam = useSearchParams();
  const page = Number.parseInt(searchParam.get("page") || "1");
  const pageSize = Number.parseInt(searchParam.get("pageSize") || "10");
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const totalItems = 10;
  return (
    <section>
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <CardTitle className="text-xl font-semibold tracking-tight sm:text-2xl">
              Request Leave
            </CardTitle>
            <CardDescription className="text-muted-foreground max-w-2xl text-sm leading-6">
              Monitor, review, and manage daily reports submitted by developers
              to ensure project progress and team alignment.
            </CardDescription>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <FilterRequestLeaveDevelopmentTeam />
            <ButtonSubmitRequestLeave />
          </div>
        </CardHeader>
      </Card>
      <div className="mt-8">
        <div>
          <DataTable
            data={MockDataRequestLeave}
            columns={columnsDataTableRequestLeaveDevelopmentTeam}
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
