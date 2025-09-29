"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchFromStrapi } from "@/lib/config";

// Context
const Context = createContext<any>(null);

// Creiamo il provider
export function PressContext({ children }: { children: React.ReactNode }) {
  const [presses, setPresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Variabile per passare al context
  const value = {
    presses,
    isLoading,
    error,
  };

  const getPresses = async () => {
    setIsLoading(true);
    try {
      const data = await fetchFromStrapi("/api/presses?populate=*");
      console.log(data.data);
      setPresses(data.data);
    } catch (error: any) {
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        console.error(
          "Network error: Please check your connection or server status."
        );
      } else {
        console.error("Failed to fetch presses:", error);
      }
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPresses();
  }, []);

  console.log(presses);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

// Hook personalizzato per usare il context
export function usePressContext() {
  return useContext(Context);
}
