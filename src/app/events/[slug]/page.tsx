import { notFound } from "next/navigation";
import SimplePageHeader from "@/components/SimplePageHeader";
import Image from "next/image";
import Link from "next/link";
import PhotoGallery from "@/components/PhotoGallery";

// Component for displaying event details
export default async function EventPage({ params }: any) {
  try {
    const slug = params.slug;
    // Using environment variable or fallback URL
    const baseUrl = "https://ambitious-cat-3135f7987e.strapiapp.com";
    const url = `${baseUrl}/api/events?filters[slug][$eq]=${slug}&populate=*`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      return notFound();
    }

    const responseData = await response.json();
    let event;

    // Handling Strapi response - new structure
    if (
      responseData.data &&
      Array.isArray(responseData.data) &&
      responseData.data.length > 0
    ) {
      event = responseData.data[0];
    } else {
      return notFound();
    }

    if (!event || !event.title) {
      return notFound();
    }

    // Use the first image from photoGallery for header if available
    const headerImage =
      event.photoGallery && event.photoGallery.length > 0
        ? event.photoGallery[0].url
        : "/images/examples/copertina-summer-school.jpg";

    return (
      <>
        <SimplePageHeader
          title={event.title}
          description={
            typeof event.content === "string" ? event.content : "Event"
          }
          image={headerImage}
        />

        <div className="container mx-auto border-x py-8 md:py-22" id="main">
          <div className="prose max-w-3xl mx-auto px-8 md:p-0">
            {event.publishedAt && (
              <div className="text-sm text-gray-600 mb-4">
                <strong>Published on:</strong>{" "}
                {new Date(event.publishedAt).toLocaleDateString("en-US")}
              </div>
            )}
            {/* Content rendering */}
            {event?.content &&
              Array.isArray(event.content) &&
              event.content.map((block: any, index: number) => {
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

            {/* Photo Gallery */}
            {event?.photoGallery && event.photoGallery.length > 0 && (
              <PhotoGallery photos={event.photoGallery} />
            )}

            {/* Press Release */}
            {event?.pressReleases && event.pressReleases.length > 0 && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-6">Press Release</h3>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white border-y border-gray-200 rounded-lg shadow-sm">
                    <tbody className="divide-y divide-gray-200">
                      {event.pressReleases.map((item: any, index: number) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="py-4">
                            <div className="text-base font-medium text-gray-900">
                              {item.title}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sezione Press Releases */}
            {event?.titlesUrls && event.titlesUrls.length > 0 && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-6">Press Review</h3>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white border-y border-gray-200 rounded-lg shadow-sm">
                    <tbody className="divide-y divide-gray-200">
                      {event.titlesUrls.map((item: any, index: number) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="py-4">
                            <div className="text-base font-medium text-gray-900">
                              {item.title}
                            </div>
                          </td>
                          <td className="py-4 text-right">
                            <Link
                              href={item.url}
                              className="text-var(--color-primary) underline"
                              target={
                                item.url.startsWith("http") ? "_blank" : "_self"
                              }
                              rel={
                                item.url.startsWith("http")
                                  ? "noopener noreferrer"
                                  : ""
                              }
                            >
                              Read more
                              {item.url.startsWith("http") && (
                                <svg
                                  className="ml-1 w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              )}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error loading event:", error);
    return notFound();
  }
}
