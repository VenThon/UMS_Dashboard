import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AudioWaveform,
  BadgeCheck,
  BookCheck,
  ClipboardPen,
} from "lucide-react";
import { GeneralRequestChartBarByEachRoles } from "./developmet-barchart-general-request";
import { RequestLeaveChartLineByEachRoles } from "./developmet-linechart-request-leave";

export function SectionCardsDevelopments() {
  return (
    <div>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Card className="@container/card ">
          <CardHeader>
            <CardDescription>General Request</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              168
            </CardTitle>
            <CardAction>
              <Badge className="bg-sky-100 text-sky-600">
                <AudioWaveform />
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Request Leave</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              100
            </CardTitle>
            <CardAction>
              <Badge className="bg-green-100 text-green-700">
                <ClipboardPen />
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>General Request Approved</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              68
            </CardTitle>
            <CardAction>
              <Badge className="bg-blue-100 text-blue-700">
                <BadgeCheck />
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Request Leave Approved</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              7
            </CardTitle>
            <CardAction>
              <Badge className="bg-purple-100 text-purple-700">
                <BookCheck />
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 p-5">
        <GeneralRequestChartBarByEachRoles />
        <RequestLeaveChartLineByEachRoles />
      </div>
    </div>
  );
}
