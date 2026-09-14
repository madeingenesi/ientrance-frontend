import { notFound } from "next/navigation";
import SimplePageHeader from "@/components/SimplePageHeader";
import DynamicContentRenderer from "@/components/DynamicContentRenderer";
import Link from "next/link";
import { API_CONFIG, createFetchOptions } from "@/lib/config";
import { safeHref } from "@/lib/safeHref";

// Helper function per renderizzare il contenuto degli heading in modo ottimizzato
const renderHeadingContent = (children: any[]) => {
  if (!children || !Array.isArray(children)) {
    return null;
  }

  // Se c'è un solo child di tipo text senza formattazione, renderizza direttamente il testo
  if (children.length === 1 && children[0].type === "text") {
    const child = children[0];
    const hasFormatting = child.bold || child.italic || child.underline;

    if (!hasFormatting) {
      return child.text;
    }
  }

  // Altrimenti, renderizza con gli span per la formattazione
  return children.map((child: any, childIndex: number) => {
    if (child.type === "text") {
      const hasFormatting = child.bold || child.italic || child.underline;

      if (!hasFormatting) {
        return child.text;
      }

      return (
        <span
          key={childIndex}
          className={`${child.bold ? "font-bold" : ""} ${
            child.italic ? "italic" : ""
          } ${child.underline ? "underline" : ""}`}
        >
          {child.text}
        </span>
      );
    }
    return child.text || "";
  });
};

// Recupera l'articolo pubblicato tramite slug: 404 se non esiste,
// errore (gestito dall'error boundary) se Strapi non risponde correttamente
async function fetchArticolo(slug: string) {
  const baseUrl = API_CONFIG.STRAPI_BASE_URL.replace(/\/$/, "");
  const url = `${baseUrl}/api/articoli/${encodeURIComponent(slug)}?populate=*`;
  const token = API_CONFIG.STRAPI_API_TOKEN;

  let response: Response;
  try {
    response = await fetch(
      url,
      createFetchOptions(token ? { Authorization: `Bearer ${token}` } : {})
    );
  } catch (error) {
    throw new Error(
      `Unable to reach Strapi for article "${slug}": ${String(error)}`
    );
  }

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(
      `Strapi responded with status ${response.status} for article "${slug}"`
    );
  }

  const responseData = await response.json();
  let articolo: any;

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
    notFound();
  }

  if (!articolo || !articolo.Titolo) {
    notFound();
  }

  return articolo;
}

// Componente per la visualizzazione del dettaglio articolo
export default async function ArticoloPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articolo = await fetchArticolo(slug);

  return (
    <>
      <SimplePageHeader
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
          {/* Render dynamic content from postContent */}
          {articolo?.Content && Array.isArray(articolo.Content) ? (
            <DynamicContentRenderer
              postContent={articolo.Content}
              fallbackImage={articolo.Immagine}
            />
          ) : (
            // Fallback to old content structure if postContent is not available
            articolo?.Contenuto &&
            Array.isArray(articolo.Contenuto) &&
            articolo.Contenuto.map((block: any, index: number) => {
              if (block.type === "paragraph") {
                return (
                  <p key={index} className="text-lg leading-relaxed mb-4">
                    {block.children &&
                      Array.isArray(block.children) &&
                      block.children.map((child: any, childIndex: number) => {
                        switch (child.type) {
                          case "text":
                            return (
                              <span
                                key={childIndex}
                                className={`${
                                  child.bold ? "font-bold" : ""
                                } ${child.italic ? "italic" : ""} ${
                                  child.underline ? "underline" : ""
                                }`}
                              >
                                {child.text}
                              </span>
                            );
                          case "link":
                            return (
                              <Link
                                key={childIndex}
                                href={safeHref(child.url) ?? "#"}
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
              } else if (block.type === "heading") {
                // Gestione degli heading come blocchi separati
                const headingLevel = Math.min(
                  Math.max(block.level || 1, 1),
                  6
                );
                const headingClassName = `${
                  headingLevel === 1
                    ? "text-4xl font-bold"
                    : headingLevel === 2
                    ? "text-3xl font-semibold"
                    : headingLevel === 3
                    ? "text-2xl font-semibold"
                    : headingLevel === 4
                    ? "text-xl font-medium"
                    : headingLevel === 5
                    ? "text-lg font-medium"
                    : "text-sm font-medium"
                } tracking-tight mt-8 mb-4`;

                const content = renderHeadingContent(block.children);

                // Render del heading appropriato
                switch (headingLevel) {
                  case 1:
                    return (
                      <h1 key={index} className={headingClassName}>
                        {content}
                      </h1>
                    );
                  case 2:
                    return (
                      <h2 key={index} className={headingClassName}>
                        {content}
                      </h2>
                    );
                  case 3:
                    return (
                      <h3 key={index} className={headingClassName}>
                        {content}
                      </h3>
                    );
                  case 4:
                    return (
                      <h4 key={index} className={headingClassName}>
                        {content}
                      </h4>
                    );
                  case 5:
                    return (
                      <h5 key={index} className={headingClassName}>
                        {content}
                      </h5>
                    );
                  case 6:
                  default:
                    return (
                      <h6 key={index} className={headingClassName}>
                        {content}
                      </h6>
                    );
                }
              }
              return null;
            })
          )}

          {/* Visualizzazione categoria se disponibile */}
          {articolo?.categorie_articoli && (
            <div className="mt-6 p-4 bg-gray-100 rounded">
              <h3 className="font-bold">
                Categoria: {articolo.categorie_articoli.Titolo}
              </h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
