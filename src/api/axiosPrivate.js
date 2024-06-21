import axios from "axios";
const BASE_URL = "/api";

const instancePrivate = axios.create({
   baseURL: BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
   withCredentials: true,
});

export { instancePrivate };
