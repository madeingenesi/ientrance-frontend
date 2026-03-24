"use client";

import { ArrowUpRight } from "lucide-react";
import type { YearTitleUrlRow } from "@/helpers/strapiOutcomeNormalize";

/**
 * Same grid layout as {@link Presslist}: 12-col header + stacked rows on mobile.
 * Columns: Year, Title, URL.
 */
export default function YearTitleUrlList({ rows }: { rows: YearTitleUrlRow[] }) {
  if (!rows || !Array.isArray(rows)) {
    return (
      <div className="min-h-[40vh] w-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  const sorted = [...rows].sort((a, b) => {
    const ya = Number(a.year) || 0;
    const yb = Number(b.year) || 0;
    return yb - ya;
  });

  if (sorted.length === 0) {
    return (
      <div className="min-h-[40vh] w-full flex items-center justify-center border-y py-12">
        <p className="text-muted-foreground text-sm">No entries yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <div className="grid grid-cols-12 border-y py-4 hidden md:grid">
        <div className="col-span-2 text-muted-foreground font-semibold">
          Year
        </div>
        <div className="col-span-7 text-muted-foreground font-semibold">
          Title
        </div>
        <div className="col-span-3 text-muted-foreground font-semibold">
          URL
        </div>
      </div>
      {sorted.map((item) => {
        const href = item.url?.trim() || "";
        const hasUrl = href.length > 0 && href !== "#";

        return (
          <div
            key={item.id}
            className="grid grid-rows-3 md:grid-rows-1 grid-cols-12 border-b py-4 bg-white hover:bg-muted/50 transition-all duration-300 items-center"
          >
            <div className="col-span-12 md:col-span-2 row-start-1 md:row-start-1 text-xs md:text-base">
              {item.year != null && item.year !== ""
                ? String(item.year)
                : "—"}
            </div>
            <div className="col-span-12 md:col-span-7 row-start-2 md:row-start-1 pb-2 md:pb-0">
              {item.title || "—"}
            </div>
            <div className="col-span-12 md:col-span-3 row-start-3 md:row-start-1">
              <span className="block md:hidden text-muted-foreground text-xs mb-1">
                URL
              </span>
              <div className="flex flex-row flex-wrap items-start justify-between gap-2 md:items-center">
                {hasUrl ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm break-all text-[var(--blue-primary)] underline underline-offset-2 hover:opacity-80 min-w-0 flex-1 text-left"
                  >
                    {href}
                  </a>
                ) : (
                  <span className="text-xs md:text-sm text-muted-foreground flex-1">
                    —
                  </span>
                )}
                {hasUrl ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0"
                  >
                    <ArrowUpRight className="w-5 h-5 md:w-4 md:h-4" />
                  </a>
                ) : (
                  <div className="shrink-0 opacity-50">
                    <ArrowUpRight className="w-5 h-5 md:w-4 md:h-4" />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
