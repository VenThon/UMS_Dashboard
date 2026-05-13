import { useLocale } from "next-intl";

import { enFlag, kmFlag } from "./lang-logo";
import LocaleSwitcherSelect from "./lang-switcher";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const toggleLocale = locale === "km" ? "en" : "km";
  const flagIcon = locale === "km" ? enFlag : kmFlag;

  return (
    <LocaleSwitcherSelect locale={toggleLocale}>
      {flagIcon}
    </LocaleSwitcherSelect>
  );
}
