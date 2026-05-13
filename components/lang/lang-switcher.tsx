"use client";

import { type ReactNode, useTransition } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  children: ReactNode;
  locale: string;
};

export default function LocaleSwitcherSelect({ children, locale }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function onToggleLocale() {
    startTransition(() => {
      const segments = pathname.split("/");
      segments[1] = locale;
      const newPath = segments.join("/");

      const query = searchParams.toString();
      const fullPath = query ? `${newPath}?${query}` : newPath;

      router.replace(fullPath);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      className={`relative shrink-0 rounded-sm px-2 ${isPending ? "opacity-30" : ""}`}
      onClick={onToggleLocale}
      disabled={isPending}
      aria-label={`Switch to ${locale}`}
    >
      {children}
    </button>
  );
}
