"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LaptopMinimal } from "lucide-react";

import { TerminateAllsDeviceDialog } from "./terminate-all-device-dialog";
import { TerminateSingleDeviceDialog } from "./terminate-single-device-dialog";

export function Devices() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Devices</CardTitle>
        <CardDescription>
          Here are all the devices that are currently logged in to your account.
          If you see anything you don’t recognize, you can sign out of that
          device or log out everywhere.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground space-y-4 text-sm">
        <div className="space-y-2">
          <h3 className="text-md font-semibold">Current Device</h3>
          <Card className="relative p-4">
            <div className="flex items-center gap-4">
              <LaptopMinimal className="h-6 w-6" />
              <div>
                <p>Chrome 148 on macOS 10.15.7</p>
                <span>IP: 192.168.0.0.0.1</span>
              </div>
            </div>
          </Card>
        </div>
        <div className="space-y-2">
          <h3 className="text-md font-semibold">Other Devices</h3>
          <Card className="relative p-4">
            {/* <X className="absolute right-4 top-4 cursor-pointer w-4 h-4" /> */}
            <div className="absolute top-4 right-4 cursor-pointer">
              <TerminateSingleDeviceDialog />
            </div>
            <div className="flex items-center gap-4">
              <LaptopMinimal className="h-6 w-6" />
              <div>
                <p>Chrome 148 on macOS 10.15.7</p>
                <span>IP: 192.168.0.0.0.1</span>
              </div>
            </div>
          </Card>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 border-t pt-6">
        <div className="space-y-1">
          <h3 className="text-base font-semibold">Sign Out of All Devices</h3>

          <p className="text-muted-foreground text-sm">
            This will sign you out from all other active devices. You will need
            to log in again on those devices.
          </p>
        </div>
        <TerminateAllsDeviceDialog />
      </CardFooter>
    </Card>
  );
}
