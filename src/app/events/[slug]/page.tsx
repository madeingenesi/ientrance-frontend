"use client";

import { notFound } from "next/navigation";
import SimplePageHeader from "@/components/SimplePageHeader";
import Image from "next/image";
import Link from "next/link";
import PhotoGallery from "@/components/PhotoGallery";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState, useEffect, use } from "react";
import { API_CONFIG, getImageUrl } from "@/lib/config";

// Component for displaying event details
export default function EventPage({ params }: any) {
  const resolvedParams = use(params) as { slug: string };
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const slug = resolvedParams.slug;
        const baseUrl = API_CONFIG.STRAPI_BASE_URL;
        const url = `${baseUrl}/api/events?filters[slug][$eq]=${slug}&populate=*`;

        const response = await fetch(url, {
          cache: "no-store",
        });

        if (!response.ok) {
          notFound();
          return;
        }

        const responseData = await response.json();
        let eventData;

        // Handling Strapi response - new structure
        if (
          responseData.data &&
          Array.isArray(responseData.data) &&
          responseData.data.length > 0
        ) {
          eventData = responseData.data[0];
        } else {
          notFound();
          return;
        }

        if (!eventData || !eventData.title) {
          notFound();
          return;
        }

        setEvent(eventData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading event:", error);
        notFound();
      }
    };

    fetchEvent();
  }, [resolvedParams.slug]);

  // Helper function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/ |.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Functions for video modal
  const openVideoModal = (video: any) => {
    setSelectedVideo(video);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return notFound();
  }

  const baseUrl = API_CONFIG.STRAPI_BASE_URL;

  // Use featuredImage if available, otherwise fallback to first photoGallery image
  const headerImage = getImageUrl(
    event.featuredImage ||
      (event.photoGallery && event.photoGallery.length > 0
        ? event.photoGallery[0]
        : null),
    "/images/examples/copertina-summer-school.jpg"
  );

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
            <PhotoGallery
              photos={event.photoGallery
                .filter((photo: any) => photo?.url)
                .map((photo: any) => ({
                  ...photo,
                  url: getImageUrl(photo),
                }))}
            />
          )}

          {/* Video Gallery */}
          {event?.videoGallery && event.videoGallery.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-6">Video Gallery</h3>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={true}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                className="video-gallery-swiper"
              >
                {event.videoGallery.map((video: any, index: number) => {
                  // Debug: Remove unused variables
                  // const imageObj =
                  //   Array.isArray(video.Image) && video.Image.length > 0
                  //     ? video.Image[0]
                  //     : null;

                  // const imageUrl = imageObj
                  //   ? imageObj.formats?.large?.url ||
                  //     imageObj.formats?.medium?.url ||
                  //     imageObj.url
                  //   : "";

                  const finalImageUrl = getImageUrl(video.Image);

                  // Get image dimensions (with fallback)
                  const getImageDimensions = () => {
                    if (Array.isArray(video.Image) && video.Image.length > 0) {
                      const imageObj = video.Image[0];
                      return {
                        width:
                          imageObj?.formats?.large?.width ||
                          imageObj?.width ||
                          400,
                        height:
                          imageObj?.formats?.large?.height ||
                          imageObj?.height ||
                          225,
                      };
                    }
                    return { width: 400, height: 225 };
                  };

                  const { width, height } = getImageDimensions();

                  // Debug: log final image URL
                  console.log("Final Image URL:", finalImageUrl);

                  return (
                    <SwiperSlide key={index}>
                      <div className="relative group cursor-pointer">
                        <div
                          onClick={() => openVideoModal(video)}
                          className="relative overflow-hidden splashMiniXS"
                        >
                          {finalImageUrl ? (
                            <Image
                              src={finalImageUrl}
                              alt={video.Title || "Video thumbnail"}
                              width={width}
                              height={height}
                              className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-gray-500">
                                No image available
                              </span>
                            </div>
                          )}
                          {/* Play button overlay */}
                          <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
                            <div className="bg-white bg-opacity-90 rounded-full p-4">
                              <svg
                                className="w-8 h-8 text-red-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-4 splashMiniXS"></div>
                        </div>
                      </div>
                      {video.Title && (
                        <p className="font-medium tracking-tight text-left mt-4">
                          {video.Title}
                        </p>
                      )}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
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

          {/* Sezione Press Review */}
          {event?.pressReview && event.pressReview.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-6">Press Review</h3>
              <div className="overflow-x-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                {event.pressReview.map((item: any, index: number) => {
                  const finalImageUrl = getImageUrl(item.Image);

                  // Get image dimensions with fallback
                  const getImageDimensions = () => {
                    if (Array.isArray(item.Image) && item.Image.length > 0) {
                      const imageObj = item.Image[0];
                      return {
                        width:
                          imageObj?.formats?.large?.width ||
                          imageObj?.width ||
                          800,
                        height:
                          imageObj?.formats?.large?.height ||
                          imageObj?.height ||
                          400,
                      };
                    }
                    return { width: 800, height: 400 };
                  };

                  const { width, height } = getImageDimensions();

                  return (
                    <div key={index}>
                      {item.Url ? (
                        <Link href={item.Url} target="_blank">
                          <Image
                            src={finalImageUrl}
                            alt={item.Title || "Press review image"}
                            width={width}
                            height={height}
                            className="object-cover splashMiniXS h-full w-full rounded"
                          />
                        </Link>
                      ) : (
                        <Image
                          src={finalImageUrl}
                          alt={item.Title || "Press review image"}
                          width={width}
                          height={height}
                          className="object-cover splashMini h-full w-full rounded"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeVideoModal}
        >
          <div className="relative max-w-4xl w-full">
            {/* Close button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* YouTube iframe */}
            <div className="relative w-full h-0 pb-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                  selectedVideo.Url
                )}?autoplay=1`}
                title={selectedVideo.Title || "Video"}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onClick={(e) => e.stopPropagation()}
              ></iframe>
            </div>

            {/* Video title */}
            {selectedVideo.Title && (
              <div className="mt-4 text-center">
                <h3 className="text-white text-lg font-medium">
                  {selectedVideo.Title}
                </h3>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        .video-gallery-swiper .swiper-button-next,
        .video-gallery-swiper .swiper-button-prev {
          background-color: rgba(255, 255, 255, 0.8);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-top: -20px;
        }

        .video-gallery-swiper .swiper-button-next:after,
        .video-gallery-swiper .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
          color: #3b82f6;
        }

        .video-gallery-swiper .swiper-pagination-bullet {
          background-color: #3b82f6;
          opacity: 0.5;
        }

        .video-gallery-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </>
  );
}
