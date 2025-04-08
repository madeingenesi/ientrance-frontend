import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export default function HomeCarousel({ boxes }: any) {
  const baseImageUrl = "http://localhost:1337";
  const newBoxes = boxes?.data?.BoxesSection;

  console.log("boxes", newBoxes);

  const slides = [
    {
      id: 1,
      title: "Expertise n°1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      image: "/images/carousel/slide1.jpg",
    },
    {
      id: 2,
      title: "Expertise n°2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    },
    {
      id: 3,
      title: "Expertise n°3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    },
    {
      id: 4,
      title: "Expertise n°4",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
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
        className="mySwiper h-full overflow-hidden md:!overflow-visible"
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
        {newBoxes?.map((slide: any, index: number) => (
          <SwiperSlide key={slide.id} className="">
            <div className="flex flex-col gap-4 bg-muted min-h-[350px] p-8 splashMini">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2 justify-start items-center">
                  <span className="bg-white text-black flex flex-row justify-center items-center rounded-full border-white border w-6 h-6 p-1 text-xs">
                    {index + 1}
                  </span>
                  <div className="w-4 h-[1px] bg-white"></div>
                  <span className="b text-black flex flex-row justify-center items-center rounded-full border-white border w-6 h-6 p-1 text-xs">
                    {newBoxes.length}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-left mt-3">
                  {slide.Title}
                </h3>
                <p className="text-sm text-left pr-18">{slide.Description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
