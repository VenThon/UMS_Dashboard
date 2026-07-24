// lib/auth/require-current-user.ts
import { AuthenticationError } from "./auth-error";
import { getUserFromRequest } from "./verify";

export async function requireCurrentUser() {
  const currentUser = await getUserFromRequest();

  if (!currentUser) {
    throw new AuthenticationError();
  }

  return currentUser;
}
