import { DashboardLayoutDevelopment } from "@/components/layout/developments/dashboard-layout-development";
import { ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}
export default async function layout({ children }: LayoutProps) {
  return <DashboardLayoutDevelopment>{children}</DashboardLayoutDevelopment>;
}
