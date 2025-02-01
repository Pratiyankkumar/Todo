import axiosInstance from "../axiosInstance";
import { CreateTodo } from "@workspace/types";

export const createTodo = async (details: CreateTodo) => {
  const token = localStorage.getItem("token");
  const { data } = await axiosInstance.post("/todo", details, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
