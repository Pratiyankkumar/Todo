import { z } from "zod";

export const CreateUserRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  lastName: z.string().min(1, "Last name too short").optional(),
  password: z.string().min(7, "Password should have atleast 7 letters"),
});

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;
