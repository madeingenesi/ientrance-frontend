import React, { useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function TrilloSlider() {
  const slides = [
    {
      id: 1,
      title: "Summer SchoolSummer School",
      description:
        "The Summer School iENTRANCE to research. The young scientist's guide to the galaxy. Rethinking research in an AI-empowered world.Is designed for young scientists entering the world of Research and offers a unique training opportunity thet combines academic excellence with an immersive hands-on experience, set in stunning natural setting.",
      image: "/images/main-topics-carousel/nanomaterials-for-energy.jpg",
    },
  ];

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        centeredSlides={false}
        pagination={false}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper h-[600px] !overflow-visible"
      >
        {slides?.map((slide: any, index: number) => (
          <SwiperSlide key={slide.id} className="h-full">
            <div className="flex flex-col md:flex-row gap-4 bg-muted h-full p-[1px] splashMini">
              <div className="flex flex-col gap-4 w-full md:w-1/3 p-6 md:p-16">
                <div className="flex flex-row gap-2 items-center">
                  <span className="bg-[var(--blue-primary)] text-white flex flex-row justify-center items-center rounded-full border-white border w-6 h-6 p-1 text-xs">
                    {index + 1}
                  </span>
                  <div className="w-4 h-[1px] bg-[var(--blue-primary)]"></div>
                  <span className="b text-[var(--blue-primary)] flex flex-row justify-center items-center rounded-full border-[var(--blue-primary)] border w-6 h-6 p-1 text-xs">
                    {slides.length}
                  </span>
                </div>
                <div className="flex flex-col justify-between h-full">
                  <h3 className="text-3xl font-semibold text-left mt-3 tracking-tight">
                    {slide.title}
                  </h3>
                  <p className="text-sm text-left">{slide.description}</p>
                </div>
              </div>
              <div className="w-full md:w-2/3 h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={1920}
                  height={1080}
                  className="!object-cover w-full h-full splashMini !h-[600px]"
                  priority
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
