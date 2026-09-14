"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { fetchAllStrapiPages } from "@/lib/fetchAllStrapiPages";

const Context = createContext<{
  results: unknown[];
  isLoading: boolean;
  error: unknown;
}>({
  results: [],
  isLoading: false,
  error: null,
});

export function ResultsContextProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const list = await fetchAllStrapiPages(
          "/api/results?populate=*&sort=Year:desc",
          { allowNotFound: true, isCancelled: () => cancelled }
        );
        if (cancelled) return;
        setResults(list);
      } catch (e) {
        if (!cancelled) {
          setError(e);
          if (
            e instanceof TypeError &&
            typeof e.message === "string" &&
            e.message.includes("fetch")
          ) {
            console.error(
              "Network error: Please check your connection or server status."
            );
          } else {
            console.error("Failed to fetch results:", e);
          }
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Context.Provider value={{ results, isLoading, error }}>
      {children}
    </Context.Provider>
  );
}

export function useResultsContext() {
  return useContext(Context);
}
