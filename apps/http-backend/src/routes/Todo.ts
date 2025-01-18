import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCode } from "../constants/statusCodes";
import { sendErrorResponse } from "../utils/responseHelpers";
import authMiddleware from "../middleware/authMiddleware";
import { z } from "zod";

const prisma = new PrismaClient();

const router = express.Router();

const CreateTodoSchema = z.object({
  title: z.string().min(2, "Please enter the descriptive title"),
  description: z.string().min(4, "Please enter the descriptive description"),
  dueDate: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, "Invalid date format"), // Keep as string for input validation
  priority: z.enum(["High", "Medium", "Low"]).default("Low"),
  category: z.enum(["Work", "Personal", "Household"]).default("Work"),
  status: z
    .enum(["InProgress", "NotStarted", "Completed"])
    .default("NotStarted"),
});

type CreateTodo = z.infer<typeof CreateTodoSchema>;

router.post(
  "/todo",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(StatusCode.UNAUTHORIZED).json({ message: "Unauthorized" });
        return;
      }

      const validData = CreateTodoSchema.parse(req.body);

      // Create the todo with parsed date
      const todo = await prisma.todo.create({
        data: {
          ...validData,
          authorId: userId,
        },
      });

      res.status(StatusCode.CREATED).send(todo);
    } catch (error) {
      sendErrorResponse(error, res);
    }
  }
);

router.get(
  "/todo",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;

      const todos = await prisma.todo.findMany({
        where: {
          authorId: userId,
        },
      });

      if (todos.length === 0) {
        res
          .status(StatusCode.NOT_FOUND)
          .json({ error: "There were no todo's for this user " });
        return;
      }

      res.send(todos);
    } catch (error) {
      sendErrorResponse(error, res);
    }
  }
);

const UpdateTodoSchema = CreateTodoSchema.partial();

type UpdateTodoReq = z.infer<typeof UpdateTodoSchema>;

router.patch(
  "/todo/:todoId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const inputData = req.body;

      const validData = UpdateTodoSchema.parse(inputData);

      const updatedTodo = await prisma.todo.update({
        where: {
          id: Number(req.params.todoId),
          authorId: req.user?.id,
        },
        data: validData,
      });

      if (!updatedTodo) {
        res
          .status(StatusCode.NOT_FOUND)
          .json({ message: "Unable to find your todo" });
        return;
      }

      res.status(StatusCode.OK).send(updatedTodo);
    } catch (error) {
      sendErrorResponse(error, res);
    }
  }
);

router.delete(
  "/todo/:todoId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const todo = await prisma.todo.delete({
        where: {
          id: Number(req.params.todoId),
          authorId: req.user?.id,
        },
      });

      res.status(StatusCode.OK).send({ message: "Todo deleted successfull" });
    } catch (error) {
      sendErrorResponse(error, res);
    }
  }
);

export default router;
