import { ReactNode } from "react";

import { DashboardLayout } from "@/components/layout/admin/dashboard-layout";

interface LayoutProps {
  children: ReactNode;
}
export default async function layout({ children }: LayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
