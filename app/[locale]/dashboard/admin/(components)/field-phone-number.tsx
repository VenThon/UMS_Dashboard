"use client";

import type { CountryCode, E164Number } from "libphonenumber-js";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

type PhoneInputProps = {
  value?: string;
  onChange: (value?: E164Number) => void;
  defaultCountry?: CountryCode;
};

export function PhoneNumberInput({
  value,
  onChange,
  defaultCountry = "KH",
}: PhoneInputProps) {
  return (
    <PhoneInput
      international
      defaultCountry={defaultCountry}
      value={value}
      onChange={onChange}
      className="flex w-full"
    />
  );
}
