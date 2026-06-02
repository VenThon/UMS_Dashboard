"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

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

const chartData = [
  { infraTeam: "LeadInfra", total: 10 },
  { infraTeam: "Clould", total: 40 },
  { infraTeam: "DevOps", total: 10 },
  { infraTeam: "Database", total: 34 },
  { infraTeam: "Network", total: 15 },
  { infraTeam: "Security", total: 33 },
];

const chartConfig = {
  total: {
    label: "Total",
    color: "#06b6d4",
  },
} satisfies ChartConfig;

export function InfrastructureOperation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Infrastructure Operation Team</CardTitle>
        <CardDescription>
          Displays the distribution of infrastructure personnel across key
          operational roles, including Network Engineers and System
          Administrators.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
