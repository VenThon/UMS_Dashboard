"use client";

import { ReactNode } from "react";

import { AppSidebar } from "../app-sidebar";

import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { SiteHeader } from "../site-header";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex-1 overflow-auto p-4 md:p-6"> {children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
