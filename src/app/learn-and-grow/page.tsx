import { Calendar1, Ticket } from "lucide-react";
import Link from "next/link";

import PageHeader from "@/components/PageHeader";
import DecryptedText from "@/components/DecryptedText";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function LearnAndGrow() {
  return (
    <>
      <PageHeader
        title={"Learn & Grow"}
        description={"Learn & Grow"}
        image={"/images/esempio.jpg"}
      />
      <main className="container w-full mx-auto border-x border-gray-200">
        <section
          className=" w-full flex flex-col md:flex-row gap-32 p-22 justify-center items-center"
          id="main"
        >
          <div className="w-full max-w-3xl text-center">
            <div className="flex flex-col gap-8">
              <DecryptedText
                text="Clean Energy Transition"
                animateOn="view"
                sequential={true}
                maxIterations={20}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
                speed={50}
                revealDirection="start"
                encryptedClassName="text-5xl  font-medium tracking-tight"
                className="text-5xl !text-center max-w-3xl font-medium tracking-tight"
              />
              <p className="mb-4 text-xl tracking-tight">
                iENTRANCE operates as an integrated advanced materials research
                infrastructure, structured upon 14 interconnected nodes. This
                configuration facilitates the convergence of physics, chemistry,
                and engineering expertise.
              </p>
            </div>
          </div>
        </section>

        <section
          className=" w-full flex flex-col bg-white relative pb-28"
          id="values"
        >
          <div className="bg-gray-200 splash py-[1px]">
            <div
              className="flex flex-row gap-8 p-8 splash border-none justify-between items-end"
              style={{
                backgroundImage: "url('/images/summer_school.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="flex flex-col bg-sidebar splash p-12 w-4/12 min-h-[65vh] justify-between">
                <DecryptedText
                  text="Summer School"
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
                      The Summer School{" "}
                      <strong>
                        "iENTRANCE to research. The young scientist's guide to
                        the galaxy. Rethinking research in an AI-empowered
                        world."
                      </strong>
                      {""}
                      Is designed for young scientists entering the world of
                      Research and offers a unique training opportunity thet
                      combines academic excellence with an immersive hands-on
                      experience, set in stunning natural setting.
                    </p>
                    <Accordion type="single" collapsible className="mt-auto">
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="border-y rounded-none">
                          <p className="p-0 !mb-0 uppercase">Discover more</p>
                        </AccordionTrigger>
                        <AccordionContent className="pt-6">
                          <p>
                            The program will feature five high-level
                            masterclasses, led by experts in Research Ethics,
                            Public Speaking, Research Funding, Artificial
                            Intelligence and Technology Transfer.
                          </p>
                          <p>
                            The classes will provide participants with a
                            multidisciplinary foundation, integrating technical
                            skills, ethical principles and professional
                            abilities to master the craft of research in a
                            rapidly evolving landscape powered by Artificial
                            Intelligence.
                          </p>
                          <p>
                            This experience will combine training, networking
                            and inspiration in an atmosphere that encourages
                            reflection and creativity. We look forward to
                            welcoming you in Ventotene to embark on a journey
                            that looks to the future of science while remaining
                            grounded in its foundational roots.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>
              <div className="w-3/12">
                <div className="bg-muted splashMiniXS relative">
                  <div className="bg-[var(--blue-primary)] text-white p-4 absolute top-0 right-0 splashMiniXS font-semibold text-2xl tracking-tight flex items-center gap-2">
                    <Calendar1 strokeWidth={1.5} className="w-6 h-6 " />
                    3-6 June
                  </div>
                  <div className="flex flex-col p-8">
                    <Ticket className="w-12 h-12 " />
                    <p className="text-lg font-semibold tracking-tight pt-12">
                      iENTRANCE to research. The young scientist's guide to the
                      galaxy. Rethinking research in an AI-empowered world
                    </p>
                    <span className="text-sm tracking-tight pt-4">
                      Ventotene (Italy) <br />@ Sala Polivalente Umberto
                      Terracini
                    </span>
                  </div>
                  <Link
                    href="https://forms.office.com/Pages/DesignPageV2.aspx?subpage=design&token=f103f38f3f9f43b3974bc7e978bd77d2&id=n07GNH_S3U6h8BOX8MhPlJxQWquJAV5Fv8BvuGqTs09URjAzRVpYMUlJUTk4UUNURFhFRUNHUTlJUC4u"
                    target="_blank"
                    className="w-full hover:pointer"
                  >
                    <Button className="w-full splashMiniXS border-none bg-[var(--blue-primary)] !rounded-none py-6 text-lg tracking-tight text-white ">
                      Register now <ArrowRight className="!w-5 !h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
