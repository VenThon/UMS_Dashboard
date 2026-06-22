"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ButtonCreateUser } from "../../../admin/(components)/button-create-user";
import { FilterReportDevelopmentTeam } from "./filter-report";

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
        <CardContent className="mt-4 flex gap-2">
          <FilterReportDevelopmentTeam />
          <ButtonCreateUser />
        </CardContent>
      </Card>
    </section>
  );
}
