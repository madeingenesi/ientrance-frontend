"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchFromStrapi } from "@/lib/config";

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
      const data = await fetchFromStrapi("/api/pages?populate=*");
      if (data && data.data) {
        setPages(data.data);
      }
    } catch (error: any) {
      console.error("Error details:", error);
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
