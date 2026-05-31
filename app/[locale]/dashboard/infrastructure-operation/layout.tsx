import { DashboardLayoutInfrastructureAndOperation } from "@/components/layout/infrastructure-operation/dashboardd-layout-infrastructure-operation";
import { ReactNode } from "react";
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
