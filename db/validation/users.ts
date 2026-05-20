import z from "zod";
import { UserRoleEnum } from "../types/user.type";

export const createUserSchema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: UserRoleEnum,
});

export const updateUserSchema = z.object({
  username: z.string().min(2).optional(),
  email: z.string().email().optional(),
  role: UserRoleEnum.optional(),
  isActive: z.boolean().optional(),
});