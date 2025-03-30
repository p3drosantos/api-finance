import z from "zod";

export const createUserSchema = z.object({
  firstName: z
    .string({ required_error: "first name is required" })
    .trim()
    .min(1, { message: "first name is required" }),
  lastName: z
    .string({ required_error: "last name is required" })
    .trim()
    .min(1, { message: "last name is required" }),
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .min(1, { message: "email is required" })
    .email({ message: "invalid email" }),
  password: z
    .string({ required_error: "password is required" })
    .trim()
    .min(6, { message: "password must have at least 6 characters" }),
});
