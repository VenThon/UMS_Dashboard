import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
