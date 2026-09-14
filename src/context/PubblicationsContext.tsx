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
  pubblications: unknown[];
  isLoading: boolean;
  error: unknown;
}>({
  pubblications: [],
  isLoading: false,
  error: null,
});

/** Strapi collection pluralName is `pubblications` (see backend schema). */
export function PubblicationsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [pubblications, setPubblications] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const all = await fetchAllStrapiPages(
          "/api/pubblications?populate=*&sort=Year:desc",
          { allowNotFound: true, isCancelled: () => cancelled }
        );
        if (cancelled) return;
        setPubblications(all);
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
            console.error("Failed to fetch publications:", e);
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
    <Context.Provider value={{ pubblications, isLoading, error }}>
      {children}
    </Context.Provider>
  );
}

export function usePubblicationsContext() {
  return useContext(Context);
}
