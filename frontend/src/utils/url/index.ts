import axios from "axios";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken") || "";
  }
  return "";
};

export const axiosInstance = axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
});
