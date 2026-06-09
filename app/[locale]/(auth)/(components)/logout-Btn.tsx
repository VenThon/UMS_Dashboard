// "use client";

// import { useParams } from "next/navigation";
// import { useLogout } from "./logout";

// export default function LogoutButton() {
//   const params = useParams();
//   const locale = params.locale as string;

//   const { logout } = useLogout(locale);

//   return <button onClick={logout}>Logout</button>;
// }
"use client";

import { useParams } from "next/navigation";
import { useLogout } from "./logout";

export default function LogoutButton() {
  const { locale } = useParams<{ locale: string }>();

  // const { logout } = useLogout(locale);
  const { logout, isLoggingOut } = useLogout(locale);
  return (
    <button onClick={() => logout()} disabled={isLoggingOut}>
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
}
