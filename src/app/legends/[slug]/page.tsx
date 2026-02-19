import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { LegendHubPage } from "@/components/hub";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Get the content directory path
function getContentPath() {
  return path.join(process.cwd(), "content", "legends");
}

// Get legend data from index.mdx
async function getLegendData(slug: string) {
  const contentPath = getContentPath();
  const indexPath = path.join(contentPath, slug, "index.mdx");

  if (!fs.existsSync(indexPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(indexPath, "utf-8");
  const { data } = matter(fileContent);

  return {
    slug,
    legend: data.legend,
    subtitle: data.subtitle,
    dates: data.dates,
    archetype: data.archetype,
    archetypeColor: data.archetypeColor,
    secondaryArchetypes: data.secondaryArchetypes || [],
    industry: data.industry,
    coverImage: data.coverImage,
    iconImage: data.iconImage,
    coverQuote: data.coverQuote || data.quote,
    quoteAttribution: data.quoteAttribution,
    hook: data.hook || data.introduction,
    centralQuestion: data.centralQuestion,
    totalReadingTime: data.totalReadingTime || 0,
    volumes: data.volumes || [],
    connectedLegends: data.connectedLegends || {},
    connectiveTissue: data.connectiveTissue || null,
  };
}

// Generate static params for all legends
export async function generateStaticParams() {
  const contentPath = getContentPath();

  if (!fs.existsSync(contentPath)) {
    return [];
  }

  const entries = fs.readdirSync(contentPath, { withFileTypes: true });
  const slugs = entries
    .filter((entry) => entry.isDirectory())
    .filter((dir) => {
      const indexPath = path.join(contentPath, dir.name, "index.mdx");
      return fs.existsSync(indexPath);
    })
    .map((dir) => ({ slug: dir.name }));

  return slugs;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const legend = await getLegendData(slug);

  if (!legend) {
    return {
      title: "Legend Not Found | Renaissance Research Labs",
    };
  }

  return {
    title: `${legend.legend} | Legends | Renaissance Research Labs`,
    description: legend.hook,
  };
}

export default async function LegendHubPageRoute({ params }: PageProps) {
  const { slug } = await params;
  const legend = await getLegendData(slug);

  if (!legend) {
    notFound();
  }

  return <LegendHubPage {...legend} />;
}
