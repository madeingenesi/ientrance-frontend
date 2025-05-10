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

const theMosaic: { title: string; href: string; description: string }[] = [
  {
    title: "Values",
    href: "/the-mosaic/#values",
    description:
      "iENTRANCE is founded on the values of collaborative excellence, technological innovation, and a commitment to addressing pressing societal challenges through advanced materials research.",
  },
  {
    title: "Board of Partners",
    href: "/the-mosaic/#boardofpartners",
    description:
      "The Boards of Partners showcases our collaborative network, highlighting partner expertise driving innovation. Together, we advance cutting-edge research.",
  },
  {
    title: "Challenges / Topics",
    href: "/the-mosaic/#challenges",
    description:
      "iENTRANCE is committed to addressing complex challenges across both technological and methodological frontiers. We aim to be a catalyst for innovation and sustainable development through targeted initiatives.",
  },
  {
    title: "Expertise",
    href: "/the-mosaic/#expertise",
    description:
      "The technical expertise of iENTRANCE encompasses a wide range of advanced materials research capabilities, with a strong emphasis on nanoscience and technology.",
  },
  {
    title: "Data",
    href: "/the-mosaic/#data",
    description:
      "iENTRANCE is committed to ensuring that all data generated and managed within its infrastructure adhere to the FAIR principles: Findable, Accessible, Interoperable, and Reusable.",
  },
];

const comeIn: { title: string; href: string; description: string }[] = [
  {
    title: "Guide",
    href: "/come-in/#guide",
    description: "iENTRANCE Infrastructure Access: A Step-by-Step Guide",
  },
  {
    title: "FAQ",
    href: "/come-in/#faq",
    description:
      "The FAQ section provides clear answers to common questions, helping you quickly understand our services and more",
  },
];

const learnGrow: { title: string; href: string; description: string }[] = [
  {
    title: "Summer School",
    href: "/learn-and-grow/#summer-school",
    description:
      "The Summer School iENTRANCE to research. The young scientist's guide to the galaxy. Rethinking research in an AI-empowered world.",
  },
];

const outcomes: { title: string; href: string; description: string }[] = [
  {
    title: "News & Events",
    href: "/outcomes/#news-events",
    description: "Stay updated with the latest news and events from iENTRANCE.",
  },
  {
    title: "Press Releases",
    href: "/outcomes/#press-releases",
    description: "Stay updated with the latest news and events from iENTRANCE.",
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
            <ul className="grid gap-3 p-4 md:w-[300px] md:grid-cols-2 lg:w-[450px]">
              {theMosaic.map((component) => (
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
          <NavigationMenuTrigger>
            <span onClick={() => router.push("/come-in")}>Come In</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[300px] md:grid-cols-2 lg:w-[450px]">
              {comeIn.map((component) => (
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
          <NavigationMenuTrigger>
            <span onClick={() => router.push("/learn-and-grow")}>
              Learn & Grow
            </span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[300px] md:grid-cols-2 lg:w-[450px]">
              {learnGrow.map((component) => (
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
        <NavigationMenuItem className="mr-0">
          <NavigationMenuTrigger>
            <span onClick={() => router.push("/outcomes")}>Outcomes</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[300px] md:grid-cols-2 lg:w-[450px]">
              {outcomes.map((component) => (
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
        <div className="flex items-center gap-2">
          <NavigationMenuItem className="hidden">
            <Link href="/docs" legacyBehavior passHref>
              <Button variant="outline" className="cursor-pointer">
                <LogIn className="w-4 h-4" />
                Login
              </Button>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="https://ambitious-cat-3135f7987e.media.strapiapp.com/i_Entrance_Proposal_Template_5380b72ea6.rtf"
              legacyBehavior
              passHref
            >
              <Button className="bg-[var(--blue-primary)] text-white cursor-pointer">
                <FolderOpenDot className="w-4 h-4" />
                Send your project
              </Button>
            </Link>
          </NavigationMenuItem>
        </div>
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
