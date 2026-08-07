import { UserRole } from "@/db/types/user.type";

export function validationUserRoles(
  userRole: string,
  alloweRoles: readonly UserRole[],
) {
  return alloweRoles.includes(userRole as UserRole);
}
