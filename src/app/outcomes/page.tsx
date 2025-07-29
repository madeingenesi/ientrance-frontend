"use client";

import { BrowserRouter } from "react-router-dom";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import Link from "next/link";
import { ArrowRight, Newspaper, Calendar, FileText } from "lucide-react";

import { useArticlesContext } from "@/context/ArticlesContext";
import { usePressContext } from "@/context/PressContext";
import { useEventsContext } from "@/context/EventsContext";

export default function Outcomes() {
  const { articles } = useArticlesContext();
  const { presses } = usePressContext();
  const { events } = useEventsContext();

  return (
    <>
      <header className="flex flex-col gap-0">
        <div className="container w-full mx-auto flex flex-col gap-2 p-4 md:p-8 md:pt-32 border-y md:border md:border-t-0">
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight">
            Outcomes
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Explore our latest news, events, and press releases
          </p>
        </div>
      </header>
      <main>
        <div className="container w-full mx-auto flex flex-col gap-6 p-4 md:p-8 border-y md:border md:border-t-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* News & Events Card */}
            <Link
              href="/outcomes/news-and-events"
              className="group block bg-gray-200 p-[1px] splashMiniXS"
            >
              <div className="p-8 bg-white splashMiniXS">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Newspaper className="w-8 h-8 text-blue-600" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  News & Events
                </h3>
                <p className="text-gray-600 mb-4">
                  Latest news and articles about events from our research
                  community
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {articles.length} articles
                  </span>
                  <span className="text-sm font-medium text-blue-600">
                    View all →
                  </span>
                </div>
              </div>
            </Link>

            {/* Events Card */}
            <Link
              href="/outcomes/events"
              className="group block bg-gray-200 p-[1px] splashMiniXS"
            >
              <div className="p-8 bg-white splashMiniXS">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Calendar className="w-8 h-8 text-green-600" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  Events
                </h3>
                <p className="text-gray-600 mb-4">
                  Discover our past and upcoming events with detailed content
                  and photo galleries
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {events.length} events
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    View all →
                  </span>
                </div>
              </div>
            </Link>

            {/* Press Releases Card */}
            <Link
              href="/outcomes/press-releases"
              className="group block bg-gray-200 p-[1px] splashMiniXS"
            >
              <div className="p-8 bg-white splashMiniXS">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <FileText className="w-8 h-8 text-purple-600" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  Press Releases
                </h3>
                <p className="text-gray-600 mb-4">
                  Official press releases and media communications from our
                  organization
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {presses.length} releases
                  </span>
                  <span className="text-sm font-medium text-purple-600">
                    View all →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
