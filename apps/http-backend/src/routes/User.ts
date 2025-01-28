import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCode } from "../constants/statusCodes";
import { sendErrorResponse } from "../utils/responseHelpers";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware";
import {
  CreateUserRequestSchema,
  LoginUserRequest,
  LoginUserRequestSchema,
} from "@workspace/types/dist/user";
import { CreateUserRequest } from "@workspace/types/dist/user";

const router = Router();
const prisma = new PrismaClient();

type RequestWithBody = Request<{}, any, CreateUserRequest>;

const createUser = async (
  req: RequestWithBody,
  res: Response
): Promise<void> => {
  try {
    const inputData: CreateUserRequest = {
      name: req.body.name,
      email: req.body.email,
      lastName: req.body.lastName,
      password: req.body.password,
    };

    let validData = CreateUserRequestSchema.parse(inputData);

    const password = await bcrypt.hash(validData.password, 8);
    console.log(password);
    validData = { ...validData, password };

    const user = await prisma.user.create({
      data: {
        ...validData,
      },
    });

    const token = jwt.sign({ id: user.id }, "fuckITDamn");

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        tokens: {
          create: [
            {
              token,
            },
          ],
        },
      },
    });

    res.status(StatusCode.CREATED).send({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      token,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

// Use the correct handler type
router.post("/signup", (req: Request, res: Response) =>
  createUser(req as RequestWithBody, res)
);

router.post(
  "/login",
  async (req: Request<any, LoginUserRequest>, res: Response) => {
    try {
      const inputData: LoginUserRequest = req.body;

      const validData = LoginUserRequestSchema.parse(inputData);
      const user = await prisma.user.findUnique({
        where: {
          email: validData.email,
        },
      });

      if (!user) {
        res.status(StatusCode.NOT_FOUND).send({
          message: "Sorry we cant find you account please sign up first",
        });
        return;
      }

      const isCorrectPass = await bcrypt.compare(
        validData.password,
        user.password
      );

      if (!isCorrectPass) {
        res
          .status(StatusCode.UNAUTHORIZED)
          .send({ message: "The password you entered is incorrect" });
        return;
      }

      const token = jwt.sign({ id: user.id }, "fuckITDamn");

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          tokens: {
            create: [
              {
                token,
              },
            ],
          },
        },
      });

      const { password, ...safeUser } = user;

      res.send({
        user: safeUser,
        token,
      });
    } catch (err) {
      sendErrorResponse(err, res);
    }
  }
);

router.get(
  "/user",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      res.send(req.user);
    } catch (err) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ err });
    }
  }
);

router.delete(
  "/user/:userId",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          id: Number(req.params.userId),
        },
      });

      res.send(deletedUser);
    } catch (error) {
      // Handle specific Prisma errors
      sendErrorResponse(error, res);
    }
  }
);

const UpdateUserReqSchema = CreateUserRequestSchema.partial();

type UpdateUserReq = z.infer<typeof UpdateUserReqSchema>;

router.patch(
  "/user",
  authMiddleware,
  async (req: Request<any, UpdateUserReq>, res: Response): Promise<void> => {
    try {
      const inputData: UpdateUserReq = req.body;
      let validData = UpdateUserReqSchema.parse(inputData);

      if (validData.password) {
        const password = await bcrypt.hash(validData.password, 8);
        validData = { ...validData, password };
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: Number(req.user?.id),
        },
        data: validData,
      });

      res.send(updatedUser);
    } catch (error) {
      sendErrorResponse(error, res);
    }
  }
);

export default router;
