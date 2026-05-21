"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import {
  BarChart2,
  Database,
  FileText,
  GitPullRequest,
  LibraryBig,
  LucideIcon,
  PersonStanding,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

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
      className="text-white hover:text-white data-[active=true]:bg-[#50c9ce] data-[active=true]:text-white"
    >
      <Link href={Array.isArray(href) ? href[0] : href} {...props}>
        <Icon />
        <span>{title}</span>
      </Link>
    </SidebarMenuButton>
  );
};

export default function NavBarDashboard() {
  const sidebarT = useTranslations("sidebar");
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu key="lifecycle">
          <SidebarMenuItem>
            <SideBarMenuBtn
              icon={Database}
              href={"/dashboard"}
              title={sidebarT("dashboard")}
            />
            <SideBarMenuBtn
              icon={FileText}
              href={[
                "/dashboard/lifecycle",
                "/dashboard/lifecycle/create",
                "/dashboard/lifecycle/[id]",
              ]}
              title={sidebarT("lifeCycle")}
            />
            <SideBarMenuBtn
              icon={LibraryBig}
              href={[
                "/dashboard/subject",
                "/dashboard/subject/create",
                "/dashboard/subject/[id]",
              ]}
              title="Subject"
            />
            <SideBarMenuBtn
              icon={PersonStanding}
              href={[
                "/dashboard/staff",
                "/dashboard/staff/create",
                "/dashboard/staff/edit/[id]",
              ]}
              title="Staff"
            />
            <SideBarMenuBtn
              icon={GitPullRequest}
              href={[
                "/dashboard/request",
                "/dashboard/request/create",
                "/dashboard/request/edit/[id]",
              ]}
              title="Request"
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
