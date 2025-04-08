"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

// Icons
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
export default function HomeSlider({ data }: { data: any }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef(null);
  const baseImageUrl = "http://localhost:1337";

  const newSlides = data;

  useEffect(() => {
    if (newSlides?.data?.Slider?.length) {
      console.log("newslider", newSlides.data.Slider);
      console.log("newSlides", newSlides.data.Slider[0].Immagine.url);
    }
  }, [newSlides]);

  // const slides = [
  //   {
  //     id: 1,
  //     title: "We are a single entry point to cutting-edge materials research",
  //     image: "/images/slide1.jpg",
  //   },
  //   {
  //     id: 2,
  //     title: "We unlock materials and technologies for sustainability",
  //     image: "/images/slide2.jpg",
  //   },
  //   {
  //     id: 3,
  //     title: "We listen to needs for shaping solutions",
  //     image: "/images/slide1.jpg",
  //   },
  //   {
  //     id: 4,
  //     title: "We empower FAIR in a knowledge based framework",
  //     image: "/images/slide2.jpg",
  //   },
  //   {
  //     id: 5,
  //     title: "We think nano to build macro",
  //     image: "/images/slide1.jpg",
  //   },
  //   {
  //     id: 6,
  //     title: "We are a single entry point to cutting-edge materials research",
  //     image: "/images/slide1.jpg",
  //   },
  // ];

  return (
    <section className=" mx-auto h-full relative bg-red-500 border border-t-0 splash !overflow-visible relative">
      <Swiper
        navigation={false}
        modules={[Navigation]}
        className="mySwiper overflow-visible z-0"
        onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
        ref={swiperRef}
      >
        {newSlides?.data?.Slider?.map((slide: any, index: number) => (
          <SwiperSlide
            key={slide.id}
            className="min-h-[60vh] bg-slate-500 !bg-cover !bg-center"
            style={{
              backgroundImage: `url(${baseImageUrl + slide.Immagine.url})`,
            }}
          >
            <div className="flex flex-col items-center justify-center"></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-0 left-15 w-5/12 h-[350px] bg-[var(--blue-primary)] z-20 splash p-12 pr-16 pb-18 z-50">
        <div className="w-full h-full relative z-50">
          <div className="flex flex-col gap-4 justify-between items-start h-full">
            <h2
              className="text-4xl fadeIn text-white tracking-tight"
              key={activeSlide}
            >
              {newSlides?.data?.Slider[activeSlide].Titolo}
            </h2>
            <Button variant="outline" className="">
              Read more <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-row justify-between items-center absolute -bottom-12 left-12 w-full pl-10 pr-5 z-50">
            <div className="text-white flex flex-row items-center gap-2">
              {activeSlide + 1}{" "}
              <div className="w-[25px] h-[1px] bg-white"></div>{" "}
              {newSlides?.data?.Slider?.length}
            </div>
            <div className="flex flex-row gap-2 ">
              <ChevronLeft
                className="text-white"
                onClick={() => swiperRef.current?.swiper.slidePrev()}
              >
                Prev
              </ChevronLeft>
              <ChevronRight
                className="text-white"
                onClick={() => swiperRef.current?.swiper.slideNext()}
              >
                Next
              </ChevronRight>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
