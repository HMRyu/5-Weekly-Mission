import axiosInstance from "@/axios/axiosinstance";

export const fetchFolders = async () => {
  try {
    const response = await axiosInstance.get("/folders");

    return response.data;
  } catch (error) {
    throw error;
  }
};
