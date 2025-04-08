"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

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
    const baseUrl = "http://localhost:1337";
    try {
      const response = await axios.get(`${baseUrl}/api/articoli?populate=*`);
      console.log(response.data.data);
      setArticles(response.data.data);
    } catch (error: any) {
      if (error.code === "ERR_NETWORK") {
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
