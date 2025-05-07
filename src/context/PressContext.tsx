"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

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
    //const baseUrl = "http://localhost:1337";
    const baseUrl = "https://ambitious-cat-3135f7987e.strapiapp.com";
    try {
      const response = await axios.get(`${baseUrl}/api/presses?populate=*`);
      console.log(response.data.data);
      setPresses(response.data.data);
    } catch (error: any) {
      if (error.code === "ERR_NETWORK") {
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
