"use client";

import { HeroSection } from "@/components/public/HeroSection";
import { StripSection } from "@/components/landing/StripSection";
import { StorySection } from "@/components/landing/StorySection";
import { DataSection } from "@/components/landing/DataSection";
import { LatestGuideSection } from "@/components/landing/LatestGuideSection";
import { PhiloSection } from "@/components/landing/PhiloSection";
import { HowSection } from "@/components/landing/HowSection";
import { MutualSection } from "@/components/landing/MutualSection";
import { EmotionSection } from "@/components/landing/EmotionSection";
import { CompareSection } from "@/components/landing/CompareSection";
import { OwnerSection } from "@/components/landing/OwnerSection";
import { PriceSection } from "@/components/landing/PriceSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { FinalSection } from "@/components/landing/FinalSection";
import { BuybarSection } from "@/components/landing/BuybarSection";
import { useLandingAnimations } from "@/components/landing/useLandingAnimations";
import type { ArticleListItem, FaqItem } from "@/lib/types";

export function HomePage({
  latestArticles,
  latestFaqs,
}: {
  latestArticles: ArticleListItem[];
  latestFaqs: FaqItem[];
}) {
  useLandingAnimations();

  return (
    <>
      <HeroSection />
      <div id="heroEnd" aria-hidden="true" />
      <StripSection />
      <StorySection />
      <DataSection />
      {/* Dynamic articles - the ONLY addition replacing static guide-data.js */}
      <LatestGuideSection latestArticles={latestArticles} />
      <PhiloSection />
      <HowSection />
      <MutualSection />
      <EmotionSection />
      <CompareSection />
      <OwnerSection />
      <PriceSection />
      {/* Static FAQ as demonstrated in compiled page - not dynamic DB */}
      <FaqSection />
      <FinalSection />
      <BuybarSection />
    </>
  );
}
