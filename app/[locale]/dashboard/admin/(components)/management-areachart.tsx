"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useState } from "react";
import { useAdminStatisticsDisplayRolesByYearHook } from "@/hooks/admin/statistics.hook";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ManagementChartArea() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, index) =>
    String(currentYear - index),
  );

  const [year, setYear] = useState(String(new Date().getFullYear()));

  const { data, isLoading } = useAdminStatisticsDisplayRolesByYearHook(year);

  const getRoleTotal = (role: string) =>
    data?.data?.find((item) => item.role === role)?.total ?? 0;

  const chartData = [
    { managementTeam: "IT Manager", total: getRoleTotal("it_manager") },
    {
      managementTeam: "Project Manager",
      total: getRoleTotal("project_manager"),
    },
  ];

  const chartConfig = {
    total: {
      label: "Totals",
      color: "#22c55e",
    },
  } satisfies ChartConfig;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center-safe justify-between">
        <div>
          <CardTitle>Management Team Roles</CardTitle>
          <CardDescription className="text-xs">
            Overview of management roles, including IT Managers and Project
            Managers, leading operations and project delivery.
          </CardDescription>
        </div>
        <div>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="text-xs">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent className="text-xs">
              {years.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          "..."
        ) : (
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 29,
                right: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="managementTeam"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 16)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="total"
                type="natural"
                fill="var(--color-total)"
                fillOpacity={0.1}
                stroke="var(--color-total)"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
