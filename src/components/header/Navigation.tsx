"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { LogIn, FolderOpenDot, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "The Big Picture",
    href: "/the-mosaic/#the-big-picture",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "Values",
    href: "/the-mosaic/#values",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "Challenges / Topics",
    href: "/the-mosaic/#challenges",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "Board of Partners",
    href: "/the-mosaic/#boardofpartners",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "Expertise",
    href: "/the-mosaic/#expertise",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "Data",
    href: "/the-mosaic/#data",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
];

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const handleAnchorClick = (href: string) => {
    const [path, hash] = href.split("#");
    const currentPath = pathname?.split("#")[0] || "/";

    if (path === currentPath) {
      // Siamo sulla stessa pagina, scroll all'ancoraggio
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Pagina diversa, naviga normalmente
      router.push(href);
    }
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {/* <Link href="/the-mosaic" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              The Mosaic
            </NavigationMenuLink>
          </Link> */}
          <NavigationMenuTrigger>
            <span onClick={() => router.push("/the-mosaic")}>The Mosaic</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  onClick={() => handleAnchorClick(component.href)}
                  className="pb-0 splashMiniXS hover:!bg-[var(--blue-primary)] hover:text-white hover:*:text-white"
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/come-in" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Come In
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/learn-and-grow" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Learn & Grow
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Outcomes
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <Button variant="outline" className="cursor-pointer">
              <LogIn className="w-4 h-4" />
              Login
            </Button>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <Button className="bg-[var(--blue-primary)] text-white cursor-pointer">
              <FolderOpenDot className="w-4 h-4" />
              Send your project
            </Button>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { onClick?: () => void }
>(({ className, title, children, href, onClick, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          href={href}
          onClick={(e) => {
            e.preventDefault();
            onClick?.();
          }}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group",
            className
          )}
          {...props}
        >
          <div className="flex items-center justify-start">
            <div className="text-sm font-medium leading-none">{title}</div>
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-[10px] group-hover:!text-white" />
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
