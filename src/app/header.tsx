"use client";

import { useState } from "react";
import Image from "next/image";
import { Navigation } from "@/components/header/Navigation";
import { Menu } from "lucide-react";
import Link from "next/link";
export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 px-4 md:px-0 sticky top-0 z-50">
      <div className="container mx-auto py-4">
        <div className="flex items-center md:items-start md:align-top justify-between">
          <div className="flex items-center gap-4 relative research-infrastructure-after">
            <Link href="/">
              <Image
                src="/logo/iE_logo_positivo.png"
                alt="logo"
                width={250}
                height={100}
                unoptimized
                className="max-md:w-1/2 md:max-w-[400px] "
              />
            </Link>
          </div>
          <div className="flex-col items-end gap-4 hidden md:flex">
            <div className="flex items-center gap-4">
              <Image
                src="/mur/nextGeneration_positivo.png"
                alt="logo"
                width={130}
                height={110}
                unoptimized
              />
              <Image
                src="/mur/logo_italiadomani.png"
                alt="logo"
                width={110}
                height={110}
                unoptimized
              />
              <Image
                src="/mur/universita_ricerca.jpg"
                alt="logo"
                width={110}
                height={110}
                unoptimized
              />
            </div>
            <Navigation />
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <Menu className="w-6 h-6 text-[var(--blue-primary)]" />
          </div>
        </div>
      </div>
    </header>
  );
}
