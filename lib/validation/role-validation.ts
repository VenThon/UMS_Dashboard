import { UserRole } from "@/db/types/user.type";

export function validationUserRoles(userRole: string, alloweRoles: UserRole[]) {
  return alloweRoles.includes(userRole as UserRole);
}
