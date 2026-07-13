import { type ClassValue, clsx } from "clsx";
import { Locale, format } from "date-fns";
import { enUS, km } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

interface FormatDateOptions {
  formatStr?: string; // date-fns format string
  localeCode?: string;
  isUtc?: boolean;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const numberFormatters = {
  en: new Intl.NumberFormat("en", { useGrouping: false }),
  km: new Intl.NumberFormat("km-KH", {
    numberingSystem: "khmr",
    useGrouping: false,
  }),
} as const;

export function formatNumberByLocale(
  value: number,
  locale: string = "en",
): string {
  const key = locale === "km" ? "km" : "en";
  return numberFormatters[key].format(value);
}

export function formatDate(
  input: string | Date,
  options: FormatDateOptions = {},
): string {
  const { formatStr = "yyyy-MM-dd", localeCode = "en" } = options;

  const date = new Date(input);
  if (isNaN(date.getTime())) return "";

  const localeMap: Record<string, Locale> = {
    en: enUS,
    km: km,
  };

  const selectedLocale = localeMap[localeCode.split("-")[0]] || enUS;

  return format(date, formatStr, {
    locale: selectedLocale,
  });
}
