"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminStatisticsDisplayRolesByYearHook } from "@/hooks/admin/statistics.hook";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

export function BusinessAnalysisChartAreaLinear() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, index) =>
    String(currentYear - index),
  );

  const [year, setYear] = useState(String(new Date().getFullYear()));

  const { data, isLoading } = useAdminStatisticsDisplayRolesByYearHook(year);

  const getRoleTotal = (role: string) =>
    data?.data?.find((item) => item.role === role)?.total ?? 0;

  const chartData = [
    { baTeam: "Business Analysis", total: getRoleTotal("business_analysis") },
    { baTeam: "System Analysis", total: getRoleTotal("system_analysis") },
    { baTeam: "Product Owner", total: getRoleTotal("product_owner") },
  ];

  const chartConfig = {
    total: {
      label: "Totals",
      color: "#f59e0b",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center-safe justify-between">
        <div>
          <CardTitle>Business Analysis Team Roles</CardTitle>
          <CardDescription className="text-xs">
            Displays the distribution of Business Analysts and System Analysts
            responsible for gathering requirements.
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
                left: 50,
                right: 30,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="baTeam"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 18)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" hideLabel />}
              />
              <Area
                dataKey="total"
                type="linear"
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
