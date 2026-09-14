"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchAllStrapiPages } from "@/lib/fetchAllStrapiPages";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const getPages = async () => {
      try {
        const data = await fetchAllStrapiPages("/api/pages?populate=*", {
          isCancelled: () => cancelled,
        });
        if (!cancelled) setPages(data);
      } catch (error: any) {
        if (cancelled) return;
        console.error("Error details:", error);
        setError(error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    getPages();
    return () => {
      cancelled = true;
    };
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
