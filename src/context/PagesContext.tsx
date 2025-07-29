"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Definisci un'interfaccia per il tipo del context
interface PagesContextType {
  pages: any[];
  isLoading: boolean;
  error: any;
}

// Inizializza il context con un valore di default
const Context = createContext<PagesContextType>({
  pages: [],
  isLoading: false,
  error: null,
});

// Provider per le pagine
export function PagesContext({ children }: { children: React.ReactNode }) {
  const [pages, setPages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPages = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching pages...");
      // Utilizziamo la variabile d'ambiente o un URL di fallback
      const baseUrl =
        process.env.NEXT_PUBLIC_STRAPI_URL ||
        "https://ambitious-cat-3135f7987e.strapiapp.com";
      const response = await axios.get(`${baseUrl}/api/pages?populate=deep`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data && response.data.data) {
        setPages(response.data.data);
      }
    } catch (error: any) {
      console.error("Error details:", error.response || error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPages();
  }, []);

  const value = {
    pages,
    isLoading,
    error,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

// Hook personalizzato con controllo
export function usePagesContext() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("usePagesContext must be used within a PagesContext");
  }
  return context;
}
