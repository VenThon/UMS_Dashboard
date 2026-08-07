import type { UserRole } from "@/db/types/user.type";
import { getUserFromRequest } from "@/lib/auth/verify";

import { GeneralRequestListing } from "../(components)/general-request/general-request-listing";

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
    <GeneralRequestListing
      currentUserId={user.id}
      currentUserRole={user.role as UserRole}
    />
  );
}
