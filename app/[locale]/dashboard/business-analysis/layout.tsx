import { DashboardLayoutBusinessAndAnalysis } from "@/components/layout/business-analysis/dashboardd-layout-business-analysis";
import { ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}
export default async function layout({ children }: LayoutProps) {
  return (
    <DashboardLayoutBusinessAndAnalysis>
      {children}
    </DashboardLayoutBusinessAndAnalysis>
  );
}
