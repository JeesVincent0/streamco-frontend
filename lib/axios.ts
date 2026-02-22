import axios from "axios";

export const axiosIntance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});
