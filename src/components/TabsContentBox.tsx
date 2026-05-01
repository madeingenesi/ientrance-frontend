"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ChevronsRight } from "lucide-react";
import type { GuideTabSection } from "@/lib/comeInStrapiContent";

type TabsContentBoxProps = {
  contentSections: GuideTabSection[];
};

export default function TabsContentBox({ contentSections }: TabsContentBoxProps) {
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  // Initialize refs
  useEffect(() => {
    linksRef.current = linksRef.current.slice(0, contentSections.length);
    sectionsRef.current = sectionsRef.current.slice(0, contentSections.length);
  }, [contentSections.length]);

  useEffect(() => {
    // Register ScrollTrigger
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (contentSections.length === 0) return;

    // Make sure all refs are available
    if (linksRef.current.length === 0 || sectionsRef.current.length === 0)
      return;

    // Set initial state
    const ctx = gsap.context(() => {
      linksRef.current.forEach((link) => {
        if (link) {
          gsap.set(link, {
            opacity: 0.3,
          });
        }
      });

      // Create ScrollTriggers
      sectionsRef.current.forEach((section, index) => {
        if (section && linksRef.current[index]) {
          ScrollTrigger.create({
            trigger: section,
            start: "top 25%",
            end: "bottom 5%",
            markers: false,
            onEnter: () => {
              gsap.to(linksRef.current[index], {
                opacity: 1,
                duration: 0.3,
              });
            },
            onLeave: () => {
              gsap.to(linksRef.current[index], {
                opacity: 0.3,
                duration: 0.3,
              });
            },
            onEnterBack: () => {
              gsap.to(linksRef.current[index], {
                opacity: 1,
                duration: 0.3,
              });
            },
            onLeaveBack: () => {
              gsap.to(linksRef.current[index], {
                opacity: 0.3,
                duration: 0.3,
              });
            },
          });
        }
      });
    });

    // Cleanup
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [contentSections.length]);

  if (contentSections.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-12 text-base md:text-lg max-w-2xl mx-auto">
        Guide content could not be loaded. Please see the full{" "}
        <a
          className="text-[var(--blue-primary)] underline"
          href="/guidelines"
        >
          Guidelines
        </a>{" "}
        page.
      </p>
    );
  }

  return (
    <div className="flex flex-col md:flex-row relative py-12 md:py-0 gap-16">
      <div className="w-full md:w-4/12 flex flex-col relative ">
        <div className="flex flex-col gap-4 sticky top-[150px] w-full h-fit">
          {contentSections.map((section, index) => (
            <a
              key={section.id}
              ref={(el) => {
                if (el) {
                  linksRef.current[index] = el;
                }
              }}
              href={`#${section.id}`}
              className="flex flex-row gap-4 pb-4 border-b border-black items-center justify-between"
            >
              <div className="flex flex-row gap-4">
                <span className="font-medium">{section.number}</span>
                <span className="font-medium">{section.title}</span>
              </div>
              <ChevronsRight className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      <div className="w-full md:w-8/12 flex flex-col gap-16 pl-4 md:pl-12 relative">
        <div className="flex flex-col gap-4 before:content-[''] before:absolute before:left-0 before:top-0 before:w-[1px] before:h-full before:bg-black before:opacity-10 before:z-0 before:translate-y-[15px] gap-32">
          {contentSections.map((section, index) => (
            <div
              key={section.id}
              ref={(el) => {
                if (el) {
                  sectionsRef.current[index] = el;
                }
              }}
              className="flex flex-col pb-4 relative"
              id={section.id}
            >
              <span className="text-2xl font-medium tracking-tighter before:content-[''] before:absolute before:left-0 before:top-0 before:w-[30px] before:h-[1px] before:bg-gray-200 before:z-0 before:translate-y-[15px] before:-translate-x-[48px]">
                <div className="bg-muted p-2 py-4 splashMiniXS translate-x-[-24px] pl-5 mb-8">
                  {section.number}. {section.title}
                </div>
              </span>
              {Array.isArray(section.content) ? (
                <div className="flex flex-col gap-4">
                  {section.content.map((item, i) => {
                    switch (item.type) {
                      case "paragraph":
                        return (
                          <p
                            key={i}
                            className="text-base leading-relaxed last:mb-0"
                          >
                            {item.text ?? ""}
                          </p>
                        );
                      case "subtitle":
                        return (
                          <h3
                            key={i}
                            className="text-xl font-medium pt-1 tracking-tight"
                          >
                            {item.text ?? ""}
                          </h3>
                        );
                      case "list":
                        return (
                          <ul
                            key={i}
                            className="list-disc pl-6 space-y-2.5"
                          >
                            {item.items?.map(
                              (listItem: string, index: number) => (
                                <li key={index} className="leading-relaxed">
                                  {listItem}
                                </li>
                              )
                            )}
                          </ul>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              ) : (
                <p className="leading-relaxed">{section.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
