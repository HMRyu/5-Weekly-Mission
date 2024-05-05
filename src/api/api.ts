import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://bootcamp-api.codeit.kr/api",
});

export async function getSampleUser() {
  const response = await instance.get("/sample/user");

  return response;
}

export async function getSampleFolder() {
  const response = await instance.get("/sample/folder");

  return response;
}

export async function getUserFolders(userId: number) {
  const response = await instance.get(`/users/${userId}/folders`);

  return response;
}

export async function getUserLinks(userId: number) {
  const response = await instance.get(`/users/${userId}/links`);

  return response;
}

export async function getUserLinksById(userId: number, folderId: number) {
  const response = await instance.get(
    `/users/${userId}/links?folderId=${folderId}`
  );

  return response;
}
