import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Rss, Paperclip, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NewsGrid({ articles }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
      {articles
        ?.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((article: any) => {
          const imageUrl = article?.Immagine?.url || "/images/placeholder.jpg";
          const firstParagraph =
            article?.Contenuto?.[0]?.children?.[0]?.text || "";
          return (
            <div
              key={article.id}
              className="bg-gray-200 splashMiniXS flex-1 p-[1px] h-full"
            >
              <div className="flex flex-col gap-0 bg-muted min-h-full p-2 splashMiniXS">
                <Image
                  src={imageUrl}
                  alt={"esempio"}
                  width={600}
                  height={400}
                  className="object-cover splashMiniXS w-full h-[300px]"
                />
                <div className="flex flex-col p-4 flex-1 justify-between">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-semibold text-left mt-3">
                      {article.Titolo}
                    </h3>
                    <p className="text-left mt-3">
                      {firstParagraph.length > 100
                        ? firstParagraph.substring(0, 100) + "..."
                        : firstParagraph}
                    </p>
                    <Link
                      href={`${
                        article.Link_Esterno
                          ? article.Link_Esterno
                          : `/articoli/${article.Slug}`
                      }`}
                      className="w-fit"
                      prefetch={true}
                      target={article.Link_Esterno ? "_blank" : "_self"}
                    >
                      <Button
                        variant="outline"
                        className="w-fit mb-4 cursor-pointer"
                      >
                        Read More <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                  <div
                    className={`flex flex-row w-full justify-between pt-4 p-4 splashMiniXS ${
                      article?.categorie_articoli?.Titolo === "News"
                        ? "bg-[var(--blue-primary)] text-white"
                        : "bg-[var(--green-primary)] text-white"
                    }`}
                  >
                    <span className="text-sm font-medium flex flex-row gap-2 items-center">
                      {article?.categorie_articoli?.Titolo == "News" ? (
                        <Rss className="w-4 h-4" />
                      ) : article?.categorie_articoli?.Titolo == "Proposals" ? (
                        <Paperclip className="w-4 h-4" />
                      ) : (
                        <Calendar className="w-4 h-4" />
                      )}
                      {article?.categorie_articoli?.Titolo}
                    </span>
                    <span className="text-sm font-medium">
                      {new Date(article?.createdAt).toLocaleDateString()}
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
