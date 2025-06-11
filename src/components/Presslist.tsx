import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Presslist({ presses }: { presses: any }) {
  // const presslist = [
  //   {
  //     id: 1,
  //     title: "Il sole 24 ore",
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     link: "https://www.google.com",
  //     date: "2021-01-01",
  //   },
  //   {
  //     id: 2,
  //     title: "La Repubblica",
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
  //     link: "https://www.google.com",
  //     date: "2021-01-01",
  //   },
  // ];

  // Add null check for presses array
  if (!presses || !Array.isArray(presses)) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p>Loading press articles...</p>
      </div>
    );
  }

  // Sort articles from newest to oldest based on Data field
  const sortedPresses = [...presses].sort((a, b) => {
    const dateA = a.Data ? new Date(a.Data).getTime() : 0;
    const dateB = b.Data ? new Date(b.Data).getTime() : 0;
    return dateB - dateA; // Descending order (newest first)
  });

  return (
    <div className="min-h-screen w-full">
      <div className="grid grid-cols-12 border-y py-4 hidden md:grid">
        <div className="col-span-2 text-muted-foreground font-semibold">
          Source
        </div>
        <div className="col-span-7 text-muted-foreground font-semibold">
          Title
        </div>
        <div className="col-span-2 text-muted-foreground font-semibold">
          Date
        </div>
        <div className="col-span-1 text-right text-muted-foreground font-semibold">
          Link
        </div>
      </div>
      {sortedPresses.map((item: any) => {
        // Add proper null checking for File array
        const url =
          item?.File && Array.isArray(item.File) && item.File.length > 0
            ? item.File[0]?.url
            : "#";

        console.log("url", url);
        console.log("item", item);

        return (
          <div
            key={item.id}
            className="grid grid-rows-3 md:grid-rows-1 grid-cols-12 border-b py-4 bg-white hover:bg-muted/50 transition-all duration-300 cursor-pointer"
          >
            <div className="col-span-12 md:col-span-2 row-start-1 md:row-start-1 text-xs md:text-base">
              {item.Source || "Unknown Source"}
            </div>
            <div className="col-span-12 md:col-span-7 row-start-2 md:row-start-1 pb-2">
              {item.Titolo || "No Title"}
            </div>
            <div className="col-span-6 md:col-span-2 row-start-3 md:row-start-1">
              {item.Data ? new Date(item.Data).toLocaleDateString() : "No Date"}
            </div>
            <div className="col-span-6 md:col-span-1 row-start-3 md:row-start-1 text-right flex items-start justify-end gap-2">
              <span className="block md:hidden">Go to the article</span>
              {url !== "#" ? (
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="md:self-end"
                >
                  <ArrowUpRight className="w-5 h-5 md:w-4 md:h-4 mt-1 md:mt-0" />
                </Link>
              ) : (
                <div className="md:self-end opacity-50">
                  <ArrowUpRight className="w-5 h-5 md:w-4 md:h-4 mt-1 md:mt-0" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
