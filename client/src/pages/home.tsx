import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { IngredientScanner } from "@/components/IngredientScanner";
import { FlavorPairing } from "@/components/FlavorPairing";
import { PersonalizedExperience } from "@/components/PersonalizedExperience";
import { SustainabilitySection } from "@/components/SustainabilitySection";
import { Testimonials } from "@/components/Testimonials";
import { CtaSection } from "@/components/CtaSection";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Flavour Fusion - Intelligent Ingredient Pairing</title>
        <meta name="description" content="Discover perfect ingredient pairings, reduce food waste, and create delicious meals with AI-powered ingredient recognition and flavor pairing technology." />
        <meta property="og:title" content="Flavour Fusion - Intelligent Ingredient Pairing" />
        <meta property="og:description" content="Transform your cooking experience with AI-powered ingredient identification and pairing technology." />
      </Helmet>
      
      <Hero />
      <Features />
      <IngredientScanner />
      <FlavorPairing />
      <PersonalizedExperience />
      <SustainabilitySection />
      <Testimonials />
      <CtaSection />
    </>
  );
}
