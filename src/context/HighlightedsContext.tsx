"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchFromStrapi } from "@/lib/config";

export interface HighlightedEntry {
  id: number;
  documentId?: string;
  Title?: string;
  Subtitle?: string;
  Content?: string;
  ButtonText?: string;
  Url?: string;
  createdAt?: string;
  publishedAt?: string;
}

interface HighlightedsContextType {
  highlighteds: HighlightedEntry[];
  isLoading: boolean;
  error: unknown;
}

const Context = createContext<HighlightedsContextType>({
  highlighteds: [],
  isLoading: false,
  error: null,
});

export function HighlightedsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [highlighteds, setHighlighteds] = useState<HighlightedEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchFromStrapi(
          "/api/highlighteds?populate=*&sort=publishedAt:desc",
          { allowNotFound: true, kind: "collection" }
        );
        if (cancelled) return;
        const list = Array.isArray(data?.data) ? data.data : [];
        setHighlighteds(list as HighlightedEntry[]);
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
            console.error("Failed to fetch highlighteds:", e);
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
    <Context.Provider value={{ highlighteds, isLoading, error }}>
      {children}
    </Context.Provider>
  );
}

export function useHighlightedsContext() {
  return useContext(Context);
}
