// app/page.tsx

import CTASection from "@/components/home/CTA";
import FeaturesSection from "@/components/home/features";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/how-it-works";
import Navbar from "@/components/layout/Navbar";
import StatsSection from "@/components/home/Stats";


export default function HomePage() {
  return (
    <main className="pt-28">
      <Navbar />

      <Hero/>

      <StatsSection />

      <FeaturesSection />

      <HowItWorks />

      <CTASection />

      <Footer />
    </main>
  )
}