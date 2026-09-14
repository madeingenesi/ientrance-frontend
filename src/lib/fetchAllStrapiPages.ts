import { fetchFromStrapi, type FetchStrapiOptions } from "@/lib/config";

type StrapiPage<T> = {
  data?: T[];
  meta?: { pagination?: { pageCount?: number } };
};

type FetchAllStrapiPagesOptions = FetchStrapiOptions & {
  pageSize?: number;
  /** Interrompe il ciclo (es. componente smontato) */
  isCancelled?: () => boolean;
};

/**
 * Strapi limita ogni risposta a pageSize (default 25): scorre tutte le pagine
 * e restituisce l'elenco completo. `endpoint` può già contenere query
 * (populate, sort, filters).
 */
export async function fetchAllStrapiPages<T = unknown>(
  endpoint: string,
  { pageSize = 100, isCancelled, ...options }: FetchAllStrapiPagesOptions = {}
): Promise<T[]> {
  const separator = endpoint.includes("?") ? "&" : "?";
  const all: T[] = [];
  let page = 1;
  let pageCount = 1;

  do {
    const data = await fetchFromStrapi<StrapiPage<T>>(
      `${endpoint}${separator}pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
      { ...options, kind: "collection" }
    );
    if (isCancelled?.()) return all;
    if (Array.isArray(data?.data)) all.push(...data.data);
    pageCount = data?.meta?.pagination?.pageCount ?? page;
    page += 1;
  } while (page <= pageCount);

  return all;
}
