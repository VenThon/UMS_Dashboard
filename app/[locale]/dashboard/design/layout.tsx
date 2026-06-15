import { ReactNode } from "react";

import { DashboardLayoutDesign } from "@/components/layout/design/dashboardd-layout-design";

interface LayoutProps {
  children: ReactNode;
}
export default async function layout({ children }: LayoutProps) {
  return <DashboardLayoutDesign>{children}</DashboardLayoutDesign>;
}
