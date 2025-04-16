import { ArrowUpRight } from "lucide-react";

export default function Presslist() {
  const presslist = [
    {
      id: 1,
      title: "Il sole 24 ore",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: "https://www.google.com",
      date: "2021-01-01",
    },
    {
      id: 2,
      title: "La Repubblica",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      link: "https://www.google.com",
      date: "2021-01-01",
    },
  ];

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
      {presslist.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-12 border-b py-4 bg-white hover:bg-muted/50 transition-all duration-300 cursor-pointer"
        >
          <div className="col-span-2">{item.title}</div>
          <div className="col-span-7">{item.description}</div>
          <div className="col-span-2">{item.date}</div>
          <div className="col-span-1 text-right flex justify-end">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="self-end"
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
