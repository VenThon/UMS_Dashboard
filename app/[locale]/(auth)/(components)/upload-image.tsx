"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function UploadImage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
        <CardDescription>
          Track performance and user engagement metrics. Monitor trends and
          identify growth opportunities.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Page views are up 25% compared to last month.
      </CardContent>
    </Card>
  );
}
