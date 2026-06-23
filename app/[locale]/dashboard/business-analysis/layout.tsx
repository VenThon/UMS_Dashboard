import { ReactNode } from "react";

import { DashboardLayoutBusinessAndAnalysis } from "@/components/layout/business-analysis/dashboardd-layout-business-analysis";

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
