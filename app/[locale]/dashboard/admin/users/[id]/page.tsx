import { getUserById } from "@/lib/repositories/user.repository";

import { UsersUpdateInformation } from "../../(components)/users-update";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const user = await getUserById(id);

  if (!user) {
    return <div>User not found</div>;
  }

  return <UsersUpdateInformation id={id} user={user} />;
}
