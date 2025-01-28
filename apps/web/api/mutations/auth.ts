import { CreateUserRequest, LoginUserRequest } from "@workspace/types";
import axiosInstance from "../axiosInstance";

export const signup = async (details: CreateUserRequest) => {
  const { data } = await axiosInstance.post("/signup", details);
  return data;
};

export const login = async (details: LoginUserRequest) => {
  const { data } = await axiosInstance.post("/login", details);
  return data;
};
