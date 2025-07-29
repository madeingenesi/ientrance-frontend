import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Event {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  content?: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  photoGallery?: Array<{
    id: number;
    url: string;
    alternativeText?: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
    };
  }>;
}

interface EventsGridProps {
  events: Event[];
}

export default function EventsGrid({ events }: EventsGridProps) {
  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-gray-500 text-lg">No events available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
      {events
        ?.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((event: any) => {
          const imageUrl =
            event.photoGallery && event.photoGallery.length > 0
              ? event.photoGallery[0].formats?.medium?.url ||
                event.photoGallery[0].url
              : "/images/placeholder.jpg";

          let firstParagraph = "";
          if (event.content && Array.isArray(event.content)) {
            const paragraph = event.content.find(
              (block: any) => block.type === "paragraph"
            );
            if (paragraph && paragraph.children && paragraph.children[0]) {
              firstParagraph = paragraph.children[0].text || "";
            }
          }

          return (
            <div
              key={event.id}
              className="bg-gray-200 splashMiniXS flex-1 p-[1px] h-full"
            >
              <div className="flex flex-col gap-0 bg-muted min-h-full p-2 splashMiniXS">
                <Image
                  src={imageUrl}
                  alt={event.title}
                  width={600}
                  height={400}
                  className="object-cover splashMiniXS w-full h-[300px]"
                />
                <div className="flex flex-col p-4 flex-1 justify-between">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-semibold text-left mt-3">
                      {event.title}
                    </h3>
                    <p className="text-left mt-3">
                      {firstParagraph.length > 100
                        ? firstParagraph.substring(0, 100) + "..."
                        : firstParagraph}
                    </p>
                    <Link
                      href={`/events/${event.slug}`}
                      className="w-fit"
                      prefetch={true}
                    >
                      <Button
                        variant="outline"
                        className="w-fit mb-4 cursor-pointer"
                      >
                        Read More <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                  <div className="flex flex-row w-full justify-between pt-4 p-4 splashMiniXS bg-[var(--green-primary)] text-white">
                    <span className="text-sm font-medium flex flex-row gap-2 items-center">
                      <Calendar className="w-4 h-4" />
                      Event
                    </span>
                    <span className="text-sm font-medium">
                      {new Date(event?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
