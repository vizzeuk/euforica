import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";
import { SocialProof } from "@/components/sections/social-proof";
import { BlogGrid } from "@/components/sections/blog-grid";
import { AboutSection } from "@/components/sections/about-section";
import { LeadWizard } from "@/components/sections/lead-wizard";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <SocialProof />
        <BlogGrid />
        <AboutSection />
        <LeadWizard />
      </main>
    </>
  );
}
