import { DashboardLayoutDesign } from "@/components/layout/design/dashboardd-layout-design";
import { ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}
export default async function layout({ children }: LayoutProps) {
  return <DashboardLayoutDesign>{children}</DashboardLayoutDesign>;
}
