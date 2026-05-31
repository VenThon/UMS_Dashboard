import z from "zod";
import { UserRoleEnum } from "../types/user.type";
import { UnderTeamEnum } from "../types/team.type";

export const createUserSchema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: UserRoleEnum,
  team:UnderTeamEnum,
  phoneNumber: z
  .string()
  .regex(/^[0-9+]+$/, "Invalid phone number")
  .max(20),
});

export const updateUserSchema = z.object({
  username: z.string().min(2).optional(),
  email: z.string().email().optional(),
  role: UserRoleEnum.optional(),
  team:UnderTeamEnum.optional(),
  phoneNumber: z
  .string()
  .regex(/^[0-9+]+$/, "Invalid phone number")
  .max(20).optional(),
  isActive: z.boolean().optional(),
});