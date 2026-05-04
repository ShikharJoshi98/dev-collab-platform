import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, "Name Required"),
    email: z.string().email("Invalid Email"),
    password: z.string().min(1, "Password Required")
});

export const loginSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(1, "Password Required")
})