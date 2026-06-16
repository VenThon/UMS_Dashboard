"use client";

import * as React from "react";

import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavUser } from "@/components/nav-user";
import NavBarDashboardInfrastructureAndOperation from "./nav-dashboard-infrastructure-operation";

export function AppSidebarInfrastructureAndOperation({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="offcanvas"
      className="text-sidebar-foreground"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="p-1  group-data-[collapsible=icon]:sm:flex lg:flex gap-2 group-data-[collapsible=icon]:lg:hidden">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={60}
              height={60}
              className="rounded-full"
              priority
            />
            <div className="mt-1">
              <p className="text-md font-semibold text-white">
                Staff Management
              </p>
              <p className="text-md font-semibold text-white">
                ប្រព័ន្ធគ្រប់គ្រងបុគ្គលិក
              </p>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="font-bold">
        <NavBarDashboardInfrastructureAndOperation />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
