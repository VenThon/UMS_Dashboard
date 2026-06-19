"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  AudioWaveform,
  ChevronRight,
  Database,
  LucideIcon,
  NotebookPen,
  Repeat,
  SquareTerminal,
  User2,
  UserCheckIcon,
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

export default function NavBarDashboardCTO() {
  const items = [
    {
      title: "Management",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "General Request",
          url: "#",
          icon: User2,
        },
        {
          title: "Leave Request",
          url: "#",
          icon: UserCheckIcon,
        },
        {
          title: "Dialy Report",
          url: "#",
          icon: UserCheckIcon,
        },
      ],
    },
  ];
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel className="font-semibold">
          Dashboard CTO
        </SidebarGroupLabel>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu key="cto">
            <SidebarMenuItem>
              <SideBarMenuBtn
                icon={Database}
                href={"/dashboard/cto/statistics"}
                title="Statistics"
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarContent>
          <SidebarMenu>
            {items.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible rounded transition-colors data-[state=open]:bg-black/35"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="text-white"
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SideBarMenuBtn
                            title={subItem.title}
                            href={subItem.url}
                            icon={subItem.icon}
                          />
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel className="font-semibold">
          Data From Management Team
        </SidebarGroupLabel>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu key="approved">
            <SidebarMenuItem>
              <SideBarMenuBtn
                icon={Database}
                href={"/dashboard/cto/report"}
                title="Report"
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel className="font-semibold">
          Overall Overview
        </SidebarGroupLabel>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            <SidebarMenuItem key="report">
              <SideBarMenuBtn
                icon={NotebookPen}
                href={"/dashboard/cto/report"}
                title="Dialy Report"
              />
            </SidebarMenuItem>
            <SidebarMenuItem key="request">
              <SideBarMenuBtn
                icon={AudioWaveform}
                href={"/dashboard/cto/leave-request"}
                title="Leave Request"
              />
            </SidebarMenuItem>
            <SidebarMenuItem key="genrequest">
              <SideBarMenuBtn
                icon={Repeat}
                href={"/dashboard/cto/general-request"}
                title="General Request"
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
