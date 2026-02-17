import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ArticlesContext } from "../context/ArticlesContext";
import { EquipmentsProvider } from "../context/EquimentContext";
import Header from "./header";
import Footer from "./footer";
import { PagesContext } from "../context/PagesContext";
import { PressContext } from "../context/PressContext";
import { EventsContext } from "../context/EventsContext";
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
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-S0508RQJFG"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-S0508RQJFG');
            `,
          }}
        />
        {/* Matomo */}
        <Script
          id="matomo"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var _paq = window._paq = window._paq || [];
              _paq.push(['trackPageView']);
              _paq.push(['enableLinkTracking']);
              (function() {
                var u="https://metrics.cedrc.cnr.it/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '59']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
              })();
            `,
          }}
        />
        {/* End Matomo */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PagesContext>
          <ArticlesContext>
            <EquipmentsProvider>
              <PressContext>
                <EventsContext>
                  <Header />
                  {children}
                  <Footer />
                </EventsContext>
              </PressContext>
            </EquipmentsProvider>
          </ArticlesContext>
        </PagesContext>
      </body>
    </html>
  );
}
