"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ConnectedLegend {
  slug: string;
  name: string;
  initials?: string;
  relationship: "Mentor" | "Rival" | "Parallel" | "Partner" | "Successor";
  description?: string;
  image?: string;
}

interface ConnectedLegendsProps {
  sectionTitle?: string;
  subheader?: string;
  legends: ConnectedLegend[];
  archetypeColor: string;
}

const relationshipColors: Record<string, { bg: string; text: string; border: string }> = {
  Mentor: { bg: "rgba(16, 185, 129, 0.1)", text: "#059669", border: "rgba(16, 185, 129, 0.3)" },
  Rival: { bg: "rgba(239, 68, 68, 0.1)", text: "#DC2626", border: "rgba(239, 68, 68, 0.3)" },
  Parallel: { bg: "rgba(59, 130, 246, 0.1)", text: "#2563EB", border: "rgba(59, 130, 246, 0.3)" },
  Partner: { bg: "rgba(124, 58, 237, 0.1)", text: "#7C3AED", border: "rgba(124, 58, 237, 0.3)" },
  Successor: { bg: "rgba(139, 92, 246, 0.1)", text: "#7C3AED", border: "rgba(139, 92, 246, 0.3)" },
};

function getInitials(name: string, providedInitials?: string): string {
  if (providedInitials) return providedInitials;
  const parts = name.split(" ").filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

export function ConnectedLegends({
  sectionTitle,
  subheader,
  legends,
  archetypeColor,
}: ConnectedLegendsProps) {
  if (!legends || legends.length === 0) {
    return null;
  }

  return (
    <section
      className="connected-legends"
      style={{
        backgroundColor: "#F9F8F6",
        padding: "80px 120px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section Header */}
        <motion.div
          style={{ marginBottom: "48px" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: archetypeColor, marginBottom: "16px", fontFamily: "var(--font-ui), Inter, sans-serif" }}>
            Related Figures
          </div>
          <h2 style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: "48px", fontWeight: 400, color: "#0F2F53", marginBottom: "20px" }}>
            {sectionTitle || "Connected Legends"}
          </h2>
          <p style={{ fontFamily: "var(--font-body), 'Source Serif 4', serif", fontSize: "18px", lineHeight: 1.7, color: "#4a4a4a", maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
            {subheader || "Explore the network of influences, rivals, and parallels that shaped this legend's story."}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1000px", margin: "0 auto" }}>
          {legends.map((legend, index) => {
            const relColors = relationshipColors[legend.relationship] || relationshipColors.Parallel;
            const initials = getInitials(legend.name, legend.initials);

            return (
              <motion.div
                key={legend.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{ height: "100%" }}
              >
                <Link
                  href={`/legends/${legend.slug}`}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", textDecoration: "none",
                    backgroundColor: "#FFFFFF", borderRadius: "12px", padding: "32px 24px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)", transition: "all 0.2s ease",
                    border: "1px solid rgba(15, 47, 83, 0.08)", height: "100%", minHeight: "280px",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
                >
                  {/* Avatar */}
                  <div style={{ width: "72px", height: "72px", borderRadius: "50%", backgroundColor: "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", overflow: "hidden", position: "relative" }}>
                    {legend.image ? (
                      <Image src={legend.image} alt={legend.name} fill style={{ objectFit: "cover" }} sizes="72px" />
                    ) : (
                      <span style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: "24px", fontWeight: 500, color: "#6B7280" }}>{initials}</span>
                    )}
                  </div>

                  {/* Name */}
                  <h3 style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: "20px", fontWeight: 500, color: "#0F2F53", marginBottom: "12px" }}>
                    {legend.name}
                  </h3>

                  {/* Relationship Badge */}
                  <span style={{ display: "inline-block", backgroundColor: relColors.bg, color: relColors.text, border: `1px solid ${relColors.border}`, padding: "4px 12px", borderRadius: "4px", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-ui), Inter, sans-serif", marginBottom: "12px" }}>
                    {legend.relationship}
                  </span>

                  {/* Description */}
                  {legend.description && (
                    <p style={{ fontFamily: "var(--font-body), 'Source Serif 4', serif", fontSize: "14px", color: "#6B7280", lineHeight: 1.5, flexGrow: 1 }}>
                      {legend.description}
                    </p>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ConnectedLegends;
