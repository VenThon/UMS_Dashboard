import { UserRole } from "@/db/types/user.type";
import { getUserFromRequest } from "@/lib/auth/verify";

import { RequestLeaveListing } from "../(components)/request-leave/request-leave-listing";

export default async function Page() {
  const user = await getUserFromRequest();
  if (!user) {
    return (
      <section className="p-4">
        <p className="text-sm text-red-500">Unauthorized.</p>
      </section>
    );
  }
  return (
    <RequestLeaveListing
      currentUserId={user.id}
      currentUserRole={user.role as UserRole}
    />
  );
}
