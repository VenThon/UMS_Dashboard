"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";

import LocaleSwitcher from "./lang/local-switcher";
import { ModeToggle } from "./theme/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
