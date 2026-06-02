"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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

export const description = "A multiple bar chart";

const chartData = [
  { month: "January", approved: 10, rejected: 7 },
  { month: "February", approved: 10, rejected: 20 },
  { month: "March", approved: 20, rejected: 23 },
  { month: "April", approved: 7, rejected: 8 },
  { month: "May", approved: 6, rejected: 8 },
  { month: "June", approved: 9, rejected: 9 },
  { month: "July", approved: 8, rejected: 6 },
  { month: "August", approved: 5, rejected: 5 },
  { month: "September", approved: 4, rejected: 6 },
  { month: "October", approved: 7, rejected: 7 },
  { month: "November", approved: 4, rejected: 2 },
  { month: "December", approved: 6, rejected: 1 },
];

const chartConfig = {
  approved: {
    label: "Approved",
    color: "#058248",
  },
  rejected: {
    label: "Rejected",
    color: "#1c4fce",
  },
} satisfies ChartConfig;

export function GeneralRequestBarChartByMnagementsTeam() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Request Summary</CardTitle>
        <CardDescription>January - October 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="approved" fill="var(--color-approved)" radius={4} />
            <Bar dataKey="rejected" fill="var(--color-rejected)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start text-sm">
        <div className="leading-none text-muted-foreground">
          Displays the total number of approved and rejected requests for quick
          monitoring.
        </div>
      </CardFooter>
    </Card>
  );
}
