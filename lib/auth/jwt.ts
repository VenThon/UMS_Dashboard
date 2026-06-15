import { UserRole } from "@/db/types/user.type";

import jwt from "jsonwebtoken";

type TokenPayload = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
};

export function generateAccessToken(payload: TokenPayload) {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
}
