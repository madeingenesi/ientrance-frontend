import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchFromStrapi, getImageUrl } from "@/lib/config";
import PageHeader from "@/components/PageHeader";
import BlocksRender from "@/components/BlocksRender";

export const metadata: Metadata = {
  title: "Guidelines | iENTRANCE",
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

export default async function GuidelinesPage() {
  let res: StrapiPagesResponse;
  try {
    res = await fetchFromStrapi<StrapiPagesResponse>(
      "/api/pages?filters[Titolo][$eq]=Guidelines&populate=*"
    );
  } catch {
    notFound();
  }

  const page = res?.data?.[0];
  if (!page) {
    notFound();
  }

  const heroImage = getImageUrl(page.Immagine).trim() || undefined;

  return (
    <>
      <PageHeader
        title={page.Titolo ?? "Guidelines"}
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
