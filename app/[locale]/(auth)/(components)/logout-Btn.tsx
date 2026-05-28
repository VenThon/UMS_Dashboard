"use client";

import { useParams } from "next/navigation";
import { useLogout } from "./logout";

export default function LogoutButton() {
  const params = useParams();
  const locale = params.locale as string;

  const { logout } = useLogout(locale);

  return <button onClick={logout}>Logout</button>;
}
