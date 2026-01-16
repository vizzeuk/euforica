import { HeroSection } from "@/components/sections/hero-section";
import { SocialProof } from "@/components/sections/social-proof";
import { BlogGrid } from "@/components/sections/blog-grid";
import { LeadWizard } from "@/components/sections/lead-wizard";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <SocialProof />
      <BlogGrid />
      <LeadWizard />
    </main>
  );
}
