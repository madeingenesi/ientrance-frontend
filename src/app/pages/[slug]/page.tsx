"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { usePagesContext } from "@/context/PagesContext";
import BlocksRender from "@/components/BlocksRender";
import PageHeader from "@/components/PageHeader";

type PageData = {
  id: number;
  documentId: string;
  Titolo: string;
  Sottotitolo: string;
  Slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Blocks: any[];
  Immagine: any;
};

const baseImageUrl = "http://localhost:1337";

function PageContent({ page }: { page: PageData | null }) {
  if (!page) {
    return <div>Pagina non trovata</div>;
  }

  return (
    <main className="container w-full mx-auto border-x border-gray-200">
      <PageHeader
        title={page.Titolo}
        description={page.Sottotitolo}
        image={`${baseImageUrl}${page?.Immagine?.formats?.large?.url}`}
      />
      {page.Blocks?.map((block, index) => (
        <BlocksRender key={index} block={block} index={index} />
      ))}
    </main>
  );
}

export default function Page() {
  // Recupera lo slug tramite useParams
  const { slug } = useParams() as { slug: string };

  const { pages, isLoading, error } = usePagesContext();
  const [currentPage, setCurrentPage] = useState<PageData | null>(null);

  useEffect(() => {
    const findPage = () => {
      const foundPage = pages.find((page: PageData) => page.Slug === slug);
      setCurrentPage(foundPage || null);
    };

    findPage();
  }, [slug, pages]);

  if (isLoading) return <div>Caricamento...</div>;
  if (error) return <div>Errore nel caricamento: {error.message}</div>;

  return <PageContent page={currentPage} />;
}
