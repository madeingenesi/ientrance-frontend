import axios from "axios";

const api = axios.create({
  baseURL: "https://ientrance.fablims.com/api",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "2afdf943-a8b6-444d-9689-6ec4006df42c",
  },
});

export default api;
