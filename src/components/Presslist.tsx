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

  return (
    <div className="min-h-screen w-full">
      <div className="grid grid-cols-12 border-y py-4">
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
      {presses.map((item: any) => {
        const url = item?.File[0]?.url;
        console.log("url", url);
        console.log("item", item);
        return (
          <div
            key={item.id}
            className="grid grid-cols-12 border-b py-4 bg-white hover:bg-muted/50 transition-all duration-300 cursor-pointer"
          >
            <div className="col-span-2">{item.Source}</div>
            <div className="col-span-7">{item.Titolo}</div>
            <div className="col-span-2">
              {new Date(item.Data).toLocaleDateString()}
            </div>
            <div className="col-span-1 text-right flex justify-end">
              <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="self-end"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
