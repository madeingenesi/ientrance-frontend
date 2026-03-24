/** Strapi v4 wraps fields in `attributes`; v5 often returns flat documents. */
export function normalizeStrapiEntry(entry: Record<string, unknown> | null | undefined): Record<string, unknown> & { id?: number } {
  if (!entry || typeof entry !== "object") return {};
  const attrs = entry.attributes as Record<string, unknown> | undefined;
  if (attrs && typeof attrs === "object") {
    return { id: entry.id as number | undefined, ...attrs };
  }
  return entry as Record<string, unknown> & { id?: number };
}

export type YearTitleUrlRow = {
  id: number;
  year?: number | string | null;
  title?: string | null;
  url?: string | null;
};

export function toYearTitleUrlRow(entry: unknown): YearTitleUrlRow {
  const e = normalizeStrapiEntry(entry as Record<string, unknown>);
  const id = typeof e.id === "number" ? e.id : Number(e.id) || 0;
  const year = e.Year ?? e.year;
  return {
    id,
    year: year as number | string | null | undefined,
    title: (e.Title ?? e.title) as string | null | undefined,
    url: (e.Url ?? e.url) as string | null | undefined,
  };
}
