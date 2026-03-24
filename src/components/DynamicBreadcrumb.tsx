"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function formatSegment(segment: string): string {
  const decoded = decodeURIComponent(segment);
  return decoded
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const DynamicBreadcrumb = () => {
  const pathname = usePathname() || "/";
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="container w-full mx-auto">
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.length > 0 && (
          <BreadcrumbSeparator className="hidden md:block" />
        )}
        {pathSegments.map((segment: string, index: number) => (
          <React.Fragment key={`${pathname}-${index}`}>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink asChild>
                <Link
                  href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                >
                  {formatSegment(segment)}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < pathSegments.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
