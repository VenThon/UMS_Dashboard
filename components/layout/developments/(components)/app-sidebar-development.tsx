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

// import { IconDatabase, IconFileWord, IconReport } from "@tabler/icons-react";
// import { NavDocuments } from "@/components/nav-document";
import { NavUser } from "@/components/nav-user";
import NavBarDashboardDevelopment from "./nav-dashboard-development";

// const data = {
//   documents: [
//     {
//       name: "Data Library",
//       href: "#",
//       icon: IconDatabase,
//     },
//     {
//       name: "Reports",
//       href: "#",
//       icon: IconReport,
//     },
//     {
//       name: "Word Assistant",
//       href: "#",
//       icon: IconFileWord,
//     },
//   ],
// };

export function AppSidebarDevelopment({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="offcanvas"
      className="text-white "
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
        <NavBarDashboardDevelopment />
        {/* <NavDocuments items={data.documents} /> */}
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
