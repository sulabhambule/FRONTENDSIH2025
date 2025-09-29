import { Header } from "@/pages/Headers/LandingHeader"
import { Hero } from "@/pages/LandingPage/LandingHero"
import { Features } from "@/pages/LandingPage/Features"
import { Benefits } from "@/pages/LandingPage/Benifits"
import { CTA } from "@/pages/LandingPage/cta"
import { Footer } from "@/pages/Footers/LandingFooter"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <Benefits />
      <CTA />
      <Footer />
    </div>
  )
}
