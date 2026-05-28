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

import { IconDatabase, IconFileWord, IconReport } from "@tabler/icons-react";

import NavBarDashboard from "./nav-dashboard";
import { NavDocuments } from "./nav-document";
import { NavUser } from "./nav-user";

const data = {
  documents: [
    {
      name: "Data Library",
      href: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      href: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      href: "#",
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="offcanvas"
      className="text-white"
      style={
        {
          "--sidebar": "#058248",
          "--sidebar-foreground": "#ffffff",
          "--sidebar-accent": "#f3f4f6",
          "--sidebar-accent-foreground": "#172554",
        } as React.CSSProperties
      }
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="p-1 group-data-[collapsible=icon]:sm:flex lg:flex group-data-[collapsible=icon]:lg:hidden">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={60}
              height={60}
              className="rounded-full"
              priority
            />
            <div className="mt-0.5">
              <p className="text-xl font-semibold text-white">Dashboard</p>
              <p className="text-md font-semibold text-white">
                ផ្ទាំងគ្រប់គ្រងការកំណត់
              </p>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="font-bold">
        <NavBarDashboard />
        <NavDocuments items={data.documents} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
