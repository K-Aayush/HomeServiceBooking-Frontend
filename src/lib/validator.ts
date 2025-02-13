import { z } from "zod";

export type requiterFormData = z.infer<typeof requiterFormSchema>;

export const requiterFormSchema = z.object({
  firstName: z
    .string({ required_error: "first name is required" })
    .min(3, "Must be 3 or more characters long")
    .max(20, "Must be less than 20 characters"),
  lastName: z
    .string({ required_error: "first name is required" })
    .min(3, "Must be 3 or more characters long")
    .max(20, "Must be less than 20 characters"),
  email: z.string({ required_error: "Email is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(3, "Must be 3 or more characters long")
    .max(20, "Must be less than 20 characters")
    .refine(
      (password) => /[A-Z]/.test(password),
      "Must contain one capital letter"
    )
    .refine(
      (password) => /[a-z]/.test(password),
      "Must contain one small letter"
    )
    .refine((password) => /[0-9]/.test(password), "Must contain one number")
    .refine(
      (password) => /[!@#$%^&*]/.test(password),
      "Must contain one special character"
    ),
  profile: z.any().optional(),
  contactNumber: z.string().optional(),
});
