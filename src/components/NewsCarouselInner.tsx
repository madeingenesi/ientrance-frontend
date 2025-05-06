"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Rss, Paperclip, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import Swiper modules
import { Pagination, Navigation } from "swiper/modules";

export default function NewsCarouselInner({ articles }: any) {
  const [articlesData, setArticlesData] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (articles && Array.isArray(articles)) {
      try {
        const sortedArticles = [...articles].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setArticlesData(sortedArticles);
      } catch (error) {
        console.error("Error sorting articles:", error);
        setArticlesData(articles);
      }
    }
  }, [articles]);

  if (!mounted) return null;
  if (!articles || !Array.isArray(articles) || articles.length === 0) {
    return null;
  }

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      centeredSlides={false}
      pagination={false}
      navigation={true}
      autoHeight={false}
      modules={[Pagination, Navigation]}
      className="mySwiper featuresCarousel h-full overflow-hidden md:!overflow-visible"
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
      }}
    >
      {(articlesData.length > 0 ? articlesData : articles).map(
        (article: any, index: number) => {
          // Handle different image structures in API response
          let imageSrc = "/placeholder.jpg"; // Default fallback image

          try {
            if (article?.Immagine?.url) {
              // Direct structure
              imageSrc = article.Immagine.url;
            } else if (article?.Immagine?.data?.attributes?.url) {
              // Nested Strapi v4 structure
              imageSrc = article.Immagine.data.attributes.url;
            } else if (article?.attributes?.Immagine?.data?.attributes?.url) {
              // Another possible Strapi structure
              imageSrc = article.attributes.Immagine.data.attributes.url;
            }

            // Add protocol/domain if it's a relative URL and not the placeholder
            if (
              imageSrc !== "/placeholder.jpg" &&
              imageSrc &&
              imageSrc.startsWith("/")
            ) {
              const baseUrl =
                "https://ambitious-cat-3135f7987e.media.strapiapp.com";
              imageSrc = `${baseUrl}${imageSrc}`;
            }
          } catch (error) {
            console.error("Error processing image:", error);
            // Keep using default placeholder on error
          }

          return (
            <SwiperSlide key={article.id || index} className="!h-auto">
              <div className="bg-gray-200 splashMiniXS flex-1 p-[1px] h-full">
                <div className="flex flex-col gap-0 bg-muted min-h-full p-2 splashMiniXS">
                  <Image
                    src={imageSrc}
                    alt={article.Titolo || "Article image"}
                    width={600}
                    height={400}
                    className="object-cover splashMiniXS"
                  />
                  <div className="flex flex-col p-4 flex-1 justify-between">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl font-semibold text-left mt-3">
                        {article.Titolo || "Untitled Article"}
                      </h3>
                      <p className="text-left mt-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, quos. Lorem ipsum dolor sit amet consectetur.
                      </p>
                      <Link
                        href={`${
                          article.Link_Esterno
                            ? article.Link_Esterno
                            : `/articoli/${article.Slug || article.id}`
                        }`}
                        className="w-fit"
                        prefetch={true}
                      >
                        <Button
                          variant="outline"
                          className="w-fit mb-4 cursor-pointer"
                        >
                          Read More <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                    <div
                      className={`flex flex-row w-full justify-between pt-4 p-4 splashMiniXS ${
                        article?.categorie_articoli?.Titolo === "News"
                          ? "bg-[var(--blue-primary)] text-white"
                          : "bg-[var(--green-primary)] text-white"
                      }`}
                    >
                      <span className="text-sm font-medium flex flex-row gap-2 items-center">
                        {article?.categorie_articoli?.Titolo == "News" ? (
                          <Rss className="w-4 h-4" />
                        ) : article?.categorie_articoli?.Titolo ==
                          "Proposals" ? (
                          <Paperclip className="w-4 h-4" />
                        ) : (
                          <Calendar className="w-4 h-4" />
                        )}
                        {article?.categorie_articoli?.Titolo || "Article"}
                      </span>
                      <span className="text-sm font-medium">
                        {article?.createdAt
                          ? new Date(article.createdAt).toLocaleDateString()
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        }
      )}
    </Swiper>
  );
}
