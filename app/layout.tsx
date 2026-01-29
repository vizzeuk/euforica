import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { GoogleAnalytics } from '@next/third-parties/google';

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  preload: true,
  fallback: ['Georgia', 'serif'],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: "Euforica — Creamos Momentos Inolvidables",
  description: "Producción de eventos de alto nivel. Bodas, eventos corporativos y celebraciones exclusivas con un toque de elegancia y sofisticación.",
  keywords: ["eventos", "bodas", "corporativos", "producción de eventos", "eventos premium", "euforica"],
  openGraph: {
    title: "Euforica — Creamos Momentos Inolvidables",
    description: "Producción de eventos de alto nivel con elegancia y sofisticación.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-2TCDHH4SBH" />
    </html>
  );
}
