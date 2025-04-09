import React, { useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export default function ExpertiseCarousel() {
  const slides = [
    {
      id: 1,
      title: "Nanomaterials for energy",
      description:
        "iENTRANCE provides access to a comprehensive suite of tools and expertise for micro- and nanoscale processing of materials, including synthesis, characterization, manipulation and micro- and nano-technological processes and devices fabrication.",
      image: "/images/esempio.jpg",
    },
    {
      id: 2,
      title: "Green Energy Materials and Processing",
      description:
        "The infrastructure offers top-level expertise in micro- and nanoscale structural, compositional, optoelectronic, in-situ, and in-operando characterization. This involves the use of advanced techniques to analyze the properties and behavior of materials at the atomic and molecular levels.",
      image: "/images/esempio.jpg",
    },
    {
      id: 3,
      title: "Multiscale Characterization of Micro/Nanosystems",
      description:
        "iENTRANCE focuses on developing materials for next-generation energy technologies, including photovoltaics, battery technologies, supercapacitors, hydrogen production and storage, fuel cell technologies, and power electronics.",
      image: "/images/esempio.jpg",
    },
    {
      id: 4,
      title: "Device and System Fabrication Technologies",
      description:
        "The infrastructure supports research on sustainable materials and processes, including waste valorization, (photo)catalysis, sustainable polymers, material recyclability and durability, and low-impact fabrication.",
      image: "/images/esempio.jpg",
    },
  ];

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        centeredSlides={false}
        pagination={false}
        navigation={false}
        modules={[Pagination]}
        className="mySwiper h-full !overflow-visible"
      >
        {slides?.map((slide: any, index: number) => (
          <SwiperSlide key={slide.id} className="">
            <div className="flex flex-col md:flex-row gap-4 bg-muted min-h-[350px] p-[1px] splashMini">
              <div className="flex flex-col gap-4 min-h-[350px] w-full md:w-1/3 p-6 md:p-16">
                <div className="flex flex-row gap-2 items-center">
                  <span className="bg-[var(--blue-primary)] text-white flex flex-row justify-center items-center rounded-full border-white border w-6 h-6 p-1 text-xs">
                    {index + 1}
                  </span>
                  <div className="w-4 h-[1px] bg-[var(--blue-primary)]"></div>
                  <span className="b text-[var(--blue-primary)] flex flex-row justify-center items-center rounded-full border-[var(--blue-primary)] border w-6 h-6 p-1 text-xs">
                    {slides.length}
                  </span>
                </div>
                <div className="flex flex-col justify-between h-full flex-1">
                  <h3 className="text-3xl font-semibold text-left mt-3 tracking-tight">
                    {slide.title}
                  </h3>
                  <p className="text-sm text-left">{slide.description}</p>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={800}
                  height={800}
                  className="object-cover splashMini"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
