import Link from "next/link";

// Shadcn
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { SheetClose } from "@/components/ui/sheet";

const theMosaic: { title: string; href: string }[] = [
  {
    title: "The Mosaic",
    href: "/the-mosaic",
  },
  {
    title: "Values",
    href: "/the-mosaic/#values",
  },
  {
    title: "Board of Partners",
    href: "/the-mosaic/#boardofpartners",
  },
  {
    title: "Challenges / Topics",
    href: "/the-mosaic/#challenges",
  },
  {
    title: "Expertise",
    href: "/the-mosaic/#expertise",
  },
  {
    title: "Data",
    href: "/the-mosaic/#data",
  },
];

const comeIn: { title: string; href: string }[] = [
  {
    title: "Come In",
    href: "/come-in",
  },
  {
    title: "Guide",
    href: "/come-in/#guide",
  },
  {
    title: "FAQ",
    href: "/come-in/#faq",
  },
];

const learnGrow: { title: string; href: string }[] = [
  {
    title: "Summer School",
    href: "/learn-and-grow/#summer-school",
  },
];

const outcomes: { title: string; href: string }[] = [
  {
    title: "News & Events",
    href: "/outcomes/#news-events",
  },
  {
    title: "Press Releases",
    href: "/outcomes/#press-releases",
  },
];

export default function MobileMenu() {
  return (
    <>
      <nav className="flex flex-col gap-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-bold py-2">
              The Mosaic
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {theMosaic.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link href={item.href}>{item.title}</Link>
                </SheetClose>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2 !border-b !border-gray-200">
            <AccordionTrigger className="text-lg font-bold py-2">
              Come In
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {comeIn.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link href={item.href}>{item.title}</Link>
                </SheetClose>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3 !border-b !border-gray-200">
            <AccordionTrigger className="text-lg font-bold py-2">
              Learn & Grow
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {learnGrow.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link href={item.href}>{item.title}</Link>
                </SheetClose>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4 !border-b !border-gray-200">
            <AccordionTrigger className="text-lg font-bold py-2">
              Outcomes
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {outcomes.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link href={item.href}>{item.title}</Link>
                </SheetClose>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </nav>
    </>
  );
}
