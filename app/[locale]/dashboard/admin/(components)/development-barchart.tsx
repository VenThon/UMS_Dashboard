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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartData = [
  { development: "Lead Frontend", total: 50, fill: "#93C5FD" }, // blue-300
  { development: "Lead Backend", total: 40, fill: "#F9A8D4" }, // pink-300
  { development: "Frontend", total: 100, fill: "#67E8F9" }, // cyan-300
  { development: "Backend", total: 73, fill: "#86EFAC" }, // green-300
  { development: "Full Stack", total: 10, fill: "#FCD34D" }, // amber-300
  { development: "Mobile", total: 6, fill: "#FCA5A5" }, // red-300
];

const chartConfig = {
  total: {
    label: "Team Members",
  },
} satisfies ChartConfig;

export function DevelopmentChartBar() {
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
          <Select>
            <SelectTrigger className="w-full max-w-48 text-xs">
              <SelectValue placeholder="Select a yearly" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Years</SelectLabel>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
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
