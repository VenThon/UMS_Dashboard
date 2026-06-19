"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  AudioWaveform,
  Database,
  LucideIcon,
  NotebookPen,
  Repeat,
} from "lucide-react";
import { useLocale } from "next-intl";

interface SideBarMenuBtnProps {
  href: string | string[];
  title: string;
  icon: LucideIcon;
}
const SideBarMenuBtn = ({
  href,
  title,
  icon: Icon,
  ...props
}: SideBarMenuBtnProps) => {
  const pathname = usePathname();
  const locale = useLocale();
  const params = useParams();

  const hrefs = Array.isArray(href) ? href : [href];

  // Convert dynamic paths to regex patterns
  const localizedPatterns = hrefs.map((path) => {
    const fullPath = `/${locale}${path}`;
    const regexPattern = fullPath.replace(
      /\[([^\]]+)\]/g,
      (_: string, param: string) => {
        const paramsValue = params[param];
        if (typeof paramsValue === "string") {
          return paramsValue;
        }
        return "[^/]+";
      },
    );
    return new RegExp(`^${regexPattern}$`);
  });

  const isActive = localizedPatterns.some((regex) => regex.test(pathname));

  return (
    <SidebarMenuButton
      asChild
      isActive={isActive}
      tooltip={title}
      className="text-white hover:text-black data-[active=true]:bg-[#50c9ce] data-[active=true]:text-white"
    >
      <Link href={Array.isArray(href) ? href[0] : href} {...props}>
        <Icon />
        <span>{title}</span>
      </Link>
    </SidebarMenuButton>
  );
};

export default function NavBarDashboardBusinessAndAnalysis() {
  // const sidebarT = useTranslations("sidebar");
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="font-semibold">
        Dashboard Business Analysis Team
      </SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu key="businessAnalysis">
          <SidebarMenuItem>
            <SideBarMenuBtn
              icon={Database}
              href={"/dashboard/business-analysis/statistics"}
              title="Statistics"
            />

            <SideBarMenuBtn
              icon={Repeat}
              href={[
                "/dashboard/business-analysis/general-request",
                "/dashboard/business-analysis/general-request/create",
                "/dashboard/business-analysis/general-request/[id]",
              ]}
              title="General Request"
            />
            <SideBarMenuBtn
              icon={AudioWaveform}
              href={[
                "/dashboard/business-analysis/leave-request",
                "/dashboard/business-analysis/leave-request/create",
                "/dashboard/business-analysis/leave-request/[id]",
              ]}
              title="Leave Requeat"
            />
            <SideBarMenuBtn
              icon={NotebookPen}
              href={[
                "/dashboard/business-analysis/report",
                "/dashboard/business-analysis/report/create",
                "/dashboard/business-analysis/report/[id]",
              ]}
              title="Dialy Rport"
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
