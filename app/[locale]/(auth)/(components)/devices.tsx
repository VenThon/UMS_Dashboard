"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Devices() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Devices</CardTitle>
        <CardDescription>
          Manage your account preferences and options. Customize your experience
          to fit your needs.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Configure notifications, security, and themes.
      </CardContent>
    </Card>
  );
}
