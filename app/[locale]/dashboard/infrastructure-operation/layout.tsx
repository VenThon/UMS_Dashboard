import { ReactNode } from "react";

import { DashboardLayoutInfrastructureAndOperation } from "@/components/layout/infrastructure-operation/dashboardd-layout-infrastructure-operation";

interface LayoutProps {
  children: ReactNode;
}
export default async function layout({ children }: LayoutProps) {
  return (
    <DashboardLayoutInfrastructureAndOperation>
      {children}
    </DashboardLayoutInfrastructureAndOperation>
  );
}
