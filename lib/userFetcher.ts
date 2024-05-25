import axiosInstance from "@/axios/axiosInstance";

export const fetchUser = async () => {
  try {
    const response = await axiosInstance.get("/users");

    return response.data;
  } catch (error) {
    throw error;
  }
};
