import { z } from "zod";

export const requiterFormSchema = z.object({
  companyName: z
    .string({ required_error: "Company Name is required" })
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
  companyLogo: z
    .any()
    .refine((file) => file?.[0]?.size < 500000, "File can't be bigger than 5MB")
    .refine(
      (file) => ["image/jpg", "image/png", "image/jepg"].includes(file.type),
      "file formate must be either jpg, jepg or png"
    ),
});
