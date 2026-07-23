import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  BadgeCheck,
  CircleX,
  ClipboardList,
  Clock3,
  type LucideIcon,
} from "lucide-react";

type DashboardCard = {
  title: string;
  value: number | null;
  subtitle: string;
  icon: LucideIcon;
  iconClassName: string;
};

const dashboardCards: DashboardCard[] = [
  {
    title: "Total Reports",
    value: null,
    subtitle: "All submitted requests",
    icon: ClipboardList,
    iconClassName: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400",
  },
  {
    title: "Pending Review",
    value: null,
    subtitle: "Waiting for approval",
    icon: Clock3,
    iconClassName:
      "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  },
  {
    title: "Approved Reports",
    value: null,
    subtitle: "Successfully approved",
    icon: BadgeCheck,
    iconClassName:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  },
  {
    title: "Rejected Rereports",
    value: null,
    subtitle: "Requests that were rejected",
    icon: CircleX,
    iconClassName: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
  },
];

export function SectionCardDailyReport() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {dashboardCards.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className="border-border/70 bg-card relative overflow-hidden shadow-sm transition-shadow hover:shadow-md"
          >
            <CardHeader className="gap-4">
              <div className="space-y-1">
                <CardDescription className="text-sm font-medium">
                  {item.title}
                </CardDescription>

                <CardTitle className="text-3xl font-semibold tracking-tight tabular-nums">
                  {item.value ?? "—"}
                </CardTitle>

                <p className="text-muted-foreground text-xs">{item.subtitle}</p>
              </div>

              <CardAction>
                <Badge
                  variant="secondary"
                  className={`flex size-10 items-center justify-center rounded-lg border-0 p-0 ${item.iconClassName}`}
                >
                  <Icon className="size-5" />
                </Badge>
              </CardAction>
            </CardHeader>

            <div className="bg-primary/10 absolute inset-x-0 bottom-0 h-0.5" />
          </Card>
        );
      })}
    </div>
  );
}
