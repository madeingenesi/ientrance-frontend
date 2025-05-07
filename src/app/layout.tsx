import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ArticlesContext } from "../context/ArticlesContext";
import { EquipmentsProvider } from "../context/EquimentContext";
import Header from "./header";
import Footer from "./footer";
import { PagesContext } from "../context/PagesContext";
import { PressContext } from "../context/PressContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iEntrance",
  description:
    "A fully interoperable Technological Research Infrastructure of European excellence in Italy devoted to Clean Energy Transition Research.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PagesContext>
          <ArticlesContext>
            <EquipmentsProvider>
              <PressContext>
                <Header />
                {children}
                <Footer />
              </PressContext>
            </EquipmentsProvider>
          </ArticlesContext>
        </PagesContext>
      </body>
    </html>
  );
}
