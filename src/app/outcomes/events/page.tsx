"use client";

import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import EventsGrid from "@/components/EventsGrid";
import { useEventsContext } from "@/context/EventsContext";

export default function EventsPage() {
  const { events } = useEventsContext();

  return (
    <>
      <header className="flex flex-col gap-0">
        <div className="container w-full mx-auto flex flex-col gap-2 p-4 md:p-8 md:pt-32 border-y md:border md:border-t-0">
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight">
            Events
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Discover our past and upcoming events with detailed content and
            photo galleries
          </p>
        </div>
      </header>
      <main>
        <div className="container w-full mx-auto flex flex-col gap-2 p-4 md:p-8 border-y md:border md:border-t-0">
          <EventsGrid events={events} />
        </div>
      </main>
    </>
  );
}
