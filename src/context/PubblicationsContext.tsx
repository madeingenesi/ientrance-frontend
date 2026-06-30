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
        // Strapi caps each response at pageSize (default 25). Loop every page
        // so all publications load, not just the first page.
        const PAGE_SIZE = 100;
        const all: unknown[] = [];
        let page = 1;
        let pageCount = 1;
        do {
          const data = await fetchFromStrapi<{
            data?: unknown[];
            meta?: { pagination?: { pageCount?: number } };
          }>(
            `/api/pubblications?populate=*&sort=Year:desc&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`,
            { allowNotFound: true, kind: "collection" }
          );
          if (cancelled) return;
          if (Array.isArray(data?.data)) all.push(...data.data);
          pageCount = data?.meta?.pagination?.pageCount ?? page;
          page += 1;
        } while (page <= pageCount);
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
