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

export default function ExpertiseCarousel() {
  const slides = [
    {
      id: 1,
      title: "Nanoscience and Nanotechnology",
      description:
        "iENTRANCE provides access to a comprehensive suite of tools and expertise for micro- and nanoscale processing of materials, including synthesis, characterization, manipulation and micro- and nano-technological processes and devices fabrication.",
      image: "/images/pictures/ientrance-content-12.jpg",
    },
    {
      id: 2,
      title: "Advanced Materials Characterization",
      description:
        "The infrastructure offers top-level expertise in micro- and nanoscale structural, compositional, optoelectronic, in-situ, and in-operando characterization. This involves the use of advanced techniques to analyze the properties and behavior of materials at the atomic and molecular levels.",
      image: "/images/pictures/ientrance-content-14.jpg",
    },
    {
      id: 3,
      title: "Materials for Energy Applications",
      description:
        "iENTRANCE focuses on developing materials for next-generation energy technologies, including photovoltaics, battery technologies, supercapacitors, hydrogen production and storage, fuel cell technologies, and power electronics.",
      image: "/images/pictures/ientrance-content-9.jpg",
    },
    {
      id: 4,
      title: "Sustainable Materials and Practices",
      description:
        "The infrastructure supports research on sustainable materials and processes, including waste valorization, (photo)catalysis, sustainable polymers, material recyclability and durability, and low-impact fabrication.",
      image: "/images/pictures/ientrance-content-19.jpg",
    },
    {
      id: 5,
      title: "Data Management and Interoperability",
      description:
        "A strong focus is placed on FAIR data principles, ensuring that research data is Findable, Accessible, Interoperable, and Reusable. This includes the development of an online catalogue of methodologies, technologies, and facilities, with a focus on interoperability and open access.",
      image: "/images/pictures/ientrance-content-16.jpg",
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
        className="mySwiper overflow-hidden md:!overflow-visible"
      >
        {slides?.map((slide: any, index: number) => (
          <SwiperSlide key={slide.id}>
            <div className="flex flex-col md:flex-row gap-4 bg-muted p-[1px] splashMini h-full">
              <div className="flex flex-col gap-4 w-full md:w-2/4 p-8 md:p-16">
                <div className="flex flex-row gap-2 items-center">
                  <span className="bg-[var(--blue-primary)] text-white flex flex-row justify-center items-center rounded-full border-white border w-6 h-6 p-1 text-xs">
                    {index + 1}
                  </span>
                  <div className="w-4 h-[1px] bg-[var(--blue-primary)]"></div>
                  <span className="bg-white text-[var(--blue-primary)] flex flex-row justify-center items-center rounded-full border-[var(--blue-primary)] border w-6 h-6 p-1 text-xs">
                    {slides.length}
                  </span>
                </div>
                <div className="flex flex-col justify-between h-full flex-1 gap-8 md:gap-32">
                  <h3 className="text-2xl md:text-3xl font-semibold text-left mt-3">
                    {slide.title}
                  </h3>
                  <p className="text-left text-sm md:text-base">
                    {slide.description}
                  </p>
                </div>
              </div>
              <div className="w-full md:w-2/4">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={800}
                  height={400}
                  className="object-cover splashMini h-full"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
