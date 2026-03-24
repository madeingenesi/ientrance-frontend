"use client";

import YearTitleUrlList from "@/components/YearTitleUrlList";
import type { YearTitleUrlRow } from "@/helpers/strapiOutcomeNormalize";

type OutcomeYearTitleUrlListingProps = {
  title: string;
  description: string;
  rows: YearTitleUrlRow[];
  isLoading: boolean;
  error: unknown;
  loadErrorMessage: string;
};

/**
 * Same page shell as press-releases + {@link YearTitleUrlList} (Presslist-style grid).
 */
export function OutcomeYearTitleUrlListing({
  title,
  description,
  rows,
  isLoading,
  error,
  loadErrorMessage,
}: OutcomeYearTitleUrlListingProps) {
  return (
    <>
      <header className="flex flex-col gap-0">
        <div className="container w-full mx-auto flex flex-col gap-2 p-4 md:p-8 md:pt-32 border-y md:border md:border-t-0">
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-gray-600 mt-2">{description}</p>
        </div>
      </header>
      <main>
        <div className="container w-full mx-auto flex flex-col gap-2 p-4 md:p-8 border-y md:border md:border-t-0">
          {isLoading ? (
            <p className="text-sm text-muted-foreground py-8">Loading…</p>
          ) : error ? (
            <p className="text-sm text-destructive py-8">{loadErrorMessage}</p>
          ) : (
            <YearTitleUrlList rows={rows} />
          )}
        </div>
      </main>
    </>
  );
}
