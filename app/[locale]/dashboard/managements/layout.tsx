import { ReactNode } from "react";

import { DashboardLayoutManagement } from "@/components/layout/managements/dashboardd-layout-management";

interface LayoutProps {
  children: ReactNode;
}
export default async function layout({ children }: LayoutProps) {
  return <DashboardLayoutManagement>{children}</DashboardLayoutManagement>;
}
