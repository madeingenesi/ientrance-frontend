import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import Link from "next/link";

// Componente per la visualizzazione del dettaglio articolo
export default async function ArticoloPage({ params }: any) {
  try {
    const slug = params.slug;
    // Utilizziamo la variabile d'ambiente o un URL di fallback
    const baseUrl = "https://ambitious-cat-3135f7987e.strapiapp.com";
    const url = `${baseUrl}/api/articoli/${slug}?populate=*`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      return notFound();
    }

    const responseData = await response.json();
    let articolo;

    // Gestione della risposta di Strapi
    if (responseData.data) {
      // Nel caso in cui data contenga direttamente l'articolo
      if (responseData.data.Titolo) {
        articolo = responseData.data;
      } else if (
        responseData.data.attributes &&
        responseData.data.attributes.Titolo
      ) {
        // Formato standard Strapi v4/v5 con attributes
        articolo = { ...responseData.data.attributes };
        articolo.id = responseData.data.id;
      } else if (
        Array.isArray(responseData.data) &&
        responseData.data.length > 0
      ) {
        if (responseData.data[0].attributes) {
          articolo = responseData.data[0].attributes;
          articolo.id = responseData.data[0].id;
        } else {
          articolo = responseData.data[0];
        }
      }
    } else if (responseData.id && responseData.Titolo) {
      articolo = responseData;
    } else if (Array.isArray(responseData) && responseData.length > 0) {
      articolo = responseData[0];
    } else {
      return notFound();
    }

    if (!articolo || !articolo.Titolo) {
      return notFound();
    }

    // Immagine di default
    const headerImage = "/images/examples/copertina-summer-school.jpg";

    return (
      <>
        <PageHeader
          title={articolo.Titolo}
          description={
            typeof articolo.Contenuto === "string"
              ? articolo.Contenuto
              : "Articolo"
          }
          image={articolo?.Immagine?.url}
        />
        <div className="container mx-auto border-x py-8 md:py-22" id="main">
          <div className="prose max-w-3xl mx-auto px-8 md:p-0">
            {articolo?.Contenuto &&
              Array.isArray(articolo.Contenuto) &&
              articolo.Contenuto.map((block: any, index: number) => {
                if (block.type === "paragraph") {
                  return (
                    <p key={index} className="text-lg leading-relaxed">
                      {block.children &&
                        Array.isArray(block.children) &&
                        block.children.map((child: any, childIndex: number) => {
                          switch (child.type) {
                            case "text":
                              return (
                                <span
                                  key={childIndex}
                                  className={child.bold ? "font-bold" : ""}
                                >
                                  {child.text}
                                </span>
                              );
                            case "link":
                              return (
                                <Link
                                  key={childIndex}
                                  href={child.url}
                                  className="text-blue-600 hover:text-blue-800 underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {child.children &&
                                    Array.isArray(child.children) &&
                                    child.children.map(
                                      (
                                        linkChild: any,
                                        linkChildIndex: number
                                      ) => (
                                        <span
                                          key={linkChildIndex}
                                          className={
                                            linkChild.bold ? "font-bold" : ""
                                          }
                                        >
                                          {linkChild.text}
                                        </span>
                                      )
                                    )}
                                </Link>
                              );
                            default:
                              return (
                                <span key={childIndex}>{child.text || ""}</span>
                              );
                          }
                        })}
                    </p>
                  );
                }
                return null;
              })}

            {/* Visualizzazione categoria se disponibile */}
            {articolo?.categorie_articoli && (
              <div className="mt-6 p-4 bg-gray-100 rounded">
                <h3 className="font-bold">
                  Categoria: {articolo.categorie_articoli.Titolo}
                </h3>
              </div>
            )}
          </div>

          <Image
            src="/images/iE_programma_5_page-0001.jpg"
            alt={articolo.Titolo || "Immagine articolo"}
            width={1000}
            height={1000}
            className="w-full h-auto mx-auto max-w-3xl border mt-8"
          />
        </div>
      </>
    );
  } catch (error) {
    return notFound();
  }
}
