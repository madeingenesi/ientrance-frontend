import { fetchFromStrapi } from "@/lib/config";

export const getArticles = async (path: string) => {
  const data = await fetchFromStrapi(`${path}?populate=*`);
  return data.data;
};
