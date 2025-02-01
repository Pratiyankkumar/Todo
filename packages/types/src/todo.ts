import { z } from "zod";

export const CreateTodoSchema = z.object({
  title: z.string().min(2, "Please enter the descriptive title"),
  description: z.string().min(4, "Please enter the descriptive description"),
  dueDate: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, "Invalid date format"), // Keep as string for input validation
  priority: z.enum(["High", "Medium", "Low"]).default("Low"),
  category: z.enum(["Work", "Personal", "Household"]).default("Work"),
  status: z
    .enum(["InProgress", "NotStarted", "Completed"])
    .default("NotStarted"),
});

export type CreateTodo = z.infer<typeof CreateTodoSchema>;
