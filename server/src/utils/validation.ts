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

export const projectSchema = z.object({
  user: z.string().min(1, "User is required"),
  title: z.string().min(1, "Title is needed"),
  description: z.string().min(1, "Description is needed"),
  techStack: z.array(z.string().min(1, "Tech cannot be empty"))
    .min(1, "Tech Stack cannot be empty"),
});