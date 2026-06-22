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

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

export function InfrastructureOperation() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, index) =>
    String(currentYear - index),
  );

  const [year, setYear] = useState(String(new Date().getFullYear()));

  const { data, isLoading } = useAdminStatisticsDisplayRolesByYearHook(year);

  const getRoleTotal = (role: string) =>
    data?.data?.find((item) => item.role === role)?.total ?? 0;

  const chartData = [
    { infraTeam: "LeadInfra", total: getRoleTotal("lead_infrastructure") },
    { infraTeam: "Clould", total: getRoleTotal("cloud_engineer") },
    { infraTeam: "DevOps", total: getRoleTotal("devops_engineer") },
    { infraTeam: "Database", total: getRoleTotal("database_administrator") },
    { infraTeam: "Network", total: getRoleTotal("network_engineer") },
    { infraTeam: "Security", total: getRoleTotal("security_engineer") },
  ];

  const chartConfig = {
    total: {
      label: "Totals",
      color: "#06b6d4",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center-safe justify-between">
        <div>
          <CardTitle>Infrastructure Operation Team</CardTitle>
          <CardDescription className="text-xs">
            Displays the distribution of infrastructure personnel across key
            operational roles.
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
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 22,
                left: 30,
                right: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="infraTeam"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 8)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="total"
                type="natural"
                stroke="var(--color-total)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-total)",
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
