import { z } from "zod";

export type requiterFormData = z.infer<typeof requiterFormSchema>;
export type addBusinessFormData = z.infer<typeof addBusinessSchema>;

export const requiterFormSchema = z.object({
  firstName: z
    .string({ required_error: "first name is required" })
    .min(3, "Must be 3 or more characters long")
    .max(20, "Must be less than 20 characters")
    .optional(),
  lastName: z
    .string({ required_error: "first name is required" })
    .min(3, "Must be 3 or more characters long")
    .max(20, "Must be less than 20 characters")
    .optional(),
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
  role: z.enum(["REQUITER", "ADMIN"]).default("REQUITER"),
});

export const addBusinessSchema = z.object({
  name: z.string().min(1, "Product Name is required"),
  category: z.string().min(1, "Please select a category"),
  about: z.string().min(1, "Description is required"),
  address: z.string().min(1, "address is required"),
  images: z.any(),
});
