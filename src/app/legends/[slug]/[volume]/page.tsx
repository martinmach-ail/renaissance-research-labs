import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import Footer from "@/components/Footer";
import {
  VolumeCover,
  VolumeSidebar,
  MarginaliaSidebar,
  MarginaliaProvider,
  SectionProvider,
  SectionHeading,
  VolumeStickyHeader,
  VolumeNavigation,
} from "@/components/volume";
import type { MarginaliaItem } from "@/components/volume";
import { DropCap } from "@/components/DropCap";
import { PersonLink } from "@/components/PersonLink";
import { Marginalia } from "@/components/Marginalia";
import { PullQuote } from "@/components/PullQuote";
import { ThroughLine } from "@/components/ThroughLine";
import { Playbook } from "@/components/Playbook";
import { Footnote } from "@/components/Footnote";
import { Interlude } from "@/components/Interlude";
import { ConceptLink } from "@/components/ConceptLink";
import { SourceRef } from "@/components/SourceRef";
import { getDisplayName, formatMotif } from "@/lib/taxonomy";
import "@/components/volume/volume-page.css";

interface PageProps {
  params: Promise<{
    slug: string;
    volume: string;
  }>;
}

interface SectionData {
  id: string;
  title: string;
}

interface FrontmatterMarginalia {
  id: string;
  section: string;
  type: string;
  title: string;
  content: string;
}

interface FrontmatterSource {
  id: number;
  citation: string;
  dbId?: string;
}

// Get the content directory path
function getContentPath() {
  return path.join(process.cwd(), "content", "legends");
}

// Store extracted section IDs during preprocessing
// eslint-disable-next-line prefer-const
let extractedSectionIds: Map<string, string> = new Map();

// Build MDX components with sources data bound to SourceRef
function buildComponents(sources: FrontmatterSource[]) {
  return {
    DropCap,
    PersonLink,
    Marginalia,
    PullQuote,
    ThroughLine,
    Playbook,
    Footnote,
    Interlude,
    ConceptLink,
    SourceRef: (props: { id: number }) => (
      <SourceRef id={props.id} sources={sources} />
    ),
    // h2 renders section titles with ID from SectionContext
    h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
      <SectionHeading>{props.children}</SectionHeading>
    ),
  };
}

