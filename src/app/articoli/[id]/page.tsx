import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";

export default async function ArticoloPage({ params }: any) {
  try {
    // Log the ID from URL params
    console.log("URL ID Parameter:", params.id);

    // Using filters instead of direct ID access
    //const url = `https://ambitious-cat-3135f7987e.strapiapp.com/api/articoli?populate=*&filters[id][$eq]=${params.id}`;

    const url = `https://ambitious-cat-3135f7987e.strapiapp.com/api/articoli?filters[id][$eq]=${params.id}&populate=*`;
    console.log("Fetching URL:", url);

    const response = await fetch(url, {
      cache: "no-store", // Disabilitiamo la cache per il debug
    });

    if (!response.ok) {
      console.log("Response not OK:", response.status, response.statusText);
      return notFound();
    }

    const data = await response.json();

    // Con i filtri, l'articolo sarà nel primo elemento dell'array data
    const articolo = data.data?.[0];

    if (!articolo) {
      console.log("No article found with ID:", params.id);
      return notFound();
    }

    // Aggiungiamo più dettagli nella visualizzazione per il debug
    return (
      <>
        <PageHeader
          title={articolo?.Titolo || articolo?.titolo}
          description={articolo?.Contenuto || articolo?.contenuto}
          //image={articolo?.Immagine?.data?.attributes?.url}
          image={"/images/esempio.jpg"}
        />
        <div className="container mx-auto py-8 border-x py-22">
          <div className="prose max-w-3xl mx-auto">
            {articolo?.Contenuto?.map((block: any, index: number) => {
              if (block.type === "paragraph") {
                return (
                  <p key={index} className="text-lg leading-relaxed">
                    {block.children?.map((child: any, childIndex: number) => (
                      <span key={childIndex}>{child.text}</span>
                    ))}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching article:", error);
    return notFound();
  }
}
