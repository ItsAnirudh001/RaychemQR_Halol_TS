import axios from "axios";
import { getStoredUser } from "./session-utils";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

// console.log("Base", baseURL);

export const customAxios = axios.create({
  baseURL,
  withCredentials: true,
});

customAxios.interceptors.request.use((config) => {
  const user = getStoredUser();
  const token = user?.access_token;

  // console.log("Interception token", token);

  if (token) config.headers.Authorization = `Bearer ${token}`;

  // console.log("config", config);

  return config;
});
