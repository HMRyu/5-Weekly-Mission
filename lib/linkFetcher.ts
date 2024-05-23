import axiosInstance from "@/axios/axiosinstance";

export const fetchLinks = async () => {
  try {
    const response = await axiosInstance.get("/links");

    return response.data;
  } catch (error) {
    throw error;
  }
};
