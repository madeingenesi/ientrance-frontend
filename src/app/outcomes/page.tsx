"use client";

import { BrowserRouter } from "react-router-dom";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

import NewsGrid from "@/components/Newsgrid";
import Presslist from "@/components/Presslist";

import { useArticlesContext } from "@/context/ArticlesContext";
import { usePressContext } from "@/context/PressContext";

export default function Outcomes() {
  const [newsStatus, setNewsStatus] = useState<boolean>(true);
  const { articles } = useArticlesContext();
  const { presses } = usePressContext();

  return (
    <>
      <header className="flex flex-col gap-0">
        {/* <div className="w-full border-b p-4 px-8">
          <BrowserRouter>
            <DynamicBreadcrumb />
          </BrowserRouter>
        </div> */}
        <div className="container w-full mx-auto flex flex-col gap-2 p-4 md:p-8 md:pt-32 border-y md:border md:border-t-0">
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight">
            Outcomes
          </h1>
        </div>
        <div className="container w-full mx-auto flex flex-col md:flex-row gap-2 p-4 md:gap-8 border-y md:border md:border-t-0 md:p-8">
          <div
            className={`w-full md:w-1/2 flex flex-row p-4 md:p-8 splashMiniXS cursor-pointer justify-between items-center ${
              newsStatus ? "bg-[var(--blue-primary)] text-white" : "bg-muted"
            }`}
            onClick={() => setNewsStatus(true)}
          >
            <span className="text-2xl font-medium">News & Events</span>
            <span
              className={`flex flex-row items-center justify-center text-lg w-8 h-8 rounded-full font-semibold ${
                newsStatus
                  ? "bg-white text-[var(--blue-primary)]"
                  : "bg-black text-white"
              }`}
            >
              {articles.length}
            </span>
          </div>
          <div
            className={`w-full md:w-1/2 p-4 md:p-8 splashMiniXS cursor-pointer ${
              !newsStatus ? "bg-[var(--blue-primary)] text-white" : "bg-muted"
            }`}
            onClick={() => setNewsStatus(false)}
          >
            <span className="text-2xl font-medium">Press Releases</span>
          </div>
        </div>
      </header>
      <main>
        <div className="container w-full mx-auto flex flex-col gap-2 p-4 md:p-8 border-y md:border md:border-t-0">
          {newsStatus ? (
            <NewsGrid articles={articles} />
          ) : (
            <Presslist presses={presses} />
          )}
        </div>
      </main>
    </>
  );
}
