import { DashboardLayout } from "@/components/layout/admin/dashboard-layout";
import { ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}
export default async function layout({ children }: LayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
