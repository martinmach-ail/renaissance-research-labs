import fs from "fs";
import path from "path";
import matter from "gray-matter";
import NavHeader from "@/components/NavHeader";
import Footer from "@/components/Footer";
import { VolumeBlock } from "@/components/hub";
import { ArchetypesHero } from "./ArchetypesHero";

interface VolumeData {
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

interface CrossCuttingAnalysis {
  slug: string;
  legend: string;
  subtitle: string;
  archetypeColor: string;
  hook: string;
  volumes: VolumeData[];
}

function getCrossCuttingVolumes(): CrossCuttingAnalysis[] {
  const contentPath = path.join(process.cwd(), "content", "legends");

  if (!fs.existsSync(contentPath)) {
    return [];
  }

  const entries = fs.readdirSync(contentPath, { withFileTypes: true });
  const crossCutting: CrossCuttingAnalysis[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const indexPath = path.join(contentPath, entry.name, "index.mdx");
    if (!fs.existsSync(indexPath)) continue;

    const fileContent = fs.readFileSync(indexPath, "utf-8");
    const { data } = matter(fileContent);

    if (data.archetype === "CROSS_CUTTING") {
      crossCutting.push({
        slug: entry.name,
        legend: data.legend,
        subtitle: data.subtitle,
        archetypeColor: data.archetypeColor || "#0F2F53",
        hook: data.hook || "",
        volumes: (data.volumes || []).map((v: Record<string, unknown>) => ({
          number: (v.number as number) || 1,
          title: (v.title as string) || "",
          slug: (v.slug as string) || "volume-1",
          readingTime: (v.readingTime as number) || 30,
          primaryDiscipline: v.primaryDiscipline as string | undefined,
          disciplines: (v.disciplines as string[]) || [],
          image: (v.image as string) || `/images/cross-cutting/${entry.name}.svg`,
          status: ((v.status as string) || "published") as "published" | "coming-soon",
          hook: v.hook as string | undefined,
          quote: v.quote as string | undefined,
          quoteSource: v.quoteSource as string | undefined,
          pdfStatus: ((v.pdfStatus as string) || "coming-soon") as "available" | "coming-soon",
          pdfUrl: v.pdfUrl as string | undefined,
        })),
      });
    }
  }

  return crossCutting;
}

export default function Archetypes() {
  const crossCuttingVolumes = getCrossCuttingVolumes();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <ArchetypesHero />

        {/* Cross-Cutting Analysis Volumes */}
        {crossCuttingVolumes
          .flatMap((analysis) =>
            analysis.volumes.map((volume) => ({
              volume,
              archetypeColor: analysis.archetypeColor,
              legendSlug: analysis.slug,
            }))
          )
          .map((item, globalIndex) => (
            <VolumeBlock
              key={`${item.legendSlug}-${item.volume.slug}`}
              volume={item.volume}
              archetypeColor={item.archetypeColor}
              legendSlug={item.legendSlug}
              isOdd={(globalIndex + 1) % 2 === 1}
            />
          ))}

        {/* Empty state if no cross-cutting volumes exist */}
        {crossCuttingVolumes.length === 0 && (
          <section className="py-24 px-6 text-center">
            <p
              className="font-body italic text-lg"
              style={{ color: "#6b6b6b" }}
            >
              Content coming soon. Cross-cutting analyses will appear here.
            </p>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
