import { DashboardLayoutSupport } from "@/components/layout/support/dashboardd-layout-support";
import { ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}
export default async function layout({ children }: LayoutProps) {
  return <DashboardLayoutSupport>{children}</DashboardLayoutSupport>;
}
