"use client";

// Next
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

// Context
import { useArticlesContext } from "../context/ArticlesContext";
import { useEquipments } from "@/context/EquimentContext";

// Components
import HomeSlider from "../components/HomeSlider";
import NewsCarousel from "../components/NewsCarousel";
import Aurora from "../components/Aurora";
import MainTopicsCarousel from "../components/MainTopicsCarousel";
import MapplicMap from "../components/Map";
import PartnersCarousel from "../components/PartnersCarousel";

// UI
import { Button } from "../components/ui/button";
import DecryptedText from "../components/DecryptedText";

// Icons
import {
  ArrowUpRight,
  LibraryBig,
  MessagesSquare,
  ArrowRight,
  Rss,
  Calendar,
  Paperclip,
  Megaphone,
} from "lucide-react";

interface SlideProps {
  image: string;
  title: string;
  description: string;
}

export default function Home() {
  const { articles } = useArticlesContext();
  const [slides, setSlides] = useState<SlideProps[]>([]);
  const [boxes, setBoxes] = useState([]);
  const { machineries } = useEquipments();
  const [techniques, setTechniques] = useState<string[]>([]);

  useEffect(() => {
    const uniqueTechniques = new Set(
      machineries
        .filter((machine: any) => machine.equipmentStatus !== "Offline")
        .map((machine: any) => machine.techniqueName?.split(">", 2)[1])
    );
    setTechniques(
      Array.from(uniqueTechniques as unknown as string[]).filter(Boolean)
    );
  }, [machineries]);

  const fetchData = async (url: string, setData: any) => {
    const baseUrl = "http://localhost:1337";
    const response = await axios.get(`${baseUrl}/api/${url}`);
    console.log("response", response);
    setData(response.data);
  };

  useEffect(() => {
    fetchData(
      "home-page?populate[0]=Slider&populate[1]=Slider.Immagine",
      setSlides
    );
    fetchData("home-page?populate[0]=BoxesSection", setBoxes);
  }, []);

  return (
    <main className="w-full mx-auto">
      <section className="w-full mx-auto !overflow-visible z-10 relative !-mb-[150px]">
        <HomeSlider data={slides} />
      </section>

      {/* {articles.map((article: any) => (
        <div key={article.id}>
          <h2>{article.Titolo}</h2>
          {article.Contenuto.map((content: any) => {
            return (
              <p key={content.id} className="py-2">
                {content.children[0].text}
              </p>
            );
          })}
        </div>
      ))} */}

      <section className="container w-full flex flex-col md:flex-row mx-auto mb-12 md:mb-32 relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-screen md:before:h-[2px] md:before:bg-[var(--green-secondary)] md:before:z-0 md:before:translate-x-[-50%] md:before:translate-y-[-50%] z-0 p-2 md:p-0 gap-12">
        <div className="bg-gray-200 splash relative pb-6 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-start mb-4 bg-[var(--green-secondary)] p-5 pt-20 md:p-16 max-w-5xl mx-auto splash text-white h-full">
            <div className="flex flex-1 flex-col gap-2 items-start">
              <span className="text-sm font-semibold uppercase absolute top-0 left-5 p-2 px-4 bg-[var(--blue-primary)] text-white splashMiniXS">
                Highlighted
              </span>
              <Megaphone className="w-12 h-12 stroke-1 hidden" />
              <DecryptedText
                text="iENTRANCE Summer School"
                animateOn="view"
                sequential={true}
                maxIterations={20}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
                speed={50}
                revealDirection="start"
                encryptedClassName="text-3xl md:text-3xl font-medium tracking-tight"
                className="text-3xl md:text-3xl !text-center max-w-3xl font-medium tracking-tight"
              />
              <span className="text-2xl max-w-2xl text-center font-semibold">
                3-6 June 2025
              </span>
              <p className="text-sm max-w-2xl text-left ">
                The Summer School "iENTRANCE to research. The young scientist's
                guide to the galaxy. Rethinking research in an AI-empowered
                world."Is designed for young scientists entering the world of
                Research and offers a unique training opportunity thet combines
                academic excellence with an immersive hands-on experience, set
                in stunning natural setting.
              </p>
              <Link
                href="/i-entrance-summer-school-3-6-june-2025"
                className="mt-8"
              >
                <Button className="cursor-pointer">
                  Discover more <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 splash relative pb-6 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-start mb-4 bg-[var(--green-secondary)] p-5 pt-20 md:p-16 max-w-5xl mx-auto splash text-white h-full">
            <div className="flex flex-1 flex-col gap-2 items-start">
              <span className="text-sm font-semibold uppercase absolute top-0 left-5 p-2 px-4 bg-[var(--blue-primary)] text-white splashMiniXS">
                Highlighted
              </span>
              <Megaphone className="w-12 h-12 stroke-1 hidden" />
              <DecryptedText
                text="The First Call is open"
                animateOn="view"
                sequential={true}
                maxIterations={20}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
                speed={50}
                revealDirection="start"
                encryptedClassName="text-3xl md:text-3xl font-medium tracking-tight"
                className="text-3xl md:text-3xl !text-center max-w-3xl font-medium tracking-tight"
              />
              <span className="text-2xl max-w-2xl text-center font-semibold">
                Deadline June 25, 2025
              </span>
              <p className="text-sm max-w-2xl text-left ">
                The first call for access to the iENTRANCE research
                infrastructure is now open. You can find the application
                procedure in the “Send your project” section, where you can
                download the submission form and consult the specific
                guidelines. Once the eligibility criteria are met, applications
                must be submitted no later than 11:59 PM on June 25, 2025.
              </p>
              <Link href="/catalogue" className="mt-8">
                <Button className="cursor-pointer">
                  Browse our catalogue <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-16 justify-center items-center pt-0 pb-5 splashMaxi relative">
        <div className=" container w-full mx-auto flex flex-col gap-4 justify-center items-start px-4 md:px-8  z-10">
          <div className="flex flex-col md:flex-row w-full justify-between gap-4 items-start md:items-center mb-8">
            <div className="flex flex-col gap-4 items-start">
              <LibraryBig className="w-12 h-12 stroke-1" />
              <DecryptedText
                text="Our catalogue"
                animateOn="view"
                sequential={true}
                maxIterations={20}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
                speed={50}
                revealDirection="start"
                encryptedClassName="text-3xl md:text-5xl font-medium tracking-tight"
                className="text-3xl md:text-5xl !text-center max-w-3xl font-medium tracking-tight"
              />
              <p className="text-sm md:text-xl max-w-2xl text-left">
                Discover our state-of-the-art research infrastructure machine
                catalog, showcasing cutting-edge equipment designed to drive
                innovation.
              </p>
            </div>
            <Link href="/catalogue">
              <Button className="hover:cursor-pointer">
                Go to catalogue{" "}
                <ArrowRight className="w-4 h-4 hover:cursor-pointer" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
            <div className="flex flex-col gap-4 p-2 h-full">
              <span className="text-5xl md:text-6xl font-medium">
                {techniques.length}+
              </span>
              <h4 className="text-lg font-semibold tracking-tight border-t pt-4">
                Scientific techniques
              </h4>
            </div>
            <div className="flex flex-col gap-4 p-2 h-full">
              <span className="text-5xl md:text-6xl font-medium">
                {machineries.length}+
              </span>
              <h4 className="text-lg font-semibold tracking-tight border-t pt-4">
                Instruments
              </h4>
            </div>
            <div className="flex flex-col gap-4 p-2 h-full">
              <span className="text-5xl md:text-6xl font-medium">70M€+</span>
              <h4 className="text-lg font-semibold tracking-tight border-t pt-4">
                Investments
              </h4>
            </div>
            <div className="flex flex-col gap-4 p-2 h-full">
              <span className="text-5xl md:text-6xl font-medium">80+</span>
              <h4 className="text-lg font-semibold tracking-tight border-t pt-4">
                Researchers involved
              </h4>
            </div>
          </div>
        </div>
        <div className="container w-full max-w-7xl mx-auto z-10 flex flex-col justify-center items-center">
          <Link href="/catalogue">
            <Image
              src="/images/Browsers.png"
              alt="catalogue"
              width={1920}
              height={1080}
              className="w-full hover:translate-y-[-10px] transition-all duration-300"
              unoptimized
            />
          </Link>
          <Link href="/catalogue">
            <Button className="md:translate-y-[-50px] hover:cursor-pointer">
              Go to catalogue <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="w-full h-full hidden md:block absolute top-0 left-0 opacity-80 rotate-180 z-0">
          <Aurora speed={1} amplitude={1} />
        </div>
      </section>

      <section
        className="container mx-auto w-full flex flex-col bg-white relative mt-12 md:mt-28"
        id="values"
      >
        <div className="bg-gray-200 splash py-[1px]">
          <div
            className="flex flex-row gap-8 p-2 md:p-8 splash border-none justify-between items-end"
            style={{
              backgroundImage:
                "url('/images/pictures/ientrance-content-28.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex flex-col bg-muted splash p-4 md:p-12 w-full md:w-6/12 min-h-[35vh] justify-between">
              <DecryptedText
                text="iENTRANCE infrastructure access: a step-by-step guide"
                animateOn="view"
                sequential={true}
                maxIterations={20}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
                speed={50}
                revealDirection="start"
                encryptedClassName="text-4xl font-medium tracking-tight"
                className="text-4xl max-w-3xl font-medium tracking-tight"
              />
              <div className="flex flex-col mt-24 self-end mb-12">
                <div className="flex flex-col">
                  <p className="text-left">
                    iENTRANCE is excited to offer access to its state-of-the-art
                    research infrastructure through a series of annual open
                    calls. We welcome applications from researchers and industry
                    professionals seeking to leverage our advanced facilities
                    and expertise.
                  </p>
                  <Link href="/come-in#guide">
                    <Button className="">
                      Come in! <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container w-full mx-auto flex flex-col items-center justify-center py-12 md:py-32 gap-10 md:gap-18 px-4 md:px-0 overflow-hidden md:overflow-visible">
        <div className="flex flex-col items-center gap-4 text-center max-w-5xl px-8">
          <span className="font-semibold flex flex-row gap-2 items-center">
            <MessagesSquare className="w-12 h-12 stroke-1" />
          </span>

          <DecryptedText
            text="Main topics"
            animateOn="view"
            sequential={true}
            maxIterations={20}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
            speed={50}
            revealDirection="start"
            encryptedClassName="text-3xl md:text-5xl font-medium tracking-tight text-center"
            className="text-3xl md:text-5xl !text-center max-w-3xl font-medium tracking-tight text-center"
          />
          <p className="text-center text-sm md:text-xl max-w-2xl">
            iENTRANCE is committed to addressing complex challenges across both
            technological and methodological frontiers. We aim to be a catalyst
            for innovation and sustainable development through targeted
            initiatives
          </p>
        </div>

        <MainTopicsCarousel />

        {/* <div className="grid grid-cols-12 grid-rows-2 gap-2">
          <div className="splash custom-spotlight-card col-span-4 row-span-2 bg-[var(--green-primary)] min-h-[300px] p-8 flex flex-col justify-between border-none rounded-none text-white">
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl font-medium ">
                Nanomaterials for energy
              </h3>
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
                eiusmod tempor incididunt ut labor.
              </p>
            </div>
            <button className="bg-blue-primary  self-end">
              <ArrowUpRight className="w-12 h-12 stroke-1" />
            </button>
          </div>
          <div className="col-span-4 row-span-1 bg-[var(--green-secondary)] min-h-[300px] splash p-8 flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl font-medium text-white">
                Green Energy Materials and Processing
              </h3>
              <p className="text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
                eiusmod tempor incididunt ut labor.
              </p>
            </div>
            <button className="bg-blue-primary text-white self-end">
              <ArrowUpRight className="w-12 h-12 stroke-1" />
            </button>
          </div>
          <div className="col-span-4 row-span-1 bg-[var(--green-primary)] min-h-[300px] splash p-8 flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl font-medium text-white">
                Multiscale Characterization of Micro/Nanosystems
              </h3>
              <p className="text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
                eiusmod tempor incididunt ut labor.
              </p>
            </div>
            <button className="bg-blue-primary text-white self-end">
              <ArrowUpRight className="w-12 h-12 stroke-1" />
            </button>
          </div>
          <div className="col-span-4 row-span-1 col-start-5 row-start-2 col-end-13 row-end-2 bg-[var(--green-tertiary)] min-h-[300px] splash p-8 flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl font-medium text-white">
                Device and System Fabrication Technologies
              </h3>
              <p className="text-white max-w-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
                eiusmod tempor incididunt ut labor.
              </p>
            </div>
            <button className="bg-blue-primary text-white self-end">
              <ArrowUpRight className="w-12 h-12 stroke-1" />
            </button>
          </div>
        </div> */}

        {/* <div className="w-full">
          <Tabs
            defaultValue="nanomaterials"
            className="w-full max-w-7xl mx-auto"
          >
            <TabsList className="w-full h-full">
              <TabsTrigger
                value="nanomaterials"
                className="flex-1 text-xl data-[state=active]:bg-[var(--blue-primary)] data-[state=active]:text-white "
              >
                Nanomaterials for energy
              </TabsTrigger>
              <TabsTrigger
                value="green"
                className="flex-1 text-xl data-[state=active]:bg-[var(--blue-primary)] data-[state=active]:text-white"
              >
                Green Energy Materials
              </TabsTrigger>
              <TabsTrigger
                value="multiscale"
                className="flex-1 text-xl data-[state=active]:bg-[var(--blue-primary)] data-[state=active]:text-white"
              >
                Multiscale Characterization
              </TabsTrigger>
              <TabsTrigger
                value="fabrication"
                className="flex-1 text-xl data-[state=active]:bg-[var(--blue-primary)] data-[state=active]:text-white"
              >
                Device and System Fabrication
              </TabsTrigger>
            </TabsList>
            <TabsContent value="nanomaterials">
              <div className="flex flex-row gap-4 bg-muted rounded min-h-[500px]">
                <div className="w-1/2 p-12 flex flex-col justify-between">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-3xl font-semibold tracking-tight ">
                      Nanomaterials for energy
                    </h3>
                    <p className="text-xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua eiusmod tempor incididunt ut labor.
                    </p>
                  </div>
                  <Button className="self-end">
                    Discover more
                    <ArrowRight className="w-12 h-12 stroke-1" />
                  </Button>
                </div>
                <div className="w-1/2">
                  <Image
                    src="/images/esempio.jpg"
                    alt="nanomaterials"
                    width={1000}
                    height={1000}
                    className="w-full object-cover h-full rounded-r"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="green">
              <div className="flex flex-row gap-4 bg-muted rounded min-h-[500px]">
                <div className="w-1/2 p-12 flex flex-col justify-between">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-3xl font-semibold tracking-tight ">
                      Green Energy Materials and Processing
                    </h3>
                    <p className="text-xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua eiusmod tempor incididunt ut labor.
                    </p>
                  </div>
                  <Button className="self-end">
                    Discover more
                    <ArrowRight className="w-12 h-12 stroke-1" />
                  </Button>
                </div>
                <div className="w-1/2">
                  <Image
                    src="/images/esempio.jpg"
                    alt="nanomaterials"
                    width={1000}
                    height={1000}
                    className="w-full object-cover h-full rounded-r"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="multiscale">
              <div className="flex flex-row gap-4 bg-muted rounded min-h-[500px]">
                <div className="w-1/2 p-12 flex flex-col justify-between">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-3xl font-semibold tracking-tight ">
                      Multiscale Characterization of Micro/Nanosystems
                    </h3>
                    <p className="text-xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua eiusmod tempor incididunt ut labor.
                    </p>
                  </div>
                  <Button className="self-end">
                    Discover more
                    <ArrowRight className="w-12 h-12 stroke-1" />
                  </Button>
                </div>
                <div className="w-1/2">
                  <Image
                    src="/images/esempio.jpg"
                    alt="nanomaterials"
                    width={1000}
                    height={1000}
                    className="w-full object-cover h-full rounded-r"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="fabrication">
              <div className="flex flex-row gap-4 bg-muted rounded min-h-[500px]">
                <div className="w-1/2 p-12 flex flex-col justify-between">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-3xl font-semibold tracking-tight ">
                      Device and System Fabrication Technologies
                    </h3>
                    <p className="text-xl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua eiusmod tempor incididunt ut labor.
                    </p>
                  </div>
                  <Button className="self-end">
                    Discover more
                    <ArrowRight className="w-12 h-12 stroke-1" />
                  </Button>
                </div>
                <div className="w-1/2">
                  <Image
                    src="/images/esempio.jpg"
                    alt="nanomaterials"
                    width={1000}
                    height={1000}
                    className="w-full object-cover h-full rounded-r"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div> */}

        {/* <div className="flex flex-row gap-2 gap-2 w-full">
          <div className="col-span-4 row-span-3 col-start-1 row-start-1">
            <div className="bg-gray-200 splashMini p-[1px] pb-4 flex flex-1 flex-col h-full">
              <div className="flex flex-col gap-4 bg-[var(--green-secondary)] text-white splashMini pb-4 h-full">
                <Image
                  src="/images/esempio.jpg"
                  alt="nanomaterials"
                  width={500}
                  height={500}
                  className="w-full object-cover splashMini h-[300px]"
                />
                <div className="flex flex-col gap-4 p-6">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    Nanomaterials for energy
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua eiusmod tempor incididunt ut labor.
                  </p>
                </div>
                <button className="bg-blue-primary self-end">
                  <ArrowUpRight className="w-12 h-12 stroke-1" />
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-4 row-span-2 col-start-1 row-start-4">
            <div className="bg-gray-200 splashMini p-[1px] pb-4 flex flex-1 flex-col h-full">
              <div className="flex flex-col gap-4 bg-[var(--green-secondary)] text-white splashMini pb-4 h-full">
                <Image
                  src="/images/esempio.jpg"
                  alt="nanomaterials"
                  width={500}
                  height={500}
                  className="w-full object-cover splashMini h-[300px]"
                />
                <div className="flex flex-col gap-4 p-6">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    Green Energy Materials and Processing
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua eiusmod tempor incididunt ut labor.
                  </p>
                </div>
                <button className="bg-blue-primary self-end">
                  <ArrowUpRight className="w-12 h-12 stroke-1" />
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-4 row-span-3 col-start-9 row-start-1">
            <div className="bg-gray-200 splashMini p-[1px] pb-4 flex flex-1 flex-col h-full">
              <div className="flex flex-col gap-4 bg-[var(--green-secondary)] text-white splashMini pb-4 h-full">
                <Image
                  src="/images/esempio.jpg"
                  alt="nanomaterials"
                  width={500}
                  height={500}
                  className="w-full object-cover splashMini h-[300px]"
                />
                <div className="flex flex-col gap-4 p-6">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    Multiscale Characterization of Micro/Nanosystems
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua eiusmod tempor incididunt ut labor.
                  </p>
                </div>
                <button className="bg-blue-primary self-end">
                  <ArrowUpRight className="w-12 h-12 stroke-1" />
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-4 row-span-2 col-start-9 row-start-4">
            <div className="bg-gray-200 splashMini p-[1px] pb-4 flex flex-1 flex-col h-full">
              <div className="flex flex-col gap-4 bg-[var(--green-secondary)] text-white splashMini pb-4 h-full">
                <Image
                  src="/images/esempio.jpg"
                  alt="nanomaterials"
                  width={500}
                  height={500}
                  className="w-full object-cover splashMini h-[300px]"
                />
                <div className="flex flex-col gap-4 p-6">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    Device and System Fabrication Technologies
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua eiusmod tempor incididunt ut labor.
                  </p>
                </div>
                <button className="bg-blue-primary self-end">
                  <ArrowUpRight className="w-12 h-12 stroke-1" />
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </section>

      <section className="bg-[var(--blue-primary)] h-[60vh] w-full relative px-8 hidden">
        <div className="container w-full max-w-7xl mx-auto h-full relative">
          <div className="absolute bottom-0 left-8 md:left-0 w-6/12 h-[350px] bg-white z-20 splash p-12 pr-16 pb-18">
            <div className="w-full h-full relative">
              <div className="flex flex-col gap-4 justify-between items-start h-full">
                <h2 className="text-4xl fadeIn text-black tracking-tight">
                  Discover our cutting-edge instruments for sustainable energy
                  solutions
                </h2>
                <Button variant="outline" className="">
                  Read more <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#F9FAFB] py-12 md:py-20 splashMaxi">
        <div className="container mx-auto w-full flex flex-col gap-4 justify-center items-center px-8 md:px-0 relative">
          <DecryptedText
            text="Nodes and Operational Units "
            animateOn="view"
            sequential={true}
            maxIterations={20}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
            speed={50}
            revealDirection="start"
            encryptedClassName="text-4xl md:text-5xl font-medium tracking-tight !text-center"
            className="text-4xl md:text-5xl !text-center max-w-3xl font-medium tracking-tight"
          />
          <p className="text-sm md:text-xl max-w-2xl text-center balanced">
            iENTRANCE is based on six geographical nodes and thirteen
            operational units distributed along the Italian peninsula.
          </p>
          <div className="relative w-full h-full grid grid-cols-12 gap-8">
            <div className="hidden md:flex flex-col w-full h-full col-span-3 bg-white splashMini p-8 gap-8">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-medium tracking-tight font-semibold text-[var(--blue-primary)] pb-2 border-b mb-2">
                  TORINO
                </h3>
                <ul>
                  <li>Politecnico di Torino {"(PoliTo)"}</li>
                  <li>Istituto Nazionale di Ricerca Metrologica {"(INRIM)"}</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-medium tracking-tight font-semibold text-[var(--blue-primary)] pb-2 border-b mb-2">
                  PARMA
                </h3>
                <ul>
                  <li>
                    CNR Istituto dei Materiali per l'Elettronica ed il
                    Magnetismo
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-medium tracking-tight font-semibold text-[var(--blue-primary)] pb-2 border-b mb-2">
                  MODENA
                </h3>
                <ul>
                  <li>Istituto Nanoscienze {"(CNR-NANO)"}</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-medium tracking-tight font-semibold text-[var(--blue-primary)] pb-2 border-b mb-2">
                  BOLOGNA
                </h3>
                <ul>
                  <li>
                    Istituto per lo Studio dei Materiali Nanostrutturati{" "}
                    {"(CNR-ISMN)"}
                  </li>
                </ul>
              </div>
            </div>
            <MapplicMap />
            <div className="hidden md:flex flex-col w-full h-full col-span-3 bg-white splashMini p-8 gap-8">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-medium tracking-tight font-semibold text-[var(--blue-primary)] pb-2 border-b mb-2">
                  ROMA
                </h3>
                <ul>
                  <li>Università Sapienza di Roma</li>
                  <li>Univerisità Roma3</li>
                  <li>CNR Istituto di Struttura della Materia</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-medium tracking-tight font-semibold text-[var(--blue-primary)] pb-2 border-b mb-2">
                  NAPOLI
                </h3>
                <ul>
                  <li>
                    Istituto per i Polimeri Compositi e Biomateriali{" "}
                    {"(CNR-IPCB)"}
                  </li>
                  <li>
                    Istituto di Scienze e Tecnologie per l'Energia e la Mobilità
                    Sostenibili {"(CNR-STEMS)"}
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-medium tracking-tight font-semibold text-[var(--blue-primary)] pb-2 border-b mb-2">
                  POTENZA
                </h3>
                <ul>
                  <li>CNR Istituto di Struttura della Materia</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-medium tracking-tight font-semibold text-[var(--blue-primary)] pb-2 border-b mb-2">
                  CATANIA
                </h3>
                <ul>
                  <li>
                    Istituto per la Microelettronica e Microsistemi{" "}
                    {"(CNR-IMM)"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto w-full bg-white py-12 md:py-20 flex flex-col gap-16 px-4 md:px-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <DecryptedText
            text="Partners"
            animateOn="view"
            sequential={true}
            maxIterations={20}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
            speed={50}
            revealDirection="start"
            encryptedClassName="text-3xl md:text-5xl font-medium tracking-tight text-center"
            className="text-4xl md:text-5xl !text-center max-w-3xl font-medium tracking-tight text-center"
          />
        </div>

        <div className="w-full overflow-hidden md:overflow-visible bg-muted p-6 splashMini">
          <PartnersCarousel />
        </div>
      </section>

      <section className="container mx-auto w-full bg-white py-12 md:py-20 flex flex-col gap-10 md:gap-16 px-4 md:px-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <DecryptedText
            text="News & events"
            animateOn="view"
            sequential={true}
            maxIterations={20}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
            speed={50}
            revealDirection="start"
            encryptedClassName="text-3xl md:text-5xl font-medium tracking-tight text-center"
            className="text-4xl md:text-5xl !text-center max-w-3xl font-medium tracking-tight text-center"
          />
          <Link href="/outcomes">
            <Button>
              Discover more <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {articles
            .sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((article: any) => (
              <div
                className="flex flex-col p-8 border border-gray-300 min-h-[300px] justify-between hover:bg-muted hover:cursor-pointer"
                key={article.id}
              >
                <h3 className="text-xl font-medium tracking-tight">
                  {article?.Titolo}
                </h3>
                <div>
                  <div className="flex flex-row border-t border-gray-300 w-full justify-between pt-6">
                    <span className="text-sm font-medium flex flex-row gap-2 items-center">
                      {article?.categorie_articoli?.Titolo == "News" ? (
                        <Rss className="w-4 h-4" />
                      ) : article?.categorie_articoli?.Titolo == "Proposals" ? (
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
            ))}
        </div> */}
        <div className="w-full overflow-hidden md:overflow-visible mt-8">
          <NewsCarousel articles={articles} />
        </div>
      </section>
    </main>
  );
}
