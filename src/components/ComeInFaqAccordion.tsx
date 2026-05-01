"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqEntry = { title: string; content: string };

type ComeInFaqAccordionProps = {
  items: FaqEntry[];
};

export default function ComeInFaqAccordion({ items }: ComeInFaqAccordionProps) {
  if (items.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8 text-base md:text-lg">
        FAQ content could not be loaded. Please see the full{" "}
        <a className="text-[var(--blue-primary)] underline" href="/faq">
          FAQ
        </a>{" "}
        page.
      </p>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, index) => (
        <AccordionItem key={index} value={`faq-${index}`}>
          <AccordionTrigger className="text-xl font-semibold tracking-tight text-left">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="text-lg whitespace-pre-line">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
