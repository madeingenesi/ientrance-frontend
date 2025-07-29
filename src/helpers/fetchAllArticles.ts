import axios from "axios";

export const getArticles = async (path: string) => {
  const baseUrl = "http://localhost:1337";
  const response = await axios.get(`${baseUrl}${path}?populate=deep`);
  return response.data.data;
};
