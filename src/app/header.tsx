"use client";

import { useState } from "react";
import Image from "next/image";
import { Navigation } from "@/components/header/Navigation";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200">
      <div className="container mx-auto py-4">
        <div className="flex items-start align-top justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/logo/iE_logo_positivo.png"
              alt="logo"
              width={250}
              height={100}
              unoptimized
            />
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="/mur/nextGeneration_positivo.png"
                alt="logo"
                width={100}
                height={100}
                unoptimized
              />
              <Image
                src="/mur/logo_italiadomani.png"
                alt="logo"
                width={100}
                height={100}
                unoptimized
              />
              <Image
                src="/mur/universita_ricerca.jpg"
                alt="logo"
                width={100}
                height={100}
                unoptimized
              />
            </div>
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  );
}
