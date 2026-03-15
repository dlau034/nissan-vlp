import React from "react";
import { storyblokEditable } from "@storyblok/react/rsc";
import VlpBanner from "@/components/bloks/VlpBanner/VlpBanner";
import VlpIntroSpecs from "@/components/bloks/VlpIntroSpecs/VlpIntroSpecs";
import VlpFeatures from "@/components/bloks/VlpFeatures/VlpFeatures";
import VlpGradeSelector from "@/components/bloks/VlpGradeSelector/VlpGradeSelector";
import VlpColourSelector from "@/components/bloks/VlpColourSelector/VlpColourSelector";
import VlpDesignHighlights from "@/components/bloks/VlpDesignHighlights/VlpDesignHighlights";
import VlpOffers from "@/components/bloks/VlpOffers/VlpOffers";
import VlpEditorial from "@/components/bloks/VlpEditorial/VlpEditorial";
import VlpSplitCta from "@/components/bloks/VlpSplitCta/VlpSplitCta";
import VlpFaq from "@/components/bloks/VlpFaq/VlpFaq";
import VlpNextSteps from "@/components/bloks/VlpNextSteps/VlpNextSteps";

const BLOKS: Record<string, React.ComponentType<{ blok: any }>> = {
  vlp_banner: VlpBanner,
  vlp_intro_specs: VlpIntroSpecs,
  vlp_features: VlpFeatures,
  vlp_grade_selector: VlpGradeSelector,
  vlp_colour_selector: VlpColourSelector,
  vlp_design_highlights: VlpDesignHighlights,
  vlp_offers: VlpOffers,
  vlp_editorial: VlpEditorial,
  vlp_split_cta: VlpSplitCta,
  vlp_faq: VlpFaq,
  vlp_next_steps: VlpNextSteps,
};

export default function VlpPage({ blok }: { blok: any }) {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body?.map((section: any) => {
        const Component = BLOKS[section.component];
        if (!Component) return null;
        return <Component blok={section} key={section._uid} />;
      })}
    </main>
  );
}
