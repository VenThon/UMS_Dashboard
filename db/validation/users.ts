import z from "zod";

import { UnderTeamEnum } from "../types/team.type";
import { UserRoleEnum } from "../types/user.type";

export const createUserSchema = z.object({
  username: z.string().min(2, "username is required"),
  email: z.string().email({ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }),
  password: z.string().min(6),
  role: UserRoleEnum,
  team: UnderTeamEnum,
  phoneNumber: z
    .string()
    .regex(/^[0-9+]+$/, "Invalid phone number")
    .max(20),
});

// export const createUsersSchema= createInsertSchema(usersTable)

export const updateUserSchema = z.object({
  username: z.string().min(2).optional(),
  email: z.string().email().optional(),
  role: UserRoleEnum.optional(),
  team: UnderTeamEnum.optional(),
  phoneNumber: z
    .string()
    .regex(/^[0-9+]+$/, "Invalid phone number")
    .max(20)
    .optional(),
  isActive: z.boolean().optional(),
});

export type createUserInput = z.infer<typeof createUserSchema>;
export type updateUserInput = z.infer<typeof updateUserSchema>;
