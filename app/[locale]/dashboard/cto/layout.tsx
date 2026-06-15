import { ReactNode } from "react";

import { DashboardLayoutCTO } from "@/components/layout/cto/dashboardd-layout-cto";

interface LayoutProps {
  children: ReactNode;
}
export default async function layout({ children }: LayoutProps) {
  return <DashboardLayoutCTO>{children}</DashboardLayoutCTO>;
}
