import { formatNumberByLocale } from "@/lib/utils";

import { getLocale } from "next-intl/server";

export default async function SiteFooter() {
  const locale = await getLocale();
  const currentYear = formatNumberByLocale(new Date().getFullYear(), locale);

  return (
    <div className="flex items-center gap-2">
      <p className="text-xs">
        &copy; {currentYear} Powered by {""}
        <a
          href="mailto:example@gmail.com"
          className="text-primary text-xs font-bold underline"
          target="_blank"
        >
          VenThon
        </a>
      </p>
    </div>
  );
}
