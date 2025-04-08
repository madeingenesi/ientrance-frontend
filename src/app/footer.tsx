"use client";

import { ArrowRight } from "lucide-react";

export default function Footer() {
  const theMosaic = [
    {
      title: "The Big Picture",
      href: "/the-mosaic/the-big-picture",
    },
    {
      title: "Values",
      href: "/the-mosaic/values",
    },
    {
      title: "Challenges / Topics",
      href: "/the-mosaic/challenges-topics",
    },
    {
      title: "Expertise",
      href: "/the-mosaic/expertise",
    },
    {
      title: "Data",
      href: "/the-mosaic/data",
    },
  ];

  const comeIn = [
    {
      title: "Guide",
      href: "/come-in/guide",
    },
    {
      title: "FAQ",
      href: "/come-in/faq",
    },
  ];

  const learnGrow = [
    {
      title: "The Big Picture",
      href: "/learn-grow/the-big-picture",
    },
  ];

  const outcomes = [
    {
      title: "The Big Picture",
      href: "/outcomes/the-big-picture",
    },
    {
      title: "Values",
      href: "/outcomes/values",
    },
  ];

  return (
    <footer className="bg-[var(--blue-primary)] text-white splashMaxiTopRight min-h-[700px] pt-16">
      <section className="container w-full grid grid-cols-1 md:grid-cols-4 mx-auto p-8 gap-8">
        <div className="">
          <h5 className="text-2xl font-semibold tracking-tight mb-6 flex items-center gap-8">
            The Mosaic <ArrowRight className="w-5 h-5" />
          </h5>
          <ul className="flex flex-col gap-2">
            {theMosaic.map((item) => (
              <li
                key={item.title}
                className="hover:text-gray-300 hover:underline"
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="text-2xl font-semibold tracking-tight mb-6 flex items-center gap-8">
            Come In <ArrowRight className="w-5 h-5" />
          </h5>
          <ul className="flex flex-col gap-2">
            {comeIn.map((item) => (
              <li
                key={item.title}
                className="hover:text-gray-300 hover:underline"
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="text-2xl font-semibold tracking-tight mb-6 flex items-center gap-8">
            Learn & Grow <ArrowRight className="w-5 h-5" />
          </h5>
          <ul className="flex flex-col gap-2">
            {outcomes.map((item) => (
              <li
                key={item.title}
                className="hover:text-gray-300 hover:underline"
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="text-2xl font-semibold tracking-tight mb-6 flex items-center gap-8">
            Outcomes <ArrowRight className="w-5 h-5" />
          </h5>
          <ul className="flex flex-col gap-2">
            {outcomes.map((item) => (
              <li
                key={item.title}
                className="hover:text-gray-300 hover:underline"
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </footer>
  );
}
