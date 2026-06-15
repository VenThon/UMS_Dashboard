"use client";

import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
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
import { useState } from "react";

export function DevelopmentChartBar() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, index) =>
    String(currentYear - index),
  );

  const [year, setYear] = useState(String(new Date().getFullYear()));

  const { data, isLoading } = useAdminStatisticsDisplayRolesByYearHook(year);

  const getRoleTotal = (role: string) =>
    data?.data?.find((item) => item.role === role)?.total ?? 0;

  const chartData = [
    {
      development: "Lead Frontend",
      total: getRoleTotal("lead_frontend"),
      fill: "#93C5FD",
    },
    {
      development: "Lead Backend",
      total: getRoleTotal("lead_backend"),
      fill: "#F9A8D4",
    },
    {
      development: "Frontend",
      total: getRoleTotal("frontend_developer"),
      fill: "#67E8F9",
    },
    {
      development: "Backend",
      total: getRoleTotal("backend_developer"),
      fill: "#86EFAC",
    },
    {
      development: "Full Stack",
      total: getRoleTotal("fullstack_developer"),
      fill: "#FCD34D",
    },
    {
      development: "Mobile",
      total: getRoleTotal("mobile_developer"),
      fill: "#FCA5A5",
    },
  ];

  const chartConfig = {
    total: {
      label: "Total",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center-safe justify-between">
        <div>
          <CardTitle>Development Team Roles</CardTitle>
          <CardDescription className="text-xs">
            Displays the number distribution of team members across development
            roles.
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
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="development"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="total" radius={8}>
                {chartData.map((entry) => (
                  <Cell key={entry.development} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
