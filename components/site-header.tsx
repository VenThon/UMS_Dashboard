"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import LocaleSwitcher from "./lang/local-switcher";
import { ModeToggle } from "./theme/theme-toggle";
import { useEffect, useState } from "react";
import { UserProfileService } from "@/service/auth/auth.service";
type UserRoles = {
  role: string;
};

export function SiteHeader() {
  // const t = useTranslations("HomePage");
  const [user, setUser] = useState<UserRoles | null>(null);
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

  const displayRole = loading ? "..." : (user?.role ?? "Role");
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-semibold">
          Role:{" "}
          {displayRole
            .replaceAll("_", " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())}
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
