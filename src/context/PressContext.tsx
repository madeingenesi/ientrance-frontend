"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchAllStrapiPages } from "@/lib/fetchAllStrapiPages";

// Context
const Context = createContext<any>(null);

// Creiamo il provider
export function PressContext({ children }: { children: React.ReactNode }) {
  const [presses, setPresses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Variabile per passare al context
  const value = {
    presses,
    isLoading,
    error,
  };

  useEffect(() => {
    let cancelled = false;

    const getPresses = async () => {
      try {
        const data = await fetchAllStrapiPages("/api/presses?populate=*", {
          isCancelled: () => cancelled,
        });
        if (!cancelled) setPresses(data);
      } catch (error: any) {
        if (cancelled) return;
        if (error.name === "TypeError" && error.message.includes("fetch")) {
          console.error(
            "Network error: Please check your connection or server status."
          );
        } else {
          console.error("Failed to fetch presses:", error);
        }
        setError(error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    getPresses();
    return () => {
      cancelled = true;
    };
  }, []);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

// Hook personalizzato per usare il context
export function usePressContext() {
  return useContext(Context);
}
