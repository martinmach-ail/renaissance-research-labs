import FolderCard from "./FolderCard";

const platforms = [
  {
    href: "/legends",
    title: "LEGENDS",
    subtitle: "Learning Codex",
    description:
      "Your personal knowledge atlas and annotation engine that transforms books and podcasts into rich synthesis, archetype-indexed insights, and a lifelong library of applied knowledge.",
    tabLabel: "Knowledge Dossier",
    tabNumber: "No. 001",
    color: "legends" as const,
    image: "/images/Scholia_Folder_Icon.png",
  },
  {
    href: "/library",
    title: "LIBRARY",
    subtitle: "Strategy Engine",
    description:
      "A problem-solving interface that tailors 100+ mental models from 20+ disciplines into your precise, situation-specific thought partner.",
    tabLabel: "Mental Schematics",
    tabNumber: "No. 002",
    color: "library" as const,
    image: "/images/Latticework_Folder_Icon.png",
  },
  {
    href: "/archetypes",
    title: "ARCHETYPES",
    subtitle: "Advisory Forge",
    description:
      "A personalized founder board that channels the wisdom of history's greatest operators, delivering sharp, situational insight and contrarian perspective to help you navigate your toughest decisions.",
    tabLabel: "Board Blueprint",
    tabNumber: "No. 003",
    color: "archetypes" as const,
    image: "/images/Mt_Rushmore_Folder_Icon.png",
  },
];

export default function PlatformsSection() {
  return (
    <div
      className="folders-grid flex justify-center flex-1 items-start flex-wrap"
      style={{ gap: "36px" }}
    >
      {platforms.map((platform) => (
        <FolderCard key={platform.href} {...platform} />
      ))}
    </div>
  );
}
