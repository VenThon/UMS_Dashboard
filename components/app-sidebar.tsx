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
      className="bg-[#058248] dark:bg-black"
      collapsible="offcanvas"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex gap-2 text-white [&_a:hover]:bg-gray-100 [&_a:hover]:text-blue-950">
            <Image
              src="/images/logo.jpg"
              alt="logo"
              width={60}
              height={60}
              className="rounded-full"
              priority
            />
            <div className="mt-0.5">
              <p className="text-xl font-semibold">Setting Dashboard</p>
              <p className="text-md font-semibold">ផ្ទាំងគ្រប់គ្រងការកំណត់</p>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="text-3xl font-bold text-white [&_a:hover]:bg-gray-100 [&_a:hover]:text-blue-950">
        <NavBarDashboard />

        <NavDocuments items={data.documents} />
      </SidebarContent>
      <SidebarFooter className="text-white">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
