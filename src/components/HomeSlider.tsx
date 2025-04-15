"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

// Icons
import { ChevronRight, ChevronLeft, ArrowRight, X } from "lucide-react";
import { Button } from "./ui/button";
import { title } from "process";

export default function HomeSlider({ data }: { data: any }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const swiperRef = useRef<{ swiper: SwiperType }>(null);
  const baseImageUrl = "http://localhost:1337";

  const newSlides = data;

  useEffect(() => {
    if (newSlides?.data?.Slider?.length) {
      console.log("newslider", newSlides.data.Slider);
      console.log("newSlides", newSlides.data.Slider[0].Immagine.url);
    }
  }, [newSlides]);

  const slides = [
    {
      id: 1,
      title:
        "We are <br /> a <strong>single entry point</strong><br /> to cutting-edge <strong>materials research</strong>",
      image: "/images/slidesHome/slide-1.jpg",
    },
    {
      id: 2,
      title:
        "We unlock <br/> <strong>materials</strong> and <strong>technologies</strong> <br/> for <strong>sustainability</strong>",
      image: "/images/slidesHome/slide-3.jpg",
      video: "/videos/video2.webm",
    },
    {
      id: 3,
      title:
        "We listen <br/> to <strong>needs</strong> <br/> for shaping <strong> solutions</strong>",
      image: "/images/slidesHome/slide-4.jpg",
      video: "/videos/video3.webm",
    },
    {
      id: 4,
      title:
        "We empower <br/> <strong>FAIR</strong> <br/> in a <strong>knowledge based</strong> framework",
      image: "/images/slidesHome/slide-5.jpg",
      video: "/videos/video4.webm",
    },
    {
      id: 5,
      title:
        "We think <br/> <strong>nano</strong><br/> to build <strong>macro</strong>",
      image: "/images/esempio.jpg",
    },
  ];

  const slideContent = [
    {
      id: 1,
      title:
        "We are a <strong>single entry point</strong> to cutting-edge <strong>materials research</strong>",
      text: "<p>iENTRANCE empowers researchers to significantly accelerate the development of breakthrough materials through collaborative research and simplified access. We integrate 14 top research units, 1000+ state-of-the-art instruments, and xxx+ expert researchers into one, integrated powerful resource.</p> <p>One entry point connects you to the full spectrum of nanoscience capabilities, accelerating your research. We foster collaborative materials research accessible to all, with a focus on enlarging our community of users, including industrial users and SMEs.</p> <p>Reflecting the mosaic in our logo, the distributed Research Infrastructure unites individual research units, each with distinct operational domains, into a cohesive knowledge framework. This mosaic provides a contextualized and integrated comprehensive offer and multidisciplinary understanding unattainable through isolated units</p>",
    },
    {
      id: 2,
      title:
        "We support <strong>transition</strong> matching <strong>competences</strong>",
      text: "We combine full-spectrum nanoscience expertise with a commitment to shaping a sustainable tomorrow, developing cutting-edge materials for the energy transition and a circular, resilient economy.",
      list: [
        "Energy Solutions: Next-generation photovoltaics, advanced battery technologies, high-performance supercapacitors, sustainable hydrogen production and storage, innovative fuel cell technologies, power electronics.",
        "Advanced Materials: Catalytic, electrode and thermoelectric materials, advanced membranes, smart materials and sensors.",
        "Sustainable Practices: Waste valorization, (photo)catalysis, sustainable polymers, enhancement of material recyclability and durability, low-impact fabrication.",
        "Characterization Expertise: micro- and nano-scale structural, compositional, optoelectronic, in-situ, and in-operando characterization.",
      ],
    },
    {
      id: 3,
      title:
        "We listen to <strong>needs</strong> for shaping <strong>solutions</strong>",
      text: "By proactively engaging with researchers, industry, policymakers, innovators, we identify critical challenges in energy and sustainability and develop custom solutions. Our target activities include:",
      list: [
        "Providing access to cutting-edge infrastructure",
        "Conducting technology scouting and assessment",
        "Facilitating collaborative research",
        "Developing tailored deployment projects",
        "Developing roadmaps and strategies",
        "Supporting innovation and entrepreneurship",
        "Informing policy and decision-making",
        "Fostering knowledge exchange",
        "Raising awareness and promoting education",
      ],
    },
    {
      id: 4,
      description:
        "Our approach is centered on understanding your specific needs. We work closely with partners to develop tailored solutions that address real-world challenges in materials science.",
    },
    {
      id: 5,
      description:
        "We champion FAIR principles in materials research, ensuring that data and knowledge are Findable, Accessible, Interoperable, and Reusable within a comprehensive framework.",
    },
    {
      id: 6,
      description:
        "From nanoscale innovations to macro-scale solutions, we bridge the gap between molecular engineering and practical applications, creating impact at every scale.",
    },
  ];

  return (
    <section className="mx-auto h-full relative !overflow-visible">
      {/* <Swiper
        navigation={false}
        modules={[Navigation]}
        className="mySwiper overflow-visible relative z-0 md:splashBottomLeft"
        onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
        ref={swiperRef}
      >
        {newSlides?.data?.Slider?.map((slide: any, index: number) => (
          <SwiperSlide
            key={slide.id}
            className="min-h-[70vh] bg-slate-500 !bg-cover !bg-center splashBottomLeft"
            style={{
              backgroundImage: `url(${baseImageUrl + slide.Immagine.url})`,
            }}
          >
            <div className="flex flex-col items-center justify-center"></div>
          </SwiperSlide>
        ))}
      </Swiper> */}
      <Swiper
        navigation={false}
        modules={[Navigation]}
        className="mySwiper overflow-visible relative z-0 md:splashBottomLeft"
        onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
        ref={swiperRef}
      >
        {slides?.map((slide: any, index: number) => (
          <SwiperSlide
            key={slide.id}
            className="min-h-[650px] bg-slate-500 !bg-cover !bg-center splashBottomLeft"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              id="bg-video"
              className="absolute inset-0 w-screen h-full object-cover"
            >
              <source src={slide.video} type="video/webm" />
            </video>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className="container w-full mx-auto -translate-y-2/3 z-50 relative -mb-20">
        <div className="w-full md:w-6/12 md:h-[350px] bg-[var(--blue-primary)] p-8 pb-18 md:p-12 md:pr-20 md:pb-18 splash">
          <div className="w-full h-full relative z-50">
            <div className="flex flex-col gap-4 justify-between items-start h-full">
              <h2
                className="text-2xl md:text-4xl fadeIn text-white tracking-tight"
                key={activeSlide}
              >
                {newSlides?.data?.Slider[activeSlide].Titolo}
              </h2>
              <Button variant="outline" className="">
                Read more <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-row justify-between items-center absolute -bottom-12 md:left-12 w-full md:pl-10 pr-5 z-50">
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
      </div> */}
      <div className="container w-full mx-auto -translate-y-[280px] z-50 relative -mb-20">
        <div className="w-full md:w-6/12 md:h-[350px] bg-[var(--blue-primary)] p-8 pb-18 md:p-12 md:pr-10 md:pb-18 splash">
          <div className="w-full h-full relative z-50">
            <div className="flex flex-col gap-4 justify-between items-start h-full">
              <h2
                className="text-2xl md:text-4xl fadeIn text-white tracking-tight"
                key={activeSlide}
                dangerouslySetInnerHTML={{ __html: slides[activeSlide].title }}
              />
              <Button
                variant="outline"
                className=""
                onClick={() => setIsDialogOpen(true)}
              >
                Read more <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-row justify-between items-center absolute -bottom-12 md:left-12 w-full md:pl-10 pr-5 z-50">
              <div className="text-white flex flex-row items-center gap-2">
                {activeSlide + 1}{" "}
                <div className="w-[25px] h-[1px] bg-white"></div>{" "}
                {slides.length}
              </div>
              <div className="flex flex-row gap-2 pr-6">
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
      </div>

      {/* Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="bg-white p-16 w-full max-w-2xl mx-4 relative splash flex flex-col gap-4">
            <h2
              className="text-2xl mb-4"
              dangerouslySetInnerHTML={{
                __html: slideContent[activeSlide]?.title || "",
              }}
            />
            <p
              className="leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: slideContent[activeSlide]?.text || "",
              }}
            />
            {slideContent[activeSlide].list && (
              <ul className="list-disc pl-6 space-y-2">
                {slideContent[activeSlide].list.map(
                  (item: string, index: number) => (
                    <li
                      key={index}
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  )
                )}
              </ul>
            )}
            <Button
              variant="default"
              className="self-end"
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
