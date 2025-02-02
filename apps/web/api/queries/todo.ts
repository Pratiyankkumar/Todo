import axiosInstance from "../axiosInstance";

export const getTodo = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axiosInstance.get("/todo", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
