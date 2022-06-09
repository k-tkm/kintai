import axios from "axios";

const token = localStorage.getItem("accessToken");
export const axiosInstance = axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
