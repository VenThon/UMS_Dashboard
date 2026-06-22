import { ReactNode } from "react";

import { DashboardLayoutQualityAndAssurance } from "@/components/layout/quality-assurance/dashboardd-layout-quality-assurance";

interface LayoutProps {
  children: ReactNode;
}
export default async function layout({ children }: LayoutProps) {
  return (
    <DashboardLayoutQualityAndAssurance>
      {children}
    </DashboardLayoutQualityAndAssurance>
  );
}
