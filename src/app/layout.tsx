import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ArticlesContext } from "../context/ArticlesContext";
import { EquipmentsProvider } from "../context/EquimentContext";
import Header from "./header";
import Footer from "./footer";
import { PagesContext } from "../context/PagesContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SOA Nanotech",
  description: "SOA Nanotech",
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
              <Header />
              {children}
              <Footer />
            </EquipmentsProvider>
          </ArticlesContext>
        </PagesContext>
      </body>
    </html>
  );
}
