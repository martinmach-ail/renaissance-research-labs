"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface HubHeroProps {
  name: string;
  subtitle: string;
  dates: string;
  archetype: string;
  archetypeColor: string;
  secondaryArchetypes: string[];
  industry: string;
  coverImage: string;
  quote: string;
  quoteAttribution?: string;
  hook: string;
  totalReadingTime: number;
  volumeCount: number;
}

// Map archetype IDs to display labels
const archetypeLabels: Record<string, string> = {
  ARCH_BUILDER_CONSTRUCTOR: "Builder/Constructor",
  ARCH_CAPITAL_ALLOCATOR: "Capital Allocator",
  ARCH_STRATEGIST: "Strategist",
  ARCH_SYSTEMS_THINKER: "Systems Thinker",
  ARCH_OPERATOR: "Operator",
  ARCH_TALENT_MAGNET: "Talent Magnet",
  ARCH_EVANGELIST_SALESMAN: "Evangelist/Salesman",
  ARCH_SCIENTIST_INVENTOR: "Scientist/Inventor",
  ARCH_CRAFTSMAN_ARTISAN: "Craftsman/Artisan",
  ARCH_PLATFORM_BUILDER: "Platform Builder",
  ARCH_RESEARCHER_SCHOLAR: "Researcher/Scholar",
};

export function HubHero({
  name,
  subtitle,
  dates,
  archetype,
  archetypeColor,
  secondaryArchetypes,
  industry,
  coverImage,
  quote,
  quoteAttribution,
  hook,
  totalReadingTime,
  volumeCount,
}: HubHeroProps) {
  const allArchetypes = [archetype, ...secondaryArchetypes];

  return (
    <section
      className="hub-hero"
      style={{
        backgroundColor: "#0F2F53",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Back Button */}
      <Link
        href="/legends"
        style={{
          position: "absolute",
          top: "80px",
          left: "48px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "var(--font-ui), Inter, sans-serif",
          fontSize: "13px",
          fontWeight: 500,
          color: "rgba(255, 255, 255, 0.7)",
          textDecoration: "none",
          zIndex: 10,
          transition: "color 0.15s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "white";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Legends
      </Link>

      {/* Subtle radial gradient with archetype color */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 70% 30%, ${archetypeColor}15 0%, transparent 50%)`,
          pointerEvents: "none",
        }}
      />

      <div
        className="hub-hero-container"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "120px 48px 80px",
          display: "grid",
          gridTemplateColumns: "380px 1fr",
          gap: "64px",
          alignItems: "center",
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left: Cover Image with WHITE BACKGROUND CONTAINER */}
        <motion.div
          className="hub-hero-image"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
            }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "1/1",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {coverImage && (
                <Image
                  src={coverImage}
                  alt={name}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="380px"
                  priority
                />
              )}
            </div>
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div
          className="hub-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          {/* Label */}
          <div
            style={{
              color: archetypeColor,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "16px",
              fontFamily: "var(--font-ui), Inter, sans-serif",
            }}
          >
            Legend Dossier
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: "var(--font-display), 'Playfair Display', serif",
              fontSize: "72px",
              fontWeight: 400,
              color: "#FFFFFF",
              lineHeight: 1.0,
              marginBottom: "12px",
            }}
          >
            {name}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "var(--font-display), 'Playfair Display', serif",
              fontSize: "24px",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.4,
              marginBottom: "24px",
            }}
          >
            {subtitle}
          </p>

          {/* Divider */}
          <div
            style={{
              width: "48px",
              height: "3px",
              backgroundColor: archetypeColor,
              marginBottom: "24px",
              borderRadius: "2px",
            }}
          />

          {/* Hook - justified text */}
          <p
            style={{
              fontFamily: "var(--font-body), 'Source Serif 4', serif",
              fontSize: "18px",
              color: "rgba(255,255,255,0.9)",
              lineHeight: 1.7,
              textAlign: "justify",
              maxWidth: "540px",
              marginBottom: "32px",
            }}
          >
            {hook}
          </p>

          {/* Meta Row */}
          <div
            style={{
              display: "flex",
              gap: "32px",
              marginBottom: "24px",
              fontFamily: "var(--font-ui), Inter, sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: "rgba(255,255,255,0.7)",
              textTransform: "uppercase",
            }}
          >
            <span>
              Lived{" "}
              <span style={{ color: "white", marginLeft: "8px" }}>{dates}</span>
            </span>
            <span>
              Industry{" "}
              <span style={{ color: "white", marginLeft: "8px" }}>{industry}</span>
            </span>
            <span>
              Volumes{" "}
              <span style={{ color: "white", marginLeft: "8px" }}>{volumeCount}</span>
            </span>
            <span>
              Total{" "}
              <span style={{ color: "white", marginLeft: "8px" }}>{totalReadingTime} min</span>
            </span>
          </div>

          {/* Archetype Tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "32px",
            }}
          >
            {allArchetypes.map((arch, index) => (
              <span
                key={arch}
                style={{
                  backgroundColor:
                    index === 0 ? archetypeColor : "rgba(255,255,255,0.1)",
                  color: index === 0 ? "#0F2F53" : "rgba(255,255,255,0.8)",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: 600,
                  fontFamily: "var(--font-ui), Inter, sans-serif",
                }}
              >
                {archetypeLabels[arch] || arch}
              </span>
            ))}
          </div>

          {/* Quote Block */}
          <div
            style={{
              borderLeft: `3px solid ${archetypeColor}`,
              paddingLeft: "24px",
              marginTop: "32px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display), 'Playfair Display', serif",
                fontSize: "20px",
                fontStyle: "italic",
                color: "rgba(255,255,255,0.9)",
                lineHeight: 1.5,
                marginBottom: "8px",
              }}
            >
              &ldquo;{quote}&rdquo;
            </p>
            {quoteAttribution && (
              <p
                style={{
                  fontFamily: "var(--font-ui), Inter, sans-serif",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                &mdash; {quoteAttribution}
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          color: "rgba(255,255,255,0.5)",
          fontSize: "12px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontFamily: "var(--font-ui), Inter, sans-serif",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <span style={{ display: "block", marginBottom: "8px" }}>&#8595;</span>
        Scroll to Explore
      </motion.div>
    </section>
  );
}

export default HubHero;
