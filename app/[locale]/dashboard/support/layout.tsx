import { ReactNode } from "react";

import { DashboardLayoutSupport } from "@/components/layout/support/dashboardd-layout-support";

interface LayoutProps {
  children: ReactNode;
}
export default async function layout({ children }: LayoutProps) {
  return <DashboardLayoutSupport>{children}</DashboardLayoutSupport>;
}
