"use client";

import { OutcomeYearTitleUrlListing } from "@/components/outcomes/OutcomeYearTitleUrlListing";
import { useResultsContext } from "@/context/ResultsContext";
import { toYearTitleUrlRow } from "@/helpers/strapiOutcomeNormalize";

export default function ResultsPage() {
  const { results, isLoading, error } = useResultsContext();
  const rows = (results || []).map((entry) => toYearTitleUrlRow(entry));

  return (
    <OutcomeYearTitleUrlListing
      title="Results"
      description="Research results and outputs from the iENTRANCE community."
      rows={rows}
      isLoading={isLoading}
      error={error}
      loadErrorMessage="Unable to load results. Please try again later."
    />
  );
}
