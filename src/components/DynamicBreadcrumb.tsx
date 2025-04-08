import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const DynamicBreadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname
    ? location.pathname.split("/").filter(Boolean)
    : [];

  return (
    <Breadcrumb className="container w-full mx-auto">
      <BreadcrumbList>
        {pathSegments.map((segment: string, index: number) => (
          <React.Fragment key={index}>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink
                href={`/${pathSegments.slice(0, index + 1).join("/")}`}
              >
                {decodeURIComponent(
                  segment.charAt(0).toUpperCase() + segment.slice(1)
                )}
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
