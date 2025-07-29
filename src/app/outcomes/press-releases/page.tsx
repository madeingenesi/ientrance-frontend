"use client";

import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import Presslist from "@/components/Presslist";
import { usePressContext } from "@/context/PressContext";

export default function PressReleasesPage() {
  const { presses } = usePressContext();

  return (
    <>
      <header className="flex flex-col gap-0">
        <div className="container w-full mx-auto flex flex-col gap-2 p-4 md:p-8 md:pt-32 border-y md:border md:border-t-0">
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight">
            Press Releases
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Official press releases and media communications from our
            organization
          </p>
        </div>
      </header>
      <main>
        <div className="container w-full mx-auto flex flex-col gap-2 p-4 md:p-8 border-y md:border md:border-t-0">
          <Presslist presses={presses} />
        </div>
      </main>
    </>
  );
}
