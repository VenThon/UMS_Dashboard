import { DashboardLayoutManagement } from "@/components/layout/managements/dashboardd-layout-management";
import { ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}
export default async function layout({ children }: LayoutProps) {
  return <DashboardLayoutManagement>{children}</DashboardLayoutManagement>;
}
