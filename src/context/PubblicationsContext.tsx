"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { fetchFromStrapi } from "@/lib/config";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchFromStrapi(
          "/api/pubblications?populate=*&sort=Year:desc",
          { allowNotFound: true, kind: "collection" }
        );
        if (cancelled) return;
        const list = Array.isArray(data?.data) ? data.data : [];
        setPubblications(list);
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
