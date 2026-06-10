"use client";

import { DataTable } from "@/components/data-table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { columnsDataTableUsers } from "../(components)/dataTable-users";
import { useSearchParams } from "next/navigation";
import { PaginationWithLinks } from "@/components/ui/pagination-link";
import { SearchAllUsers } from "../(components)/search-users";
import { FilterUsers } from "../(components)/filter-users";
import { ButtonCreateUser } from "../(components)/button-create-user";
import { ListAllUsersService } from "@/service/user/user.service";
import { Loader2 } from "lucide-react";
import { FilterByTeam } from "../(components)/filter-team";
import { useUserSearchParams } from "../(components)/filters-components";

export function UsersListing() {
  const searchParam = useSearchParams();
  const page = Number.parseInt(searchParam.get("page") || "1");
  const pageSize = Number.parseInt(searchParam.get("pageSize") || "10");
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const params = useUserSearchParams();

  const {
    data: apiResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["user", params.toString()],
    queryFn: () => ListAllUsersService(params.toString()),
    placeholderData: keepPreviousData,
  });

  const users = apiResponse?.data ?? [];
  if (isLoading || isFetching) {
    return (
      <section className="flex h-[80vh] flex-col items-center justify-center space-y-2">
        <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
        <span className="text-muted-foreground text-sm">loading...</span>
      </section>
    );
  }

  if (users.length === 0) {
    return (
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">List all users</CardTitle>
            <CardDescription>
              Manage user access, account settings, and organizational roles.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4 flex justify-between">
            <SearchAllUsers />
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <FilterByTeam />
              <FilterUsers />
              <ButtonCreateUser />
            </div>
          </CardContent>
        </Card>
        <div className="mt-6 grid grid-cols-1">
          <DataTable data={[]} columns={columnsDataTableUsers} />
        </div>
      </section>
    );
  }

  const totalItems = users.length;

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">List all users</CardTitle>
          <CardDescription>
            Manage user access, account settings, and organizational roles.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4 flex justify-between">
          <SearchAllUsers />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <FilterByTeam />
            <FilterUsers />
            <ButtonCreateUser />
          </div>
        </CardContent>
      </Card>
      <div className="mt-8">
        <div>
          <DataTable columns={columnsDataTableUsers} data={users} />
        </div>
        <div className="mt-5 flex justify-between">
          <div className="text-md  text-gray-700">
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
