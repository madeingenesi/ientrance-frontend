"use client";

//Components
import PageHeader from "@/components/PageHeader";
import HeroSection from "@/components/HeroSection";
import ExpertiseCarousel from "@/components/ExpertiseCarousel";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import DecryptedText from "@/components/DecryptedText";
import {
  Computer,
  ArrowRight,
  Eye,
  RotateCw,
  BookCheck,
  Combine,
  DatabaseZap,
  CircuitBoard,
} from "lucide-react";

export default function TheMosaicPage() {
  const doubleText = {
    TestoInEvidenza: [
      "iENTRANCE operates as an integrated advanced materials research infrastructure, structured upon 14 interconnected nodes.",
      "This configuration facilitates the convergence of physics, chemistry, and engineering expertise.",
    ],
    Contenuto: [
      'The "mosaic" represents iENTRANCE architecture: individual nodes, like tiles, own distinct operational domains and specialized instrumentation, but provide together an additional dimension of information.',
      "The integration of these nodes into a single access point overcome research fragmentation, enabling comprehensive project execution across multiple disciplines. This unified approach provides a full understanding of materials science, exceeding the capabilities of isolated research units.",
      "We extend the mosaic beyond iENTRANCE, actively driving technology transfer, social impact, and territorial integration by leveraging and integrating regional resources and expertise.",
      "The system facilitates collaborative research with industrial partners and SMEs, accelerating the translation of scientific findings into practical applications.",
      "The system's operational focus includes: infrastructure access, technology scouting, collaborative research facilitation, deployment project development, roadmap creation, innovation support, policy informing, knowledge exchange, and educational outreach.",
      "iENTRANCE aims to accelerate materials development for energy solutions and sustainable practices through the coordinated utilization of its integrated resources. The mosaic model emphasizes the system's capacity to deliver comprehensive, multidisciplinary solutions.",
    ],
  };

  const accordionItems = [
    {
      title: "Integration and Collaboration",
      content:
        "iENTRANCE is built upon the integration of diverse research nodes. This reflects a core value of collaborative synergy, where the combined expertise and resources exceed the sum of individual parts. This collaborative spirit extends to interactions with industry, SMEs, and policymakers, fostering a network of knowledge exchange and innovation.",
    },
    {
      title: "Excellence in Research",
      content:
        "The infrastructure is committed to maintaining a high standard of scientific inquiry, utilizing state-of-the-art instrumentation and fostering expertise in advanced materials research.",
    },
    {
      title: "Technological Advancement and Innovation",
      content:
        "A core value is to drive technological advancement, particularly in areas relevant to the energy transition and a sustainable, circular economy. This includes supporting innovation and entrepreneurship.",
    },
    {
      title: "Knowledge Exchange and Accessibility",
      content:
        "iENTRANCE prioritizes the dissemination of knowledge and the accessibility of its resources to a broad user base, including researchers, industry, and SMEs.",
    },
    {
      title: "Sustainability and Societal Impact",
      content:
        "A significant value is placed on contributing to a sustainable future by developing materials and technologies that address critical challenges in energy and environmental sustainability.",
    },
    {
      title: "FAIR Data Principles",
      content:
        "iENTRANCE places a high value on adherence to FAIR data principles (Findable, Accessible, Interoperable, Reusable). This commitment is evident in its efforts to create an online catalogue of methodologies, technologies, and facilities, with a focus on interoperability and open access. This is shown in the information that all resources within the online catalogue will be integrated and made fully interoperable in terms of access procedures, protocols, and training, in accordance with the Open Access and FAIR.",
    },
    {
      title: "National and European Contribution",
      content:
        "iENTRANCE aims to bolster Italy's competitiveness and contribute to European research goals, particularly those outlined in the European Green Deal and Horizon Europe framework.",
    },
  ];

  const data = [
    {
      title: "Enhanced Visibility",
      description:
        "FAIR data is designed to be easily discoverable through standardized metadata and persistent identifiers. This increases the visibility of researchers' work, maximizing its impact and reach within the scientific community.",
      icon: <Eye className="w-8 h-8" />,
    },
    {
      title: "Increased Reusability",
      description:
        "FAIR principles promote data interoperability and clear documentation, enabling researchers to reuse existing datasets for new analyses and discoveries. This fosters collaboration, accelerates research progress, and reduces redundancy.",
      icon: <RotateCw className="w-8 h-8" />,
    },
    {
      title: "Compliance with Funding Requirements",
      description:
        "Many funding bodies and research institutions now mandate FAIR data compliance. iENTRANCE's adherence to these principles ensures that researchers using our infrastructure meet these requirements, enhancing their eligibility for grants and funding opportunities.",
      icon: <BookCheck className="w-8 h-8" />,
    },
    {
      title: "Improved Collaboration",
      description:
        "Through the application of the FAIR principles, that enforce standardised metadata and clear data sharing protocols, researchers will find it easier to collaborate with others, both inside and outside of the iENTRANCE organisation.",
      icon: <Combine className="w-8 h-8" />,
    },
    {
      title: "Long-term Data Preservation",
      description:
        "By following FAIR data principles, data is more likely to be preserved in the long term, making research more reproducible.",
      icon: <DatabaseZap className="w-8 h-8" />,
    },
    {
      title: "Facilitating Innovation",
      description:
        "When data is interoperable and accessible, it is much easier to apply new data science techniques to it, such as those using AI. This greatly aids the process of innovation.",
      icon: <CircuitBoard className="w-8 h-8" />,
    },
  ];

  return (
    <>
      <PageHeader
        title={"The Mosaic"}
        description={"Come In"}
        image={"/images/esempio.jpg"}
      />
      <main className="container w-full mx-auto border-x border-gray-200">
        <section className=" w-full flex flex-col md:flex-row gap-32 p-22 justify-center items-center">
          <div className="w-full max-w-3xl text-center">
            <div className="flex flex-col gap-8">
              <DecryptedText
                text="The Big Picture"
                animateOn="view"
                sequential={true}
                maxIterations={20}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
                speed={50}
                revealDirection="start"
                encryptedClassName="text-5xl  font-medium tracking-tight"
                className="text-5xl !text-center max-w-3xl font-medium tracking-tight"
              />
              <p className="mb-4 text-xl  tracking-tight">
                iENTRANCE operates as an integrated advanced materials research
                infrastructure, structured upon 14 interconnected nodes. This
                configuration facilitates the convergence of physics, chemistry,
                and engineering expertise.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full flex flex-col px-10 pb-22">
          <div className="grid grid-cols-12 grid-rows-12 gap-1 h-sc[80vh]">
            <div className="col-span-4 row-span-3 bg-gray-200  splashMiniXS p-[1px] pb-2">
              <div className="bg-white splashMiniXS w-full h-full p-8">
                <h4 className="text-lg font-semibold mb-2 tracking-tight">
                  Mosaic Architecture
                </h4>
                <p className="text-sm ">
                  The "mosaic" represents iENTRANCE architecture: individual
                  nodes, like tiles, own distinct operational domains and
                  specialized instrumentation, but provide together an
                  additional dimension of information.
                </p>
              </div>
            </div>
            <div className="col-span-3 row-span-2 col-start-1 row-start-4 bg-gray-200 p-[1px] splashMiniXS pb-2">
              <div className="bg-white splashMiniXS w-full h-full p-8 flex flex-col justify-between">
                <Computer className="w-10 h-10" />
                <div className="flex flex-col items-start justify-start">
                  <span className="text-4xl font-semibold">+350</span>
                  <span className="text-lg font-semibold text-wrap">
                    iENTRANCE Nodes
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-4 row-span-3 col-start-4 row-start-4 bg-gray-200 p-[1px] pb-2 splashMiniXS">
              <div className="bg-white splashMiniXS w-full h-full p-8">3</div>
            </div>
            <div
              className="col-span-5 row-span-3 col-start-5 row-start-1 bg-gray-200 p-8 splashMiniXS"
              style={{
                backgroundImage: "url('/images/esempio.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              4
            </div>
            <div className="col-span-3 row-span-2 col-start-10 row-start-1 bg-gray-200 p-[1px] splashMiniXS">
              <div className="bg-white splashMiniXS w-full h-full p-8">5</div>
            </div>
            <div className="col-span-3 row-span-4 col-start-10 row-start-3 bg-gray-200 splashMiniXS p-[1px] pb-2">
              <div className="bg-white splashMiniXS w-full h-full p-8">
                <h4 className="text-lg font-semibold mb-2 tracking-tight">
                  Integration and Collaboration
                </h4>
                <p className="text-sm">
                  The integration of these nodes into a single access point
                  overcome research fragmentation, enabling comprehensive
                  project execution across multiple disciplines. This unified
                  approach provides a full understanding of materials science,
                  exceeding the capabilities of isolated research units.
                </p>
              </div>
            </div>
            <div className="col-span-2 row-span-3 col-start-8 row-start-4 bg-gray-200 p-[1px] splashMiniXS pb-2">
              <div className="bg-white splashMiniXS w-full h-full p-8 flex flex-col justify-between">
                <Computer className="w-10 h-10" />
                <div className="flex flex-col items-start justify-start">
                  <span className="text-4xl font-semibold">+350</span>
                  <span className="text-lg font-semibold text-wrap">
                    iENTRANCE Nodes
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-3 row-span-4 row-start-6 bg-gray-200 p-[1px] pb-2 splashMiniXS">
              <div className="bg-white splashMiniXS w-full h-full p-8">
                <h4 className="text-lg font-semibold mb-2 tracking-tight">
                  Technology Transfer
                </h4>
                <p className="text-sm">
                  We extend the mosaic beyond iENTRANCE, actively driving
                  technology transfer, social impact, and territorial
                  integration by leveraging and integrating regional resources
                  and expertise.
                </p>
              </div>
            </div>
            <div className="col-span-5 row-span-2 col-start-4 row-start-7 bg-gray-200 p-[1px] pb-2 splashMiniXS">
              <div className="bg-white splashMiniXS w-full h-full p-8">
                <h4 className="text-lg font-semibold mb-2 tracking-tight">
                  Collaborative Research
                </h4>
                <p className="text-sm">
                  The system facilitates collaborative research with industrial
                  partners and SMEs, accelerating the translation of scientific
                  findings into practical applications.
                </p>
              </div>
            </div>
            <div className="col-span-5 row-span-4 col-start-4 row-start-9 bg-gray-200 p-8 splashMiniXS"></div>
            <div className="col-span-4 row-span-3 col-start-9 row-start-7 bg-gray-200 p-8 splashMiniXS"></div>
            <div className="col-span-4 row-span-3 col-start-9 row-start-10 bg-gray-200 p-[1px] pb-2 splashMiniXS">
              <div className="bg-white splashMiniXS w-full h-full p-8">
                <h4 className="text-lg font-semibold mb-2 tracking-tight">
                  Operational Focus
                </h4>
                <p className="text-sm">
                  The system's operational focus includes: infrastructure
                  access, technology scouting, collaborative research
                  facilitation, deployment project development, roadmap
                  creation, innovation support, policy informing, knowledge
                  exchange, and educational outreach.
                </p>
              </div>
            </div>
            <div className="col-span-3 row-span-3 col-start-1 row-start-10 bg-gray-200 p-[1px] pb-2 splashMiniXS ">
              <div className="bg-white splashMiniXS w-full h-full p-8">
                <h4 className="text-lg font-semibold mb-2 tracking-tight">
                  Accelerating Innovation
                </h4>
                <p className="text-sm">
                  iENTRANCE aims to accelerate materials development for energy
                  solutions and sustainable practices through the coordinated
                  utilization of its integrated resources. The mosaic model
                  emphasizes the system's capacity to deliver comprehensive,
                  multidisciplinary solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className=" w-full flex flex-col bg-white relative"
          id="values"
        >
          <div className="bg-gray-200 splash py-[1px]">
            <div className="flex flex-col gap-8 p-22 bg-muted splash border-none justify-center items-center">
              <DecryptedText
                text="Values"
                animateOn="view"
                sequential={true}
                maxIterations={20}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
                speed={50}
                revealDirection="start"
                encryptedClassName="text-5xl  font-medium tracking-tight"
                className="text-5xl !text-center max-w-3xl font-medium tracking-tight"
              />
              <p className="text-2xl max-w-3xl tracking-tight text-center">
                iENTRANCE is founded on the values of collaborative excellence,
                technological innovation, and a commitment to addressing
                pressing societal challenges through advanced materials
                research.
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-col gap-32 p-22 justify-center max-w-5xl mx-auto">
            <div className="w-full ">
              <Accordion type="single" collapsible className="w-full">
                {accordionItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-xl font-semibold tracking-tight">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-lg">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className=" w-full flex flex-col gap-0  z-20 relative">
          <div className="bg-gray-200 splash py-[1px]">
            <div className="flex flex-col gap-8 p-22 bg-muted splash border-none justify-center items-center">
              <DecryptedText
                text="Challenges / Topics"
                animateOn="view"
                sequential={true}
                maxIterations={20}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
                speed={50}
                revealDirection="start"
                encryptedClassName="text-5xl  font-medium tracking-tight"
                className="text-5xl !text-center max-w-3xl font-medium tracking-tight"
              />
              <p className="text-2xl max-w-3xl tracking-tight text-center">
                iENTRANCE is committed to addressing complex challenges across
                both technological and methodological frontiers. We aim to be a
                catalyst for innovation and sustainable development through
                targeted initiatives.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-0 bg-white p-22 gap-22">
            <h3 className="text-3xl font-semibold mb-4 w-fit !m-0 tracking-tight">
              Technological Domains
            </h3>
            {/* IMG - Text Right */}
            <div className="flex flex-row gap-0 gap-32">
              <div className="grid grid-cols-2 grid-rows-2 gap-0 w-1/2 min-h-[500px] gap-1">
                <div className="col-span-1 row-span-1 bg-gray-200 splashMini">
                  1
                </div>
                <div className="col-span-1 row-span-1 bg-gray-200 splashMini">
                  2
                </div>
                <div className="col-span-2 row-span-1 bg-gray-200 splashMini">
                  3
                </div>
              </div>
              <div className="w-1/2 flex flex-col justify-center">
                <h4 className="text-2xl font-semibold mb-4 tracking-tight">
                  Development of a Green, Sustainable, and Circular Economy &
                  Industry 
                </h4>
                <ul className=" flex flex-col gap-2">
                  <li className="flex flex-row gap-2">
                    <ArrowRight className="w-5 h-5 min-w-5 mt-1" />
                    Facilitating the transition towards eco-friendly industrial
                    practices by providing access to cutting-edge research and
                    resources.
                  </li>
                  <li className="flex flex-row gap-2">
                    <ArrowRight className="w-5 h-5 min-w-5 mt-1" />
                    Promoting the development of sustainable manufacturing
                    processes and materials that minimize environmental impact.
                  </li>
                  <li className="flex flex-row gap-2">
                    <ArrowRight className="w-5 h-5 min-w-5 mt-1" />
                    Supporting research into circular economy models, focusing
                    on resource efficiency and waste reduction.
                  </li>
                </ul>
              </div>
            </div>
            {/* IMG - Text Left */}
            <div className="flex flex-row gap-0 gap-32">
              <div className="grid grid-cols-2 grid-rows-2 gap-0 w-1/2 min-h-[500px] gap-1 order-2">
                <div className="col-span-1 row-span-1 bg-gray-200 splashMini">
                  1
                </div>
                <div className="col-span-1 row-span-1 bg-gray-200 splashMini">
                  2
                </div>
                <div className="col-span-2 row-span-1 bg-gray-200 splashMini">
                  3
                </div>
              </div>
              <div className="w-1/2 flex flex-col justify-center">
                <h4 className="text-2xl font-semibold mb-4 tracking-tight">
                  Advanced Materials and Devices
                </h4>
                <ul className="flex flex-col gap-2">
                  <li className="flex flex-row gap-2">
                    <ArrowRight className="w-5 h-5 min-w-5 mt-1" />
                    Driving innovation in functional materials for electronics,
                    photonics, and sensor technologies.
                  </li>
                  <li className="flex flex-row gap-2">
                    <ArrowRight className="w-5 h-5 min-w-5 mt-1" />
                    Focusing on emerging areas such as nanoelectronics,
                    neuromorphic architectures, and flexible electronics,
                    enabling the development of next-generation devices.
                  </li>
                  <li className="flex flex-row gap-2">
                    <ArrowRight className="w-5 h-5 min-w-5 mt-1" />
                    Providing state-of-the-art characterization and fabrication
                    facilities for advanced materials research.
                  </li>
                </ul>
              </div>
            </div>
            {/* IMG - Text Right */}
            <div className="flex flex-row gap-0 gap-32">
              <div className="grid grid-cols-2 grid-rows-2 gap-0 w-1/2 min-h-[500px] gap-1">
                <div className="col-span-1 row-span-1 bg-gray-200 splashMini">
                  1
                </div>
                <div className="col-span-1 row-span-1 bg-gray-200 splashMini">
                  2
                </div>
                <div className="col-span-2 row-span-1 bg-gray-200 splashMini">
                  3
                </div>
              </div>
              <div className="w-1/2 flex flex-col justify-center">
                <h4 className="text-2xl font-semibold mb-4 tracking-tight">
                  Creation of New Materials for Energy Applications
                </h4>
                <ul className="flex flex-col gap-2">
                  <li className="flex flex-row gap-2">
                    <ArrowRight className="w-5 h-5 min-w-5 mt-1" />
                    Supporting research into materials for renewable energy
                    sources, including solar, wind, and geothermal technologies.
                  </li>
                  <li className="flex flex-row gap-2">
                    <ArrowRight className="w-5 h-5 min-w-5 mt-1" />
                    Advancing materials for energy efficiency applications, such
                    as thermal insulation and advanced energy storage.
                  </li>
                  <li className="flex flex-row gap-2">
                    <ArrowRight className="w-5 h-5 min-w-5 mt-1" />
                    Facilitating the development of new energy vectors and
                    conversion systems, including hydrogen storage and fuel cell
                    technologies.
                  </li>
                  <li className="flex flex-row gap-2">
                    <ArrowRight className="w-5 h-5 min-w-5 mt-1" />
                    Addressing the challenges of energy production, usage, and
                    storage, aiming for a more efficient and sustainable energy
                    landscape.
                  </li>
                </ul>
              </div>
            </div>
            {/* IMG - Text Left */}
            <div className="flex flex-row gap-0 gap-32">
              <div className="grid grid-cols-2 grid-rows-2 gap-0 w-1/2 min-h-[500px] gap-1 order-2">
                <div className="col-span-1 row-span-1 bg-gray-200 splashMini">
                  1
                </div>
                <div className="col-span-1 row-span-1 bg-gray-200 splashMini">
                  2
                </div>
                <div className="col-span-2 row-span-1 bg-gray-200 splashMini">
                  3
                </div>
              </div>
              <div className="w-1/2 flex flex-col justify-center">
                <h4 className="text-2xl font-semibold mb-4 tracking-tight">
                  Facilitation of Technology Transfer and Innovation
                </h4>
                <ul className="text-lg flex flex-col gap-2">
                  <li className="flex flex-row gap-2">
                    <ArrowRight className="w-5 h-5 min-w-5 mt-1" />
                    Providing tailored support for material-related technology
                    transfer and innovation, catering to the specific needs of
                    industries and SMEs.
                  </li>
                  <li className="flex flex-row gap-2">
                    <ArrowRight className="w-5 h-5 min-w-5 mt-1" />
                    Offering access to expertise, resources, and networks to
                    accelerate the commercialization of new technologies.
                  </li>
                  <li className="flex flex-row gap-2">
                    <ArrowRight className="w-5 h-5 min-w-5 mt-1" />
                    Fostering the creation of new ventures based on emerging
                    materials technologies, supporting entrepreneurship and
                    economic growth.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full overflow-x-hidden">
          <div className="bg-gray-200 splash py-[1px]">
            <div className="flex flex-col gap-8 p-22 bg-muted splash border-none justify-center items-center">
              <DecryptedText
                text="Expertise"
                animateOn="view"
                sequential={true}
                maxIterations={20}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
                speed={50}
                revealDirection="start"
                encryptedClassName="text-5xl  font-medium tracking-tight"
                className="text-5xl !text-center max-w-3xl font-medium tracking-tight"
              />
              <p className="text-2xl max-w-3xl tracking-tight text-center">
                The technical expertise of iENTRANCE encompasses a wide range of
                advanced materials research capabilities, with a strong emphasis
                on nanoscience and technology.
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-col gap-16 p-22 justify-center mx-auto">
            <ExpertiseCarousel />
            <div className="flex max-w-3xl gap-4">
              <p className="text-2xl">
                In essence, iENTRANCE provides a comprehensive platform for
                advanced materials research, combining cutting-edge
                instrumentation, expert knowledge, and a commitment to
                sustainable innovation.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full overflow-x-hidden">
          <div className="bg-gray-200 splash py-[1px]">
            <div className="flex flex-col gap-8 p-22 bg-muted splash border-none justify-center items-center">
              <DecryptedText
                text="Data"
                animateOn="view"
                sequential={true}
                maxIterations={20}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
                speed={50}
                revealDirection="start"
                encryptedClassName="text-5xl  font-medium tracking-tight"
                className="text-5xl !text-center max-w-3xl font-medium tracking-tight"
              />
              <p className="text-2xl max-w-3xl tracking-tight text-center ">
                iENTRANCE is committed to ensuring that all data generated and
                managed within its infrastructure adhere to the FAIR principles:{" "}
                <strong>Findable</strong>, <strong>Accessible</strong>,{" "}
                <strong>Interoperable</strong>, and <strong>Reusable</strong>.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-16 p-22 justify-center mx-auto">
            <div className="flex flex-col gap-4 max-w-3xl gap-4">
              <p className="text-2xl tracking-tight">
                This commitment forms the cornerstone of our data management
                strategy, ensuring that research outputs are not only robust but
                also contribute to a broader ecosystem of accessible scientific
                knowledge.
              </p>
              <p className="text-2xl tracking-tight">
                By embracing FAIR data practices, iENTRANCE offers significant
                advantages to researchers accessing our infrastructure:
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 gap-4">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 bg-gray-200 splashMiniXS p-[1px]"
                >
                  <div className="flex flex-col gap-2 p-8 bg-white pb-2 h-full splashMiniXS">
                    <div className="flex flex-col gap-4">
                      {item.icon}
                      <h4 className="text-xl font-semibold mb-4 tracking-tight">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
