import axios from "axios";

function getBaseURL(): string {
  if (typeof window !== "undefined") {
    return "/api/fablims";
  }
  return (
    process.env.IENTRANCE_API_URL?.replace(/\/$/, "") ||
    "https://ientrance.fablims.com/api"
  );
}

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

if (typeof window === "undefined" && process.env.IENTRANCE_API_KEY) {
  api.defaults.headers.common["x-api-key"] = process.env.IENTRANCE_API_KEY;
}

export default api;
