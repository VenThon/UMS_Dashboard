
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

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