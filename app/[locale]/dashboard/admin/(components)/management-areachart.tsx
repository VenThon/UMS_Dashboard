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

export const description = "A simple area chart";

const chartData = [
  { managementTeam: "IT Manager", total: 10 },
  { managementTeam: "Project Manager", total: 13 },
];

const chartConfig = {
  total: {
    label: "Total",
    color: "#22c55e",
  },
} satisfies ChartConfig;

export function ManagementChartArea() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Management Team Roles</CardTitle>
        <CardDescription>
          Overview of management roles, including IT Managers and Project
          Managers, leading operations and project delivery.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
