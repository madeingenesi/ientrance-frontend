"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { YearTitleUrlRow } from "@/helpers/strapiOutcomeNormalize";

type YearTitleUrlListProps = {
  rows: YearTitleUrlRow[];
  pageSize?: number;
  scrollAnchorRef?: RefObject<HTMLElement | null>;
};

/**
 * Same grid layout as {@link Presslist}: 12-col header + stacked rows on mobile.
 * Columns: Year, Title, URL.
 */
export default function YearTitleUrlList({
  rows,
  pageSize,
  scrollAnchorRef,
}: YearTitleUrlListProps) {
  const [page, setPage] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);
  const skipScrollRef = useRef(true);
  const itemsPerPage = pageSize && pageSize > 0 ? pageSize : 0;
  const isPaginated = itemsPerPage > 0;
  const safeRows = Array.isArray(rows) ? rows : [];

  const sorted = [...safeRows].sort((a, b) => {
    const ya = Number(a.year) || 0;
    const yb = Number(b.year) || 0;
    return yb - ya;
  });

  useEffect(() => {
    setPage(1);
    skipScrollRef.current = true;
  }, [rows, pageSize]);

  useEffect(() => {
    if (!isPaginated) return;
    if (skipScrollRef.current) {
      skipScrollRef.current = false;
      return;
    }

    const target = scrollAnchorRef?.current ?? listRef.current;
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page, isPaginated, scrollAnchorRef]);

  const totalPages = isPaginated ? Math.ceil(sorted.length / itemsPerPage) : 1;
  const safePage = Math.min(page, totalPages);
  const visibleRows = isPaginated
    ? sorted.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage)
    : sorted;

  if (!rows || !Array.isArray(rows)) {
    return (
      <div className="min-h-[40vh] w-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (sorted.length === 0) {
    return (
      <div className="min-h-[40vh] w-full flex items-center justify-center border-y py-12">
        <p className="text-muted-foreground text-sm">No entries yet.</p>
      </div>
    );
  }

  return (
    <div
      ref={listRef}
      className={isPaginated ? "w-full" : "min-h-screen w-full"}
    >
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
      {visibleRows.map((item, index) => {
        const href = item.url?.trim() || "";
        const hasUrl = href.length > 0 && href !== "#";

        return (
          <div
            key={`${safePage}-${item.id}-${index}`}
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
      {isPaginated && totalPages > 1 ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-6 mt-2">
          <p className="text-sm text-muted-foreground">
            Showing {(safePage - 1) * itemsPerPage + 1}–
            {Math.min(safePage * itemsPerPage, sorted.length)} of {sorted.length}
          </p>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={safePage <= 1}
              aria-label="Previous page"
            >
              <ChevronLeft />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground px-2 tabular-nums">
              {safePage} / {totalPages}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              disabled={safePage >= totalPages}
              aria-label="Next page"
            >
              Next
              <ChevronRight />
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
