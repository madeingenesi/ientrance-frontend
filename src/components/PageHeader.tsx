"use client";

import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
// Components
import DecryptedText from "@/components/DecryptedText";
import Aurora from "./Aurora";

import { ArrowDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function PageHeader({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  const pathname = usePathname();

  const generateBreadcrumb = (): BreadcrumbItem[] => {
    const paths = pathname.split("/").filter((path) => path);
    const breadcrumb: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    let currentPath = "";
    paths.forEach((path) => {
      currentPath += `/${path}`;
      breadcrumb.push({
        label: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " "),
        href: currentPath,
      });
    });

    return breadcrumb;
  };

  const breadcrumb = generateBreadcrumb();

  return (
    <header className="w-full">
      <div className="container mx-auto py-4">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb.map((item, index) => (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                {index < breadcrumb.length - 1 && (
                  <span className="ml-1">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Separator />
      <div className="border-l container mx-auto">
        <div
          className="container mx-auto flex flex-col gap-2 p-12 splash min-h-[60vh] justify-end  bg-cover bg-center "
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="bg-white p-8 splashMini px-14 flex flex-row justify-between items-end relative z-10">
            <DecryptedText
              text={title}
              animateOn="view"
              sequential={true}
              maxIterations={20}
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
              speed={50}
              revealDirection="start"
              encryptedClassName="text-5xl  font-medium tracking-tight"
              className="text-5xl !text-center max-w-3xl font-medium tracking-tight"
            />
            <Link
              href="/"
              className="text-lg text-gray-500 hover:text-black transition-all duration-300 flex flex-row gap-2 items-center"
            >
              Discover more
              <ArrowDown className="w-4 h-4" />
            </Link>
          </div>
          <div className="w-full h-full absolute top-0 left-0 opacity-90 rotate-180 z-0">
            <Aurora speed={1} amplitude={0.5} />
          </div>
        </div>
      </div>
    </header>
  );
}
