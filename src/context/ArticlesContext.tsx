"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchAllStrapiPages } from "@/lib/fetchAllStrapiPages";

// Context
const Context = createContext<any>(null);

// 2. Creiamo il provider
export function ArticlesContext({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Variabile per passare al context
  const value = {
    articles,
    isLoading,
    error,
  };

  useEffect(() => {
    let cancelled = false;

    const getArticles = async () => {
      try {
        const data = await fetchAllStrapiPages("/api/articoli?populate=*", {
          isCancelled: () => cancelled,
        });
        if (!cancelled) setArticles(data);
      } catch (error: any) {
        if (cancelled) return;
        if (error.name === "TypeError" && error.message.includes("fetch")) {
          console.error(
            "Network error: Please check your connection or server status."
          );
        } else {
          console.error("Failed to fetch articles:", error);
        }
        setError(error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    getArticles();
    return () => {
      cancelled = true;
    };
  }, []);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

// 3. Hook personalizzato per usare il context
export function useArticlesContext() {
  return useContext(Context);
}
