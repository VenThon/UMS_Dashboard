"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import {
  AudioWaveform,
  ChartNoAxesCombined,
  LucideIcon,
  NotebookPen,
  Repeat,
} from "lucide-react";
import { useLocale } from "next-intl";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

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

export default function NavBarDashboardDevelopment() {
  // const sidebarT = useTranslations("sidebar");
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="font-semibold">
        Dashboard Development Team
      </SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu key="developments">
          <SidebarMenuItem>
            <SideBarMenuBtn
              icon={ChartNoAxesCombined}
              href={"/dashboard/developments/statistics"}
              title="Statistics"
            />

            <SideBarMenuBtn
              icon={Repeat}
              href={[
                "/dashboard/developments/request",
                "/dashboard/developments/request/create",
                "/dashboard/developments/request/[id]",
              ]}
              title="General Request"
            />
            <SideBarMenuBtn
              icon={AudioWaveform}
              href={[
                "/dashboard/developments/request-leave",
                "/dashboard/developments/request-leave/create",
                "/dashboard/developments/request-leave/[id]",
              ]}
              title="Leave Requeat"
            />
            <SideBarMenuBtn
              icon={NotebookPen}
              href={[
                "/dashboard/developments/report",
                "/dashboard/developments/report/create",
                "/dashboard/developments/report/[id]",
              ]}
              title="Dialy Rport"
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
