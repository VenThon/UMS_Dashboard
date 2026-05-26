"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { BarChart2, Database, LucideIcon, PanelsTopLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import {
  SidebarGroup,
  SidebarGroupContent,
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

export default function NavBarDashboardAdmin() {
  const sidebarT = useTranslations("sidebar");
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu key="lifecycle">
          <SidebarMenuItem>
            <SideBarMenuBtn
              icon={Database}
              href={"/dashboard/admin/statistics"}
              title="Statistics"
            />

            <SideBarMenuBtn
              icon={PanelsTopLeft}
              href={[
                "/dashboard/admin/users",
                "/dashboard/admin/users/create",
                "/dashboard/admin/users/[id]",
              ]}
              title="Users"
            />

            <SideBarMenuBtn
              icon={BarChart2}
              href={"/dashboard/analytic"}
              title={sidebarT("analytics")}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
