"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ChangePWD() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Generate and download your detailed reports. Export data in multiple
          formats for analysis.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        You have 5 reports ready and available to export.
      </CardContent>
    </Card>
  );
}
