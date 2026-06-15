import { cookies } from "next/headers";

import jwt from "jsonwebtoken";

export async function getUserFromRequest() {
  const token = (await cookies()).get("token")?.value;

  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      username: string;
      email: string;
      role: string;
    };
  } catch {
    return null;
  }
}
