import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DecryptedText from "@/components/DecryptedText";
import type { HighlightedEntry } from "@/context/HighlightedsContext";
import { safeHref } from "@/lib/safeHref";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { ArrowRight } from "lucide-react";

// Swiper modules
import { Navigation } from "swiper/modules";

// Carosello degli highlighted in home: 2 box visibili, scorre di 1 box alla volta
export default function HighlightedsCarousel({
  items,
}: {
  items: HighlightedEntry[];
}) {
  return (
    <Swiper
      slidesPerView={1}
      slidesPerGroup={1}
      spaceBetween={24}
      navigation={true}
      modules={[Navigation]}
      className="w-full"
      breakpoints={{
        768: {
          slidesPerView: 2,
          spaceBetween: 48,
        },
      }}
    >
      {items.map((item) => (
        <SwiperSlide key={item.id} className="!h-auto">
          <div className="bg-gray-200 splash relative pb-6 h-full">
            <div className="flex flex-col gap-4 items-start bg-[var(--green-secondary)] p-5 pt-20 md:p-16 splash text-white h-full">
              <div className="flex flex-1 flex-col gap-2 items-start text-left">
                <span className="text-sm font-semibold uppercase absolute top-0 left-5 p-2 px-4 bg-[var(--blue-primary)] text-white splashMiniXS">
                  Highlighted
                </span>
                <DecryptedText
                  text={item.Title || "\u00a0"}
                  animateOn="view"
                  sequential={true}
                  maxIterations={20}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
                  speed={50}
                  revealDirection="start"
                  encryptedClassName="text-3xl md:text-3xl font-medium tracking-tight"
                  className="text-3xl md:text-3xl text-left max-w-3xl font-medium tracking-tight"
                />
                {item.Subtitle ? (
                  <span className="text-2xl max-w-2xl text-left font-semibold">
                    {item.Subtitle}
                  </span>
                ) : null}
                {item.Content ? (
                  <p className="text-sm max-w-2xl text-left ">{item.Content}</p>
                ) : null}
                <Link href={safeHref(item.Url) ?? "#"} className="mt-auto pt-8">
                  <Button className="cursor-pointer">
                    {item.ButtonText?.trim() || "Discover more"}{" "}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
