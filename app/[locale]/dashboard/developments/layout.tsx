import { ReactNode } from "react";

import { DashboardLayoutDevelopment } from "@/components/layout/developments/dashboard-layout-development";

interface LayoutProps {
  children: ReactNode;
}
export default async function layout({ children }: LayoutProps) {
  return <DashboardLayoutDevelopment>{children}</DashboardLayoutDevelopment>;
}
