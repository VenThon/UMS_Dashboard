"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ButtonCreateUser } from "../../../admin/(components)/button-create-user";
import { FilterUsers } from "../../../admin/(components)/filter-users";
import { SearchAllUsers } from "../../../admin/(components)/search-users";

export function DialyReportListingPage() {
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
        <CardContent className="mt-4 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <SearchAllUsers />
          <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <FilterUsers />
            <ButtonCreateUser />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
