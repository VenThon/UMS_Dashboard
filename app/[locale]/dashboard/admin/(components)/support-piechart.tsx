"use client";

import { Pie, PieChart } from "recharts";

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

export const description = "A pie chart with a label";

const chartData = [
  { supportTeam: "itSupport", total: 10, fill: "var(--color-itSupport)" },
  {
    supportTeam: "helpdeskOfficer",
    total: 6,
    fill: "var(--color-helpdeskOfficer)",
  },
];

const chartConfig = {
  total: {
    label: "Totals",
  },
  itSupport: {
    label: "It Support",
    color: "#1c4fce",
  },
  helpdeskOfficer: {
    label: "Helpdesk Officer",
    color: "#6366f1",
  },
} satisfies ChartConfig;

export function SupportChartPie() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Support Team Roles</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5 pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="total" label nameKey="supportTeam" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Shows the number of support team members responsible for help desk
          services, incident management, and user assistance.
        </div>
      </CardFooter>
    </Card>
  );
}
