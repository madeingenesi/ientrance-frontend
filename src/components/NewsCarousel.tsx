import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Rss, Paperclip, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

// Swiper modules
import { Pagination, Navigation } from "swiper/modules";

export default function NewsCarousel({ articles }: any) {
  const baseImageUrl = "http://localhost:1337";
  const data = articles?.data?.Articles;

  return (
    <>
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
        {articles
          ?.sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((article: any, index: number) => {
            const imageUrl =
              article?.Immagine?.url || "/images/placeholder.jpg";

            const firstParagraph =
              article?.Contenuto?.[0]?.children?.[0]?.text || "";

            return (
              <SwiperSlide key={article.id} className="!h-auto">
                <div className="bg-gray-200 splashMiniXS flex-1 p-[1px] h-full">
                  <div className="flex flex-col gap-0 bg-muted min-h-full p-2 splashMiniXS">
                    {/* <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-2 justify-start items-center">
                        <span className="bg-white text-black flex flex-row justify-center items-center rounded-full border-white border w-6 h-6 p-1 text-xs">
                          {index + 1}
                        </span>
                        <div className="w-4 h-[1px] bg-white"></div>
                        <span className="b text-black flex flex-row justify-center items-center rounded-full border-white border w-6 h-6 p-1 text-xs">
                          {articles.length}
                        </span>
                      </div>
                    </div>
                  </div> */}
                    <Image
                      src={imageUrl}
                      alt={"placeholder"}
                      width={600}
                      height={400}
                      className="object-cover splashMiniXS !h-[300px]"
                    />
                    <div className="flex flex-col p-4 flex-1 justify-between">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-2xl font-semibold text-left mt-3">
                          {article.Titolo}
                        </h3>
                        <p className="text-left mt-3">
                          {firstParagraph.length > 100
                            ? firstParagraph.substring(0, 100) + "..."
                            : firstParagraph}
                        </p>
                        <Link
                          href={`${
                            article.Link_Esterno
                              ? article.Link_Esterno
                              : `/${article.Slug}`
                          }`}
                          className="w-fit"
                          prefetch={true}
                          target={article.Link_Esterno ? "_blank" : "_self"}
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
                          {article?.categorie_articoli?.Titolo}
                        </span>
                        <span className="text-sm font-medium">
                          {new Date(article?.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
}
