import { parsePhoneNumber } from "libphonenumber-js";

export function getCountryCode(phoneNumber?: string | null) {
  if (!phoneNumber) return null;
  try {
    return parsePhoneNumber(phoneNumber);
  } catch {
    return null;
  }
}
