"use client";

import NavHeader from "@/components/NavHeader";
import Footer from "@/components/Footer";
import { HubHero } from "./HubHero";
import { VolumeBlock } from "./VolumeBlock";
import { ConnectedLegends } from "./ConnectedLegends";
import { ConnectiveTissue } from "./ConnectiveTissue";

interface Volume {
  number: number;
  title: string;
  slug: string;
  readingTime: number;
  primaryDiscipline?: string;
  disciplines: string[];
  image: string;
  status: "published" | "coming-soon";
  hook?: string;
  quote?: string;
  quoteSource?: string;
  pdfStatus?: "available" | "coming-soon";
  pdfUrl?: string;
}

interface ConnectedLegendFigure {
  slug: string;
  name: string;
  initials?: string;
  relationship: "Mentor" | "Rival" | "Parallel" | "Partner" | "Successor";
  description?: string;
  image?: string;
}

interface ConnectedLegendsData {
  sectionTitle?: string;
  subheader?: string;
  figures?: ConnectedLegendFigure[];
}

interface ConnectiveTissueConcept {
  id: string;
  name: string;
  type: "Motif" | "Playbook" | "Key Theme" | "Pattern";
  description: string;
}

interface ConnectiveTissueData {
  sectionTitle: string;
  subheader: string;
  concepts: ConnectiveTissueConcept[];
}

interface LegendHubPageProps {
  legend: string;
  slug: string;
  subtitle: string;
  dates: string;
  archetype: string;
  archetypeColor: string;
  secondaryArchetypes: string[];
  industry: string;
  coverImage: string;
  iconImage?: string;
  coverQuote: string;
  quoteAttribution?: string;
  hook: string;
  centralQuestion?: string;
  totalReadingTime: number;
  volumes: Volume[];
  connectedLegends: ConnectedLegendsData | ConnectedLegendFigure[];
  connectiveTissue?: ConnectiveTissueData | null;
}

export function LegendHubPage({
  legend,
  slug,
  subtitle,
  dates,
  archetype,
  archetypeColor,
  secondaryArchetypes,
  industry,
  coverImage,
  coverQuote,
  quoteAttribution,
  hook,
  totalReadingTime,
  volumes,
  connectedLegends,
  connectiveTissue,
}: LegendHubPageProps) {
  // Handle both old format (array) and new format (object with figures)
  const legendsData: ConnectedLegendsData = Array.isArray(connectedLegends)
    ? { figures: connectedLegends }
    : connectedLegends;

  return (
    <div className="legend-hub-page" style={{ minHeight: "100vh" }}>
      <NavHeader />

      {/* Hero Section */}
      <HubHero
        name={legend}
        subtitle={subtitle}
        dates={dates}
        archetype={archetype}
        archetypeColor={archetypeColor}
        secondaryArchetypes={secondaryArchetypes}
        industry={industry}
        coverImage={coverImage}
        quote={coverQuote}
        quoteAttribution={quoteAttribution}
        hook={hook}
        totalReadingTime={totalReadingTime}
        volumeCount={volumes.length}
      />

      {/* Volume Blocks */}
      {volumes.map((volume, index) => (
        <VolumeBlock
          key={volume.slug}
          volume={volume}
          archetypeColor={archetypeColor}
          legendSlug={slug}
          isOdd={(index + 1) % 2 === 1}
        />
      ))}

      {/* Connected Legends */}
      <ConnectedLegends
        sectionTitle={legendsData.sectionTitle}
        subheader={legendsData.subheader}
        legends={legendsData.figures || []}
        archetypeColor={archetypeColor}
      />

      {/* Connective Tissue */}
      {connectiveTissue && (
        <ConnectiveTissue
          sectionTitle={connectiveTissue.sectionTitle}
          subheader={connectiveTissue.subheader}
          concepts={connectiveTissue.concepts}
          archetypeColor={archetypeColor}
        />
      )}

      <Footer />
    </div>
  );
}

export default LegendHubPage;
