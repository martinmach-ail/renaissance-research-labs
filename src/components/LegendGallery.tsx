"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Legend {
  id: string;
  name: string;
  archetype: string;
  archetypeLabel: string;
  industry: string;
  image: string;
}

const legends: Legend[] = [
  {
    id: "henry-ford",
    name: "Henry Ford",
    archetype: "builder-constructor",
    archetypeLabel: "Builder/Constructor",
    industry: "Automotive",
    image: "/images/legends/Henry_Ford.png",
  },
  {
    id: "charlie-munger",
    name: "Charlie Munger",
    archetype: "capital-allocator",
    archetypeLabel: "Capital Allocator",
    industry: "Finance",
    image: "/images/legends/Charlie_Munger.png",
  },
  {
    id: "alan-turing",
    name: "Alan Turing",
    archetype: "scientist-inventor",
    archetypeLabel: "Scientist/Inventor",
    industry: "Software",
    image: "/images/legends/Alan_Turing.png",
  },
  {
    id: "barry-diller",
    name: "Barry Diller",
    archetype: "builder-constructor",
    archetypeLabel: "Builder/Constructor",
    industry: "Media",
    image: "/images/legends/Barry_Diller.png",
  },
  {
    id: "charlie-bluhdorn",
    name: "Charlie Bluhdorn",
    archetype: "capital-allocator",
    archetypeLabel: "Capital Allocator",
    industry: "Conglomerates",
    image: "/images/legends/Charlie_Bluhdorn.png",
  },
  {
    id: "christian-von-koenigsegg",
    name: "Christian von Koenigsegg",
    archetype: "craftsman-artisan",
    archetypeLabel: "Craftsman/Artisan",
    industry: "Automotive",
    image: "/images/legends/Christian_von_Koenigsegg.png",
  },
  {
    id: "daniel-ek",
    name: "Daniel Ek",
    archetype: "builder-constructor",
    archetypeLabel: "Builder/Constructor",
    industry: "Software",
    image: "/images/legends/Daniel_Elk.png",
  },
  {
    id: "dietrich-mateschitz",
    name: "Dietrich Mateschitz",
    archetype: "evangelist-salesman",
    archetypeLabel: "Evangelist/Salesman",
    industry: "Consumer",
    image: "/images/legends/Dietrich_Mateschitz.png",
  },
  {
    id: "ed-catmull",
    name: "Ed Catmull",
    archetype: "talent-magnet",
    archetypeLabel: "Talent Magnet",
    industry: "Media",
    image: "/images/legends/Ed_Catmull.png",
  },
  {
    id: "enzo-ferrari",
    name: "Enzo Ferrari",
    archetype: "craftsman-artisan",
    archetypeLabel: "Craftsman/Artisan",
    industry: "Automotive",
    image: "/images/legends/Enzo_Ferrari.png",
  },
  {
    id: "james-dyson",
    name: "James Dyson",
    archetype: "scientist-inventor",
    archetypeLabel: "Scientist/Inventor",
    industry: "Consumer",
    image: "/images/legends/James_Dyson.png",
  },
  {
    id: "jensen-huang",
    name: "Jensen Huang",
    archetype: "visionary",
    archetypeLabel: "Visionary",
    industry: "Semiconductors",
    image: "/images/legends/Jensen_Huang.png",
  },
  {
    id: "jim-simons",
    name: "Jim Simons",
    archetype: "systems-thinker",
    archetypeLabel: "Systems Thinker",
    industry: "Finance",
    image: "/images/legends/Jim_Simons.png",
  },
  {
    id: "john-malone",
    name: "John Malone",
    archetype: "capital-allocator",
    archetypeLabel: "Capital Allocator",
    industry: "Media",
    image: "/images/legends/John_Malone.png",
  },
  {
    id: "larry-ellison",
    name: "Larry Ellison",
    archetype: "evangelist-salesman",
    archetypeLabel: "Evangelist/Salesman",
    industry: "Software",
    image: "/images/legends/Larry_Ellison.png",
  },
  {
    id: "les-schwab",
    name: "Les Schwab",
    archetype: "talent-magnet",
    archetypeLabel: "Talent Magnet",
    industry: "Retail",
    image: "/images/legends/Les_Schwab.png",
  },
  {
    id: "martin-escobari",
    name: "Martin Escobari",
    archetype: "capital-allocator",
    archetypeLabel: "Capital Allocator",
    industry: "Private Equity",
    image: "/images/legends/Martin_Escobari.png",
  },
  {
    id: "michael-dell",
    name: "Michael Dell",
    archetype: "operator",
    archetypeLabel: "Operator",
    industry: "Technology",
    image: "/images/legends/Michael_Dell.png",
  },
  {
    id: "michael-ovitz",
    name: "Michael Ovitz",
    archetype: "strategist",
    archetypeLabel: "Strategist",
    industry: "Media",
    image: "/images/legends/Michael_Ovitz.png",
  },
  {
    id: "michele-ferrero",
    name: "Michele Ferrero",
    archetype: "craftsman-artisan",
    archetypeLabel: "Craftsman/Artisan",
    industry: "Consumer",
    image: "/images/legends/Michele_Ferrero.png",
  },
  {
    id: "reed-hastings",
    name: "Reed Hastings",
    archetype: "visionary",
    archetypeLabel: "Visionary",
    industry: "Media",
    image: "/images/legends/Reed_Hastings.png",
  },
];

