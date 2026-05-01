//Components
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import TabsContentBox from "@/components/TabsContentBox";
import DecryptedText from "@/components/DecryptedText";
import ComeInFaqAccordion from "@/components/ComeInFaqAccordion";
import { Separator } from "@/components/ui/separator";
import {
  buildFaqDataFromStrapi,
  buildGuideSectionsFromStrapi,
  fetchGuidelinesPageForComeIn,
  loadFaqPageForComeIn,
} from "@/lib/comeInStrapiContent";

import { Zap, Globe, Lightbulb } from "lucide-react";

export default async function ComeInPage() {
  let guide = buildGuideSectionsFromStrapi(null);
  let faq = buildFaqDataFromStrapi(null);
  try {
    const [gPage, fPage] = await Promise.all([
      fetchGuidelinesPageForComeIn(),
      loadFaqPageForComeIn(),
    ]);
    guide = buildGuideSectionsFromStrapi(gPage);
    faq = buildFaqDataFromStrapi(fPage);
  } catch {
    // Strapi unavailable: fallbacks from build*FromStrapi(null) already applied
  }

  return (
    <>
      <PageHeader
        title={"Come In"}
        description={"Come In"}
        image={"/images/pictures/ientrance-content-27.jpg"}
      />
      <main className="container w-full mx-auto border-x border-gray-200 ">
        <section
          className=" w-full flex flex-col gap-12 p-4 pt-12 md:p-22 items-center pb-36"
          id="main"
        >
          <div className="w-full max-w-3xl text-center">
            <div className="flex flex-col gap-8">
              <DecryptedText
                text="What’s your idea"
                animateOn="view"
                sequential={true}
                maxIterations={20}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
                speed={50}
                revealDirection="start"
                encryptedClassName="text-3xl md:text-5xl font-medium tracking-tight"
                className="text-3xl md:text-5xl !text-center max-w-3xl font-medium tracking-tight"
              />
              <p className="mb-4 text-lg md:text-xl tracking-tight">
                In the dynamic landscape of advanced materials research,
                iENTRANCE stands to catalyze innovation. Groundbreaking
                discoveries stem from the synergistic interplay of cutting-edge
                instrumentation and specialized expertise.
              </p>
            </div>
          </div>
          {/* <div className="flex flex-row gap-32">
            <div className="w-full md:w-1/2">
              <div className="">
                {doubleText.TestoInEvidenza.map((text, index) => (
                  <p
                    key={index}
                    className="mb-4 text-3xl font-medium tracking-tight"
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2">
              {doubleText.Contenuto.map((text, index) => (
                <p key={index} className="text-lg mb-2">
                  {text}
                </p>
              ))}
            </div>
          </div> */}
          <div className="w-full flex flex-col gap-2 md:gap-16">
            <p className="mb-4 text-xl md:text-3xl text-left font-medium tracking-tight">
              Our mission is to provide researchers, both from academia and
              industry, with unparalleled access to these essential resources,
              facilitating the realization of their ambitious projects.
            </p>
            <div className="flex flex-col md:flex-row gap-12 md:gap-32">
              <div className="w-full md:w-1/2  flex flex-col gap-2">
                <p className="text-base md:text-lg">
                  We invite you, the researchers who are pushing the boundaries
                  of scientific knowledge, to engage with iENTRANCE. Present
                  your access proposals and let us work together to design and
                  execute investigations of the highest ambition.
                </p>
                <p className="text-base md:text-lg">
                  Our infrastructure is your platform to transform innovative
                  concepts into impactful realities.
                </p>
                <p className="text-base md:text-lg">
                  iENTRANCE is not just a collection of tools; it is a
                  collaborative ecosystem. Our integrated network of 14 nodes,
                  each a hub of specialized knowledge in physics, chemistry, and
                  engineering, offers a comprehensive suite of capabilities.{" "}
                </p>
                <p className="text-base md:text-lg">
                  This mosaic approach ensures that your research benefits from
                  a holistic, multidisciplinary perspective, enabling
                  investigations that transcend the limitations of isolated
                  efforts.
                </p>
              </div>
              <div className="w-full md:w-1/2 flex flex-row gap-2">
                <Image
                  src="/images/pictures/ientrance-content-22.jpg"
                  alt="iENTRANCE"
                  width={1000}
                  height={1000}
                  className="h-full object-cover splashMini w-1/2 "
                />
                <Image
                  src="/images/pictures/ientrance-content-6.jpg"
                  alt="iENTRANCE"
                  width={1000}
                  height={1000}
                  className="h-full object-cover splashMini w-1/2 mt-20"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto flex flex-col gap-8 p-4 py-12 md:p-22 border-t justify-center items-center">
          <h2 className="text-3xl font-medium tracking-tight">
            iENTRANCE empowers researchers to
          </h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="bg-gray-200 p-[1px] splashMiniXS h-full pb-4">
              <div className="bg-white p-8 splashMiniXS flex flex-col gap-4 h-full items-center">
                <Zap className="w-8 h-8" />
                <h3 className="text-lg font-semibold mb-2 text-center tracking-tight">
                  Accelerate the pace of discovery
                </h3>
                <Separator />
                <p className="text-center">
                  Our advanced instrumentation enables precise and efficient
                  experimentation, allowing you to obtain crucial data rapidly.
                </p>
              </div>
            </div>
            <div className="bg-gray-200 p-[1px] splashMiniXS h-full pb-4">
              <div className="bg-white p-8 splashMiniXS flex flex-col gap-4 h-full items-center">
                <Globe className="w-8 h-8" />
                <h3 className="text-lg font-semibold mb-2 text-center tracking-tight">
                  Expand the scope of your research
                </h3>
                <Separator />
                <p className="text-center">
                  The integrated nature of iENTRANCE facilitates collaborative
                  projects that span multiple disciplines, unlocking new avenues
                  of exploration.
                </p>
              </div>
            </div>
            <div className="bg-gray-200 p-[1px] splashMiniXS h-full pb-4">
              <div className="bg-white p-8 splashMiniXS flex flex-col gap-4 h-full items-center">
                <Lightbulb className="w-8 h-8" />
                <h3 className="text-lg font-semibold mb-2 text-center tracking-tight">
                  Translate research into real-world applications
                </h3>
                <Separator />
                <p className="text-center">
                  We bridge the gap between fundamental research and practical
                  implementation, fostering technology transfer and supporting
                  innovation-driven enterprises.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className=" w-full flex flex-col bg-white relative" id="guide">
          <div className="bg-gray-200 splash py-[1px]">
            <div className="flex flex-col gap-8 p-4 py-12 md:p-22 bg-muted splash border-none justify-center items-center">
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight ">
                Guide
              </h2>
              <div className="max-w-4xl">
                <h3 className="text-xl md:text-3xl font-medium tracking-tight mb-4 text-center">
                  {guide.introTitle}
                </h3>
                {guide.introBody ? (
                  <p className="text-base md:text-lg text-center">
                    {guide.introBody}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row gap-32 p-4 md:p-22 justify-center mx-auto items-center">
            <TabsContentBox contentSections={guide.tabSections} />
          </div>
        </section>

        <section>
          <div className="bg-gray-200 splash py-[1px]">
            <div className="flex flex-col gap-8 p-4 py-12 md:p-22 bg-muted splash border-none justify-center items-center">
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight ">
                FAQ
              </h2>
              <div className="max-w-4xl">
                <h3 className="text-xl md:text-3xl font-medium tracking-tight mb-4 text-center">
                  {faq.subtitle}
                </h3>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-8 p-4 md:p-22 max-w-5xl mx-auto">
            <ComeInFaqAccordion items={faq.items} />
          </div>
        </section>
      </main>
    </>
  );
}
