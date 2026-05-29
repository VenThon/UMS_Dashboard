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

export const description = "A linear area chart";

const chartData = [
  { baTeam: "Business Analysis", total: 2 },
  { baTeam: "System Analysis", total: 1 },
  { baTeam: "Product Owner", total: 3 },
];

const chartConfig = {
  total: {
    label: "Total",
    color: "#f59e0b",
  },
} satisfies ChartConfig;

export function BusinessAnalysisChartAreaLinear() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Analysis Team Roles</CardTitle>
        <CardDescription>
          Displays the distribution of Business Analysts and System Analysts
          responsible for gathering requirements, analyzing business processes,
          and supporting system development.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
