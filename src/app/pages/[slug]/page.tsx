"use client";

import { usePagesContext } from "@/context/PagesContext";
import { useEffect, useState } from "react";
import BlocksRender from "@/components/BlocksRender";
import PageHeader from "@/components/PageHeader";

type Props = {
  params: { slug: string };
};

type PageData = {
  id: number;
  documentId: string;
  Titolo: string;
  Sottotitolo: string;
  Slug: string; // Nota la S maiuscola
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Blocks: any[];
  Immagine: any;
};

export default function Page({ params }: Props) {
  const { pages, isLoading, error } = usePagesContext();
  const [currentPage, setCurrentPage] = useState<PageData | null>(null);
  const baseImageUrl = "http://localhost:1337";

  console.log("Blocks:", currentPage);
  console.log(
    "Immagine:",
    `${baseImageUrl}${currentPage?.Immagine?.formats?.large?.url}`
  );

  useEffect(() => {
    console.log("Current pages in state:", pages);
    if (pages.length > 0) {
      const foundPage = pages.find(
        (page: PageData) => page.Slug === params.slug
      );
      console.log("Found page:", foundPage);
      setCurrentPage(foundPage || null);
    }
  }, [pages, params.slug]);

  if (isLoading) return <div>Caricamento...</div>;
  if (error) return <div>Errore nel caricamento: {error.message}</div>;
  if (!currentPage) return <div>Pagina non trovata</div>;

  return (
    <main className="container w-full mx-auto border-x border-gray-200">
      <PageHeader
        title={currentPage.Titolo}
        description={currentPage.Sottotitolo}
        image={`${baseImageUrl}${currentPage?.Immagine?.formats?.large?.url}`}
      />
      {/* Aggiungi altri campi che vuoi visualizzare */}
      {currentPage.Blocks?.map((block, index) => (
        <BlocksRender key={index} block={block} index={index} />
      ))}
    </main>
  );
}
