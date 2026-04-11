import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchFromStrapi, getImageUrl } from "@/lib/config";
import PageHeader from "@/components/PageHeader";
import BlocksRender from "@/components/BlocksRender";

export const metadata: Metadata = {
  title: "FAQ | iENTRANCE",
};

type StrapiPageEntry = {
  id: number;
  documentId: string;
  Titolo: string;
  Sottotitolo: string | null;
  Slug: string | null;
  Blocks?: any[];
  Immagine?: unknown;
};

type StrapiPagesResponse = {
  data: StrapiPageEntry[];
};

async function loadFaqPage(): Promise<StrapiPageEntry | null> {
  const bySlug = await fetchFromStrapi<StrapiPagesResponse>(
    "/api/pages?filters[Slug][$eq]=faq&populate=*",
    { allowNotFound: true, kind: "collection" }
  );
  if (bySlug?.data?.[0]) return bySlug.data[0];

  const bySlugUpper = await fetchFromStrapi<StrapiPagesResponse>(
    "/api/pages?filters[Slug][$eq]=FAQ&populate=*",
    { allowNotFound: true, kind: "collection" }
  );
  if (bySlugUpper?.data?.[0]) return bySlugUpper.data[0];

  const byTitle = await fetchFromStrapi<StrapiPagesResponse>(
    "/api/pages?filters[Titolo][$eq]=FAQ&populate=*",
    { allowNotFound: true, kind: "collection" }
  );
  if (byTitle?.data?.[0]) return byTitle.data[0];

  const byTitleFaq = await fetchFromStrapi<StrapiPagesResponse>(
    "/api/pages?filters[Titolo][$eq]=Faq&populate=*",
    { allowNotFound: true, kind: "collection" }
  );
  return byTitleFaq?.data?.[0] ?? null;
}

export default async function FaqPage() {
  let page: StrapiPageEntry | null;
  try {
    page = await loadFaqPage();
  } catch {
    notFound();
  }

  if (!page) {
    notFound();
  }

  const heroImage = getImageUrl(page.Immagine).trim() || undefined;

  return (
    <>
      <PageHeader
        title={page.Titolo ?? "FAQ"}
        description={page.Sottotitolo ?? ""}
        image={heroImage}
      />
      <main
        id="main"
        className="container w-full mx-auto border-x border-gray-200 px-4 md:px-8 py-10"
      >
        {page.Blocks?.map((block, index) => (
          <BlocksRender key={block.id ?? index} block={block} index={index} />
        ))}
      </main>
    </>
  );
}
