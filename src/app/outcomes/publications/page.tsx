"use client";

import { OutcomeYearTitleUrlListing } from "@/components/outcomes/OutcomeYearTitleUrlListing";
import { usePubblicationsContext } from "@/context/PubblicationsContext";
import { toYearTitleUrlRow } from "@/helpers/strapiOutcomeNormalize";

export default function PublicationsPage() {
  const { pubblications, isLoading, error } = usePubblicationsContext();
  const rows = (pubblications || []).map((entry) => toYearTitleUrlRow(entry));

  return (
    <OutcomeYearTitleUrlListing
      title="Publications"
      description="Scientific publications and references from the iENTRANCE infrastructure."
      rows={rows}
      isLoading={isLoading}
      error={error}
      loadErrorMessage="Unable to load publications. Please try again later."
    />
  );
}
