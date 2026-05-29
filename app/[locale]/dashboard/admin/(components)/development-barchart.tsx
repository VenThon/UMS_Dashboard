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

export const description = "A bar chart";

const chartData = [
  { development: "Lead Frontend", total: 50, fill: "#6366f1" },
  { development: "Lead Backend", total: 40, fill: "#ec4899" },
  { development: "Frontend", total: 100, fill: "#06b6d4" },
  { development: "Backend", total: 73, fill: "#22c55e" },
  { development: "Full Stack", total: 10, fill: "#f59e0b" },
  { development: "Mobile", total: 6, fill: "#ef4444" },
];

const chartConfig = {
  total: {
    label: "Team Members",
  },
} satisfies ChartConfig;

export function DevelopmentChartBar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Development Team Roles</CardTitle>
        <CardDescription>
          Displays the distribution of team members across development roles,
          including Senior, Team Lead, Full Stack Developers, Frontend
          Developers, Backend Developers, and Mobile Developers.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="development"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 15)}
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
      </CardContent>
    </Card>
  );
}
