"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FileUser, ImagePlus, MonitorSmartphone, Repeat } from "lucide-react";

import { ChangePWD } from "./change-pwd";
import { Devices } from "./devices";
import ImageUpload from "./uploadProfile";
import { UserInformation } from "./user-information";

export function SettingComponent() {
  return (
    <div className="mt-2">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and customize your dashboard
          experience.
        </p>
      </div>
      <Tabs defaultValue="profile" className="mt-6 w-full">
        <TabsList>
          <TabsTrigger value="profile">
            <FileUser />
            Profile
          </TabsTrigger>
          <TabsTrigger value="profilepic">
            {" "}
            <ImagePlus />
            Image
          </TabsTrigger>
          <TabsTrigger value="changepwd">
            <Repeat />
            Change Password
          </TabsTrigger>
          <TabsTrigger value="devices">
            {" "}
            <MonitorSmartphone />
            Devices
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <UserInformation />
        </TabsContent>
        <TabsContent value="profilepic">
          <ImageUpload />
        </TabsContent>
        <TabsContent value="changepwd">
          <ChangePWD />
        </TabsContent>
        <TabsContent value="devices">
          <Devices />
        </TabsContent>
      </Tabs>
    </div>
  );
}
