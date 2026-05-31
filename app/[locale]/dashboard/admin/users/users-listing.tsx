"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { Plus } from "lucide-react";
import { columnsDataTableUsers } from "../(components)/dataTable-users";
import { useSearchParams } from "next/navigation";
import { PaginationWithLinks } from "@/components/ui/pagination-link";

const mockUsers = [
  {
    id: "1",
    username: "test",
    email: "admin@example.com",
    password: "",
    role: "test",
    team: "Management",
    phoneNumber: "012345678",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function UsersListing() {
  const searchParam = useSearchParams();
  const page = Number.parseInt(searchParam.get("page") || "1");
  const pageSize = Number.parseInt(searchParam.get("pageSize") || "10");
  //   const paginatedData = 10;
  const totalItems = 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">List all users</CardTitle>
          <CardDescription className="mt-4 flex justify-between">
            {/* <SearchAllStaff /> */}
            <div className="grid grid-cols-4 gap-2">
              {/* <FilterStaff /> */}
              <Link href="/dashboard/staff/create">
                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-green-500 sm:w-auto dark:text-white"
                >
                  <span className="flex items-center gap-2">
                    <Plus className="rounded-full bg-white text-green-600" />
                    <span>Create New</span>
                  </span>
                </Button>
              </Link>
              {/* <Button
                className="flex items-center justify-center bg-green-600 hover:bg-green-500 sm:w-auto dark:text-white"
                onClick={() => downloadCSV(MockdataStaff, "staff.csv")}
              >
                <FileDown className="font-extrabold" />
                <span>Download CSV</span>
              </Button> */}
              {/* <Button
                className="bg-green-600 hover:bg-green-500 sm:w-auto dark:text-white"
                onClick={() => downloadJSON(MockdataStaff, "staff.json")}
              >
                <FileJson className="font-extrabold" />
                <span>Download JSON</span>
              </Button> */}
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="mt-10">
        <div>
          <DataTable columns={columnsDataTableUsers} data={mockUsers} />
        </div>
        <div className="mt-5 flex justify-between">
          <div className="text-md font-bold text-gray-700">
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
