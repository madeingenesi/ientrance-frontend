"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchFromStrapi } from "@/lib/config";

// Context
const Context = createContext<any>(null);

// 2. Creiamo il provider
export function ArticlesContext({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Variabile per passare al context
  const value = {
    articles,
    isLoading,
    error,
  };

  const getArticles = async () => {
    setIsLoading(true);
    try {
      const data = await fetchFromStrapi("/api/articoli?populate=*");
      console.log(data.data);
      setArticles(data.data);
    } catch (error: any) {
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        console.error(
          "Network error: Please check your connection or server status."
        );
      } else {
        console.error("Failed to fetch articles:", error);
      }
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  console.log(articles);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

// 3. Hook personalizzato per usare il context
export function useArticlesContext() {
  return useContext(Context);
}
