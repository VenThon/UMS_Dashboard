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

export default function NavBarDashboardInfrastructureAndOperation() {
  // const sidebarT = useTranslations("sidebar");
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="font-semibold">
        Dashboard Infrastructure Operation Team
      </SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu key="infrastructure">
          <SidebarMenuItem>
            <SideBarMenuBtn
              icon={Database}
              href={"/dashboard/infrastructure-operation/statistics"}
              title="Statistics"
            />

            <SideBarMenuBtn
              icon={Repeat}
              href={[
                "/dashboard/infrastructure-operation/general-request",
                "/dashboard/infrastructure-operation/general-request/create",
                "/dashboard/infrastructure-operation/general-request/[id]",
              ]}
              title="General Request"
            />
            <SideBarMenuBtn
              icon={AudioWaveform}
              href={[
                "/dashboard/infrastructure-operation/leave-request",
                "/dashboard/infrastructure-operation/leave-request/create",
                "/dashboard/infrastructure-operation/leave-request/[id]",
              ]}
              title="Leave Requeat"
            />
            <SideBarMenuBtn
              icon={NotebookPen}
              href={[
                "/dashboard/infrastructure-operation/report",
                "/dashboard/infrastructure-operation/report/create",
                "/dashboard/infrastructure-operation/report/[id]",
              ]}
              title="Dialy Rport"
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
