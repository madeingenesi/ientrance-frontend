"use client";

import { useEffect, useRef, createRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Separator } from "@/components/ui/separator";

import { ChevronsRight } from "lucide-react";

const contentSections = [
  {
    id: "open-call-announcement",
    number: "1",
    title: "Open Call Announcement",
    content:
      "iENTRANCE will publish open calls through its official website and other relevant communication channels. Each call will clearly outline the scope, key focus areas, and application deadlines. Comprehensive information, including access policies and specific guidelines, will be made available on the dedicated application portal to ensure transparency and support for potential applicants.",
  },
  {
    id: "access-proposal-submission",
    number: "2",
    title: "Access Proposal Submission",
    content: [
      {
        type: "paragraph",
        text: "Applicants are required to submit their proposals via the online application portal available on the iENTRANCE website.",
      },
      {
        type: "paragraph",
        text: "The submission form will request detailed information such as the project title and abstract, research objectives and methodology, a clear justification for requesting infrastructure access, expected outcomes and their potential impact, required resources and facilities, as well as the applicant's qualifications and relevant experience.",
      },
      {
        type: "paragraph",
        text: "It is strongly recommended that applicants consult the provided application guidelines to ensure their submission meets all necessary criteria.",
      },
    ],
  },
  {
    id: "evaluation-process",
    number: "3",
    title: "Evaluation Process",
    content: [
      {
        type: "paragraph",
        text: "Applications will undergo a rigorous evaluation process conducted by three distinct committees",
      },
      {
        type: "subtitle",
        text: "Scientific Committee",
      },
      {
        type: "paragraph",
        text: "Composed of external experts, this committee will evaluate the scientific merit, novelty, and potential impact of the proposed research.",
      },
      {
        type: "paragraph",
        text: "Emphasis will be placed on the alignment with iENTRANCE's strategic objectives and the advancement of knowledge in relevant fields as well as on the overall scientific excellence",
      },
      {
        type: "subtitle",
        text: "Technical Feasibility Committee",
      },
      {
        type: "paragraph",
        text: "Comprising iENTRANCE partnership members, this committee will assess the technical feasibility of the projects.",
      },
      {
        type: "paragraph",
        text: "Evaluations will include assessments on weather or not the projects can be realised using the infrastructure, and which specific nodes of the infrastructure are best equipped to carry out the necessary work.",
      },
      {
        type: "paragraph",
        text: "This committee will be responsible for assigning projects to the proper iENTRANCE infrastructure nodes.",
      },
      {
        type: "subtitle",
        text: "Technical Management Committee",
      },
      {
        type: "paragraph",
        text: "Made up of iENTRANCE partnership members. This committee will be responsible for overseeing the technical side of approved projects execution.",
      },
    ],
  },
  {
    id: "access-allocation-and-project-execution",
    number: "4",
    title: "Access Allocation and Project Execution",
    content: [
      {
        type: "paragraph",
        text: "Successful applicants will be granted access to the iENTRANCE infrastructure based on the evaluation outcome and resource availability.",
      },
      {
        type: "paragraph",
        text: "The Technical Management Committee will provide ongoing support throughout the project execution phase.",
      },
      {
        type: "paragraph",
        text: "The results of the experiments must be reported, as specified in the application forms.",
      },
    ],
  },
  {
    id: "post-project-requirements",
    number: "5",
    title: "Post-Project Requirements",
    content: [
      {
        type: "paragraph",
        text: "Users are requested to report the results of their experiments to the scientific committee.",
      },
      {
        type: "paragraph",
        text: "Users must cite the iENTRANCE infrastructure when publishing their results.",
      },
    ],
  },
  {
    id: "key-considerations",
    number: "6",
    title: "Key Considerations",
    content: [
      {
        type: "paragraph",
        text: "Applicants should clearly articulate the scientific and/or technological merit of their projects.",
      },
      {
        type: "paragraph",
        text: "Proposals must demonstrate the necessity of utilizing the iENTRANCE infrastructure.",
      },
      {
        type: "paragraph",
        text: "Applications should adhere to the guidelines provided in the open call announcement.",
      },
    ],
  },
];

export default function TabsContentBox() {
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  // Initialize refs
  useEffect(() => {
    linksRef.current = linksRef.current.slice(0, contentSections.length);
    sectionsRef.current = sectionsRef.current.slice(0, contentSections.length);
  }, []);

  useEffect(() => {
    // Register ScrollTrigger
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

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
            start: "top 10%",
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
  }, []);

  return (
    <div className="flex flex-row relative gap-16">
      <div className="w-4/12 flex flex-col relative">
        <div className="flex flex-col gap-4 sticky top-[20px] w-full h-fit">
          {contentSections.map((section, index) => (
            <a
              key={section.id}
              ref={(el) => (linksRef.current[index] = el)}
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

      <div className="w-8/12 flex flex-col gap-16 pl-12 relative">
        <div className="flex flex-col gap-4 before:content-[''] before:absolute before:left-0 before:top-0 before:w-[1px] before:h-full before:bg-black before:opacity-10 before:z-0 before:translate-y-[15px] gap-32">
          {contentSections.map((section, index) => (
            <div
              key={section.id}
              ref={(el) => (sectionsRef.current[index] = el)}
              className="flex flex-col pb-4 relative"
              id={section.id}
            >
              <span className="text-2xl font-medium tracking-tighter before:content-[''] before:absolute before:left-0 before:top-0 before:w-[30px] before:h-[1px] before:bg-gray-200 before:z-0 before:translate-y-[15px] before:-translate-x-[48px]">
                <div className="bg-gray-200 p-2 py-4 splashMiniXS translate-x-[-24px] pl-5 mb-8">
                  {section.number}. {section.title}
                </div>
              </span>
              {Array.isArray(section.content) ? (
                section.content.map(
                  (
                    item: { type: string; text: string; items?: string[] },
                    i: number
                  ) => {
                    switch (item.type) {
                      case "paragraph":
                        return (
                          <p key={i} className="flex flex-col gap-0">
                            {item.text}
                          </p>
                        );
                      case "subtitle":
                        return (
                          <h3
                            key={i}
                            className="text-xl font-medium mt-4 mb-4 tracking-tight"
                          >
                            {item.text}
                          </h3>
                        );
                      case "list":
                        return (
                          <ul key={i} className="list-disc pl-6 space-y-2">
                            {item.items?.map(
                              (listItem: string, index: number) => (
                                <li key={index} className="">
                                  {listItem}
                                </li>
                              )
                            )}
                          </ul>
                        );
                      default:
                        return null;
                    }
                  }
                )
              ) : (
                <p className="">{section.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
