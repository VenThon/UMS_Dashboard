"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
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

import { Pie, PieChart } from "recharts";

export function SupportChartPie() {
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
      supportTeam: "itSupport",
      total: getRoleTotal("it_support"),
      fill: "var(--color-itSupport)",
    },
    {
      supportTeam: "helpdeskOfficer",
      total: getRoleTotal("helpdesk_officer"),
      fill: "var(--color-helpdeskOfficer)",
    },
  ];

  const chartConfig = {
    total: {
      label: "Totals",
    },
    itSupport: {
      label: "IT Support",
      color: "#1c4fce",
    },
    helpdeskOfficer: {
      label: "Helpdesk Officer",
      color: "#6366f1",
    },
  } satisfies ChartConfig;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center-safe justify-between">
        <CardTitle>Support Team Roles</CardTitle>
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
      <CardContent className="flex-1 pb-0">
        {isLoading ? (
          "..."
        ) : (
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-62.5 pb-0"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="total"
                label
                nameKey="supportTeam"
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-center text-xs">
        <div className="text-muted-foreground leading-none">
          Shows the number of support team members responsible for help desk
          services.
        </div>
      </CardFooter>
    </Card>
  );
}
