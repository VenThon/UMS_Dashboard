import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Activity,
  AudioLines,
  IdCardLanyard,
  LaptopMinimalCheck,
  ScreenShare,
  UserRoundCheck,
  UserRoundX,
  Users,
} from "lucide-react";
import { DevelopmentChartBar } from "./development-barchart";
import { InfrastructureOperation } from "./infrastructure-operation";
import { ManagementChartArea } from "./management-areachart";
import { BusinessAnalysisChartAreaLinear } from "./business-analysis-areachartlinear";
import { SupportChartPie } from "./support-piechart";
import { QualityAssuranceChartRadial } from "./quality-assurance-radialchart";
import { DesignChartRadial } from "./design-radialchart";

export function SectionCards() {
  return (
    <div>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              168
            </CardTitle>
            <CardAction>
              <Badge className="bg-sky-100 text-sky-600">
                <Users />
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Active Users</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              100
            </CardTitle>
            <CardAction>
              <Badge className="bg-green-100 text-green-700">
                <Activity />
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Inactive Users</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              68
            </CardTitle>
            <CardAction>
              <Badge variant="destructive">
                <UserRoundX />
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Teams</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              7
            </CardTitle>
            <CardAction>
              <Badge className="bg-purple-100 text-purple-700">
                <UserRoundCheck />
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="@container/card ">
          <CardHeader>
            <CardDescription>Management Team</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              20
            </CardTitle>
            <CardAction>
              <Badge className="bg-amber-100 text-amber-600">
                <IdCardLanyard />
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Development Team</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              40
            </CardTitle>
            <CardAction>
              <Badge className="bg-blue-100 text-blue-700">
                <LaptopMinimalCheck />
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Business Analysis Team</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              10
            </CardTitle>
            <CardAction>
              <Badge className="bg-pink-100 text-pink-600">
                <AudioLines />
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Infrastructure Teams</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              15
            </CardTitle>
            <CardAction>
              <Badge className="bg-indigo-100 text-indigo-700">
                <ScreenShare />
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 p-5">
        <DevelopmentChartBar />
        <InfrastructureOperation />
        <ManagementChartArea />
        <BusinessAnalysisChartAreaLinear />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
        <SupportChartPie />
        <QualityAssuranceChartRadial />
        <DesignChartRadial />
      </div>
    </div>
  );
}
