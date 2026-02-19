"use client";

import { motion } from "framer-motion";

interface Concept {
  id: string;
  name: string;
  type: "Motif" | "Playbook" | "Key Theme" | "Pattern";
  description: string;
}

interface ConnectiveTissueProps {
  sectionTitle: string;
  subheader: string;
  concepts: Concept[];
  archetypeColor: string;
}

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  Motif: { bg: "rgba(202, 138, 4, 0.1)", text: "#CA8A04", border: "rgba(202, 138, 4, 0.3)" },
  Playbook: { bg: "rgba(15, 47, 83, 0.1)", text: "#0F2F53", border: "rgba(15, 47, 83, 0.3)" },
  "Key Theme": { bg: "rgba(124, 58, 237, 0.1)", text: "#7C3AED", border: "rgba(124, 58, 237, 0.3)" },
  Pattern: { bg: "rgba(16, 185, 129, 0.1)", text: "#059669", border: "rgba(16, 185, 129, 0.3)" },
};

export function ConnectiveTissue({
  sectionTitle,
  subheader,
  concepts,
  archetypeColor,
}: ConnectiveTissueProps) {
  if (!concepts || concepts.length === 0) {
    return null;
  }

  return (
    <section
      className="connective-tissue"
      style={{ backgroundColor: "white", padding: "80px 120px", textAlign: "center" }}
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
            Key Concepts
          </div>
          <h2 style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: "48px", fontWeight: 400, color: "#0F2F53", marginBottom: "20px" }}>
            {sectionTitle}
          </h2>
          <p style={{ fontFamily: "var(--font-body), 'Source Serif 4', serif", fontSize: "18px", lineHeight: 1.7, color: "#4a4a4a", maxWidth: "720px", margin: "0 auto" }}>
            {subheader}
          </p>
        </motion.div>

        {/* Concept Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", maxWidth: "1100px", margin: "0 auto" }}>
          {concepts.map((concept, index) => {
            const colors = typeColors[concept.type] || typeColors.Pattern;

            return (
              <motion.div
                key={concept.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                style={{
                  backgroundColor: "#F9F8F6", borderRadius: "12px", padding: "24px",
                  textAlign: "left", cursor: "pointer", transition: "all 0.2s ease", minHeight: "200px",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; e.currentTarget.style.backgroundColor = "white"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.backgroundColor = "#F9F8F6"; }}
              >
                <span style={{ display: "inline-block", backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.border}`, padding: "4px 10px", borderRadius: "4px", fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-ui), Inter, sans-serif", marginBottom: "12px" }}>
                  {concept.type}
                </span>
                <h3 style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: "18px", fontWeight: 500, color: "#0F2F53", marginBottom: "8px" }}>
                  {concept.name}
                </h3>
                <p style={{ fontFamily: "var(--font-body), 'Source Serif 4', serif", fontSize: "14px", lineHeight: 1.5, color: "#6B7280" }}>
                  {concept.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ConnectiveTissue;
