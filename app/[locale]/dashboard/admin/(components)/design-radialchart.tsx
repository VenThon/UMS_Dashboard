"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
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

export function DesignChartRadial() {
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
      uxuidesign: getRoleTotal("ux_ui_designer"),
      graphic: getRoleTotal(" graphic_designer"),
    },
  ];

  const chartConfig = {
    graphic: {
      label: "Graphic Design",
      color: "#ef4444",
    },
    uxuidesign: {
      label: "UX/UI Design",
      color: "#f59e0b",
    },
  } satisfies ChartConfig;

  const totalVisitors = chartData[0].graphic + chartData[0].uxuidesign;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center-safe justify-between">
        <CardTitle>Design Team Roles</CardTitle>
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
      <CardContent className="flex flex-1 items-center pb-0">
        {isLoading ? (
          "..."
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-62.5"
          >
            <RadialBarChart
              data={chartData}
              endAngle={180}
              innerRadius={80}
              outerRadius={110}
            >
              <RadialBar
                dataKey="uxuidesign"
                fill="var(--color-uxuidesign)"
                stackId="a"
                cornerRadius={5}
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="graphic"
                stackId="a"
                cornerRadius={5}
                fill="var(--color-graphic)"
                className="stroke-transparent stroke-2"
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className="fill-foreground text-2xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground"
                          >
                            Totals
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className=" text-xs text-center">
        <div className="leading-none text-muted-foreground">
          Shows the number of team members responsible for interface design,
          user experience optimization.
        </div>
      </CardFooter>
    </Card>
  );
}
