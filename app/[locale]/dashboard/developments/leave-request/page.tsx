import type { UserRole } from "@/db/types/user.type";
import { USER_ROLE } from "@/db/types/user.type";
import { getUserFromRequest } from "@/lib/auth/verify";

import { RequestLeaveListing } from "../(components)/request-leave/request-leave-listing";

function isUserRole(role: string): role is UserRole {
  return Object.values(USER_ROLE).includes(role as UserRole);
}

export default async function Page() {
  const user = await getUserFromRequest();

  if (!user) {
    return (
      <section className="p-4">
        <p className="text-sm text-red-500">Unauthorized.</p>
      </section>
    );
  }

  if (!isUserRole(user.role)) {
    return (
      <section className="p-4">
        <p className="text-sm text-red-500">Invalid user role.</p>
      </section>
    );
  }

  return (
    <RequestLeaveListing currentUserId={user.id} currentUserRole={user.role} />
  );
}
