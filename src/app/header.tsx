"use client";

import { useState } from "react";
import Image from "next/image";
import { Navigation } from "@/components/header/Navigation";
import { Menu, Info } from "lucide-react";
import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import InfoButtonHeader from "@/components/InfoButtonHeader";
// Shadcn

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 px-4 md:px-0 sticky top-0 z-50">
      <div className="container mx-auto py-4">
        <div className="flex items-center md:items-start md:align-top justify-between">
          <div className="flex flex-row items-center gap-4 relative">
            <Link
              href="/"
              className="flex flex-col md:flex-row md:items-center gap-4"
            >
              <Image
                src="/logo/iE_logo_positivo.png"
                alt="logo"
                width={250}
                height={100}
                unoptimized
                className="max-md:w-1/2 md:max-w-[400px] "
              />
              <span className="md:text-xl font-semibold tracking-tight text-[var(--blue-primary)] md:border-l md:pl-4 border-[var(--blue-primary)] ml-9 -mt-7 md:mt-0 md:ml-0 flex items-center gap-2">
                Research Infrastructure
                <InfoButtonHeader className="hidden md:block" />
              </span>
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
          <div className="flex flex-col items-center gap-4 md:hidden">
            <div className="flex items-center gap-4 md:hidden justify-between -ml-[120px]">
              <Image
                src="/mur/nextGeneration_positivo.png"
                alt="logo"
                width={50}
                height={50}
                unoptimized
              />
              <Image
                src="/mur/logo_italiadomani.png"
                alt="logo"
                width={50}
                height={50}
                unoptimized
              />
              <Image
                src="/mur/universita_ricerca.jpg"
                alt="logo"
                width={50}
                height={50}
                unoptimized
              />
            </div>
            <div className="flex items-center gap-4">
              <InfoButtonHeader className="md:hidden" />
              <Sheet>
                <SheetTrigger asChild>
                  <Menu className="w-6 h-6 text-[var(--blue-primary)]" />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle></SheetTitle>
                  </SheetHeader>
                  <MobileMenu />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
