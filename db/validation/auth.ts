import { z } from "zod";
export const logInSchema = z.object({
    username:z.string().trim().min(1, "Username is required"),
    password:z.string().trim().min(1, "Password is required")
})

export type LogInInput = z.infer<typeof logInSchema>