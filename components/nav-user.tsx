"use client";

import { useEffect, useState } from "react";

import LogoutButton from "@/app/[locale]/(auth)/(components)/logout-Btn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "@/i18n/navigation";
import { roleSettingRoutes } from "@/lib/validation/route-by-role";
import { UserProfileService } from "@/service/auth/auth.service";

import { ChevronsUpDown, LogOut, Settings } from "lucide-react";

import { Badge } from "./ui/badge";

type ProfileUser = {
  username: string;
  email: string;
  role: string;
};

export function NavUser() {
  const { isMobile } = useSidebar();
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await UserProfileService();
        setUser(res.user);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  const displayName = loading ? "Loading..." : (user?.username ?? "Guest?");
  const displayEmail = loading ? "..." : (user?.email ?? "Email?");
  // const avatarFallback = user?.username?.charAt(0).toUpperCase() ?? "U?";
  const avatarFallback = user?.username?.slice(0, 2).toUpperCase() ?? "U?";
  const displayRole = loading ? "..." : (user?.role ?? "Role?");
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-9 w-9 rounded-full">
                <AvatarImage src="" alt="Your name" />
                <AvatarFallback className="rounded-full">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayName}</span>
                <span className="truncate text-xs">{displayEmail}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src="" alt="Your name" />
                  <AvatarFallback className="rounded-full">
                    {avatarFallback}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayName}</span>
                  <span className="truncate text-sm">{displayEmail}</span>
                  <Badge variant="destructive">{displayRole}</Badge>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                {user && (
                  <Link href={roleSettingRoutes[user.role]}>
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                )}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