// Preprocess MDX content to convert {#id} header syntax to SectionTitle component
function preprocessMDX(content: string): string {
  extractedSectionIds.clear();

  // Strip {#id} from ## headings — MDX will render them as normal h2 elements,
  // and the h2 component override + SectionContext will map titles to IDs
  return content.replace(
    /^(#{2})\s+(.+?)\s*\{#([a-z0-9-]+)\}\s*$/gm,
    (_, _hashes, title, id) => {
      extractedSectionIds.set(title.trim(), id);
      return `## ${title.trim()}`;
    }
  );
}

// Get volume data from MDX file
async function getVolumeData(slug: string, volume: string) {
  const contentPath = getContentPath();
  const volumePath = path.join(contentPath, slug, `${volume}.mdx`);

  if (!fs.existsSync(volumePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(volumePath, "utf-8");
  const { data, content } = matter(fileContent);

  // Preprocess to remove {#id} syntax that MDX can't parse
  const processedContent = preprocessMDX(content);

  // Build components with sources data bound to SourceRef
  const sources: FrontmatterSource[] = data.sources || [];
  const components = buildComponents(sources);

  // Compile MDX content
  const { content: compiledContent } = await compileMDX({
    source: processedContent,
    components,
    options: {
      parseFrontmatter: false,
    },
  });

  return {
    frontmatter: data,
    content: compiledContent,
    slug,
    volume,
  };
}

// Get index.mdx data for volume title lookup
async function getIndexData(slug: string) {
  const contentPath = getContentPath();
  const indexPath = path.join(contentPath, slug, "index.mdx");

  if (!fs.existsSync(indexPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(indexPath, "utf-8");
  const { data } = matter(fileContent);
  return data;
}

// Generate static params for all volumes
export async function generateStaticParams() {
  const contentPath = getContentPath();

  if (!fs.existsSync(contentPath)) {
    return [];
  }

  const legends = fs.readdirSync(contentPath, { withFileTypes: true });
  const params: { slug: string; volume: string }[] = [];

  for (const legend of legends) {
    if (!legend.isDirectory()) continue;

    const legendPath = path.join(contentPath, legend.name);
    const files = fs.readdirSync(legendPath);

    for (const file of files) {
      if (file.startsWith("volume-") && file.endsWith(".mdx")) {
        params.push({
          slug: legend.name,
          volume: file.replace(".mdx", ""),
        });
      }
    }
  }

  return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug, volume } = await params;
  const volumeData = await getVolumeData(slug, volume);
  const indexData = await getIndexData(slug);

  if (!volumeData || !indexData) {
    return {
      title: "Volume Not Found | Renaissance Research Labs",
    };
  }

  const volumeInfo = indexData.volumes?.find(
    (v: { slug: string }) => v.slug === volume
  );

  return {
    title: `${volumeInfo?.title || volume} | ${indexData.legend} | Renaissance Research Labs`,
    description: volumeInfo?.subtitle || volumeData.frontmatter.subtitle,
  };
}

export default async function VolumePageRoute({ params }: PageProps) {
  const { slug, volume } = await params;
  const volumeData = await getVolumeData(slug, volume);
  const indexData = await getIndexData(slug);

  if (!volumeData) {
    notFound();
  }

  const { frontmatter, content } = volumeData;
  const archetypeColor =
    frontmatter.archetypeColor || indexData?.archetypeColor || "#CA8A04";

  const volumeInfo = indexData?.volumes?.find(
    (v: { slug: string }) => v.slug === volume
  );

  const legendName = frontmatter.legendName || frontmatter.title || indexData?.legend || "Legend";
  const volumeTitle = volumeInfo?.title || frontmatter.title;
  const volumeSubtitle = frontmatter.subtitle || volumeInfo?.subtitle || "";
  const dates = frontmatter.dates || indexData?.dates || "";
  const industry = frontmatter.industry || indexData?.industry || "";

  const rawReadingTime = frontmatter.readingTime || volumeInfo?.readingTime || 30;
  const readingTime = typeof rawReadingTime === "string"
    ? parseInt(rawReadingTime.replace(" minutes", "").replace(/\D/g, "")) || 30
    : rawReadingTime;

  const archetype = frontmatter.archetype
    ? getDisplayName(frontmatter.archetype)
    : "";
  const secondaryArchetypes = (frontmatter.secondaryArchetypes || []).map(
    (a: string) => getDisplayName(a)
  );

  const disciplines = (frontmatter.disciplines || volumeInfo?.disciplines || []).map(
    (d: string) => getDisplayName(d)
  );

  const coverImage =
    frontmatter.coverImage ||
    `/images/legends/${slug}/${slug}-${volume}.png`;
  const quote = frontmatter.quote;
  const quoteAttribution = frontmatter.quoteAttribution;
  const pdfUrl = frontmatter.pdfUrl;

  const tocItems: { id: string; title: string }[] = (
    frontmatter.sections || []
  ).map((section: SectionData) => ({
    id: section.id,
    title: section.title,
  }));

  const motifs = (frontmatter.motifs || []).map((m: string) => formatMotif(m));

  const marginalia: MarginaliaItem[] = (frontmatter.marginalia || []).map(
    (m: FrontmatterMarginalia) => ({
      id: m.id,
      section: m.section,
      type: m.type,
      title: m.title,
      content: m.content,
    })
  );

  const sections = frontmatter.sections || [];

  // Build section note counts and IDs for MarginaliaProvider
  const sectionNoteCounts: Record<string, number> = {};
  const sectionNoteIds: Record<string, string[]> = {};
  for (const m of marginalia) {
    if (!sectionNoteCounts[m.section]) {
      sectionNoteCounts[m.section] = 0;
      sectionNoteIds[m.section] = [];
    }
    sectionNoteCounts[m.section]++;
    sectionNoteIds[m.section].push(m.id);
  }

  const volumes = indexData?.volumes || [];
  const currentVolumeIndex = volumes.findIndex(
    (v: { slug: string }) => v.slug === volume
  );
  const prevVolume = currentVolumeIndex > 0
    ? { slug: volumes[currentVolumeIndex - 1].slug, title: volumes[currentVolumeIndex - 1].title }
    : undefined;
  const nextVolume = currentVolumeIndex < volumes.length - 1 && currentVolumeIndex >= 0
    ? { slug: volumes[currentVolumeIndex + 1].slug, title: volumes[currentVolumeIndex + 1].title }
    : undefined;

  return (
    <SectionProvider sections={sections}>
      <MarginaliaProvider sectionNoteCounts={sectionNoteCounts} sectionNoteIds={sectionNoteIds}>
        <div
          className="volume-page"
          style={
            {
              "--archetype-primary": archetypeColor,
              "--archetype-primary-light": archetypeColor,
              "--archetype-primary-dark": archetypeColor,
              "--archetype-primary-muted": `${archetypeColor}1F`,
            } as React.CSSProperties
          }
        >
          {/* Sticky Header with Progress */}
          <VolumeStickyHeader
            legendName={legendName}
            legendSlug={slug}
            archetypeColor={archetypeColor}
            isCrossCutting={frontmatter.archetype === "CROSS_CUTTING"}
          />

          {/* Cover Section */}
          <VolumeCover
            legendName={legendName}
            legendSlug={slug}
            volumeTitle={volumeTitle}
            volumeSubtitle={volumeSubtitle}
            dates={dates}
            industry={industry}
            readingTime={parseInt(String(readingTime))}
            archetype={archetype}
            secondaryArchetypes={secondaryArchetypes}
            disciplines={disciplines}
            coverImage={coverImage}
            quote={quote}
            quoteAttribution={quoteAttribution}
            archetypeColor={archetypeColor}
            pdfUrl={pdfUrl}
            hook={frontmatter.hook}
            legendsAnalyzed={frontmatter.legendsAnalyzed}
            historicalRange={frontmatter.historicalRange}
            industriesSpanned={frontmatter.industriesSpanned}
            sourcesCount={frontmatter.sourcesCount}
            isCrossCutting={frontmatter.archetype === "CROSS_CUTTING"}
          />

          {/* Main 3-Column Layout */}
          <main className="volume-main-content">
            {/* Left Sidebar - TOC */}
            <VolumeSidebar
              tocItems={tocItems}
              archetype={archetype}
              secondaryArchetypes={secondaryArchetypes}
              disciplines={disciplines}
              motifs={motifs}
              archetypeColor={archetypeColor}
              isCrossCutting={frontmatter.archetype === "CROSS_CUTTING"}
            />

            {/* Center - Article Content */}
            <article className="volume-article">
              <div className="prose-scholia">
                {content}
              </div>
            </article>

            {/* Right Marginalia */}
            <MarginaliaSidebar
              items={marginalia}
              archetypeColor={archetypeColor}
            />
          </main>

          {/* Volume Navigation */}
          <VolumeNavigation
            legendSlug={slug}
            legendName={legendName}
            prevVolume={prevVolume}
            nextVolume={nextVolume}
            isCrossCutting={frontmatter.archetype === "CROSS_CUTTING"}
          />

          <Footer />
        </div>
      </MarginaliaProvider>
    </SectionProvider>
  );
}
