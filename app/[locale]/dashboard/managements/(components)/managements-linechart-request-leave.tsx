"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

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

export const description = "A multiple line chart";

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
    color: "#22C55E",
  },
  rejected: {
    label: "Rejected",
    color: "#EF4444",
  },
} satisfies ChartConfig;

export function RequestLeaveChartLineByMnagementsTeam() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave Request Summary</CardTitle>
        <CardDescription>January - October 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            {/* <Line
              dataKey="approved"
              type="natural"
              stroke="var(--color-approved)"
              strokeWidth={2}
              dot={false}
            /> */}
            <Line
              dataKey="approved"
              type="natural"
              stroke="var(--color-approved)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-approved)",
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
            <Line
              dataKey="rejected"
              type="natural"
              stroke="var(--color-rejected)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-rejected)",
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
            {/* <Line
              dataKey="rejected"
              type="monotone"
              stroke="var(--color-rejected)"
              strokeWidth={2}
              dot={false}
            /> */}
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Track the approval and rejection status of leave requests.
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