// For now, all legends show as "Coming Soon" — we'll activate them as volumes are published
const activeLegends = new Set<string>(["henry-ford"]);

export default function LegendGallery() {
  return (
    <section className="legend-gallery-section">
      <div className="legend-gallery-container">
        <header className="legend-gallery-header">
          <motion.div
            className="legend-gallery-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="legend-pulse-dot"></span>
            <span>Mapped Minds</span>
          </motion.div>

          <motion.div
            className="legend-gallery-title-wrapper"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="section-number">01</span>
            <div className="title-divider"></div>
            <h2 className="legend-gallery-title">Learnings From Legends</h2>
          </motion.div>

          <motion.p
            className="legend-gallery-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A living index of founder wisdom. Decoded playbooks spanning eras,
            industries, and operating styles.
          </motion.p>

          <motion.div
            className="legend-gallery-divider"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 64, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </header>

        <div className="legend-grid">
          {legends.map((legend, index) => {
            const isActive = activeLegends.has(legend.id);

            const cardContent = (
              <>
                <div
                  className="legend-card-image"
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1/1",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={legend.image}
                    alt={legend.name}
                    fill
                    className="legend-img-black"
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 640px) 50vw, (max-width: 900px) 33vw, (max-width: 1200px) 25vw, 20vw"
                  />
                  {/* Status badge */}
                  <div
                    className={`legend-status-badge ${isActive ? "legend-status-badge--active" : "legend-status-badge--coming-soon"}`}
                  >
                    {isActive ? (
                      <>
                        <span className="legend-status-icon">&rarr;</span>
                        <span>View Dossier</span>
                      </>
                    ) : (
                      <>
                        <span className="legend-status-icon">&loz;</span>
                        <span>Coming Soon</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="legend-card-strip">
                  <h3 className="legend-name">{legend.name}</h3>
                  <div className="legend-tags">
                    <span className="legend-tag legend-tag--archetype">
                      {legend.archetypeLabel}
                    </span>
                    <span className="legend-tag legend-tag--industry">
                      {legend.industry}
                    </span>
                  </div>
                </div>
              </>
            );

            return (
              <motion.article
                key={legend.id}
                className={`legend-card ${isActive ? "legend-card--active" : "legend-card--coming-soon"}`}
                data-legend={legend.id}
                data-archetype={legend.archetype}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                {isActive ? (
                  <Link href={`/legends/${legend.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                    {cardContent}
                  </Link>
                ) : (
                  cardContent
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
