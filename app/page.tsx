import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";
import { SocialProof } from "@/components/sections/social-proof";
import { ServicesPreview } from "@/components/sections/services-preview";
import { BlogGrid } from "@/components/sections/blog-grid";
import { AboutSection } from "@/components/sections/about-section";
import { LeadWizard } from "@/components/sections/lead-wizard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EUFÓRICA - Experiencias que Transforman | Eventos Memorables",
  description: "Creamos experiencias inolvidables que transforman celebraciones en momentos extraordinarios. Máquina de Chispas Frías, Glitter Bar, Photo Estudio Editorial y más.",
  keywords: "eventos, celebraciones, bodas, chispas frías, glitter bar, photo estudio, audio guestbook, Santiago Chile",
  openGraph: {
    title: "EUFÓRICA - Experiencias que Transforman",
    description: "Creamos experiencias inolvidables que transforman celebraciones en momentos extraordinarios.",
    url: "https://euforica.cl",
    siteName: "EUFÓRICA",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EUFÓRICA - Experiencias que Transforman",
    description: "Creamos experiencias inolvidables que transforman celebraciones en momentos extraordinarios.",
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <SocialProof />
        <ServicesPreview />
        <BlogGrid />
        <AboutSection />
        <LeadWizard />
      </main>
    </>
  );
}
