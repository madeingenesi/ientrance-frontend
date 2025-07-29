"use client";

import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import NewsGrid from "@/components/Newsgrid";
import { useArticlesContext } from "@/context/ArticlesContext";

export default function NewsAndEventsPage() {
  const { articles } = useArticlesContext();

  return (
    <>
      <header className="flex flex-col gap-0">
        <div className="container w-full mx-auto flex flex-col gap-2 p-4 md:p-8 md:pt-32 border-y md:border md:border-t-0">
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight">
            News & Events
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Latest news and articles about events from our research community
          </p>
        </div>
      </header>
      <main>
        <div className="container w-full mx-auto flex flex-col gap-2 p-4 md:p-8 border-y md:border md:border-t-0">
          <NewsGrid articles={articles} />
        </div>
      </main>
    </>
  );
}
