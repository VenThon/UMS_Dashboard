import { DashboardLayoutCTO } from "@/components/layout/cto/dashboardd-layout-cto";
import { ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}
export default async function layout({ children }: LayoutProps) {
  return <DashboardLayoutCTO>{children}</DashboardLayoutCTO>;
}
