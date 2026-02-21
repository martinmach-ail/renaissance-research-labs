"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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

interface VolumeBlockProps {
  volume: Volume;
  archetypeColor: string;
  legendSlug: string;
  isOdd: boolean;
}

const romanNumerals: Record<number, string> = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
};

export function VolumeBlock({
  volume,
  archetypeColor,
  legendSlug,
  isOdd,
}: VolumeBlockProps) {
  const bgColor = isOdd ? archetypeColor : "#0F2F53";
  const isPublished = volume.status === "published";

  return (
    <section
      className="volume-block"
      style={{
        backgroundColor: bgColor,
        color: "white",
        padding: "80px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isOdd
            ? "radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)"
            : "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="volume-block-container"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 120px",
          display: "grid",
          gridTemplateColumns: isOdd ? "400px 1fr" : "1fr 400px",
          gap: "64px",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Image Column with WHITE BACKGROUND CONTAINER */}
        <motion.div
          className="volume-image-wrapper"
          style={{ order: isOdd ? 1 : 2 }}
          initial={{ opacity: 0, x: isOdd ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1/1",
                overflow: "hidden",
              }}
            >
              {volume.image && (
                <Image
                  src={volume.image}
                  alt={`Volume ${volume.number}: ${volume.title}`}
                  fill
                  style={{
                    objectFit: "cover",
                    opacity: isPublished ? 1 : 0.5,
                    filter: isPublished ? "none" : "grayscale(50%)",
                  }}
                  sizes="400px"
                />
              )}
              {!isPublished && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "rgba(15, 47, 83, 0.9)",
                    color: "#FFFFFF",
                    padding: "12px 24px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-ui), Inter, sans-serif",
                  }}
                >
                  Coming Soon
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Content Column */}
        <motion.div
          className="volume-content"
          style={{ order: isOdd ? 2 : 1 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true }}
        >
          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-display), 'Playfair Display', serif",
              fontSize: "42px",
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: "20px",
              color: "white",
              opacity: isPublished ? 1 : 0.6,
            }}
          >
            {volume.title}
          </h2>

          {/* Quote */}
          {volume.quote && (
            <div style={{ marginBottom: "8px", position: "relative", paddingLeft: "24px" }}>
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: "-4px",
                  fontSize: "32px",
                  color: "rgba(255, 255, 255, 0.4)",
                  fontFamily: "var(--font-display), 'Playfair Display', serif",
                }}
              >
                &ldquo;
              </span>
              <p
                style={{
                  fontFamily: "var(--font-display), 'Playfair Display', serif",
                  fontSize: "17px",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                  color: "rgba(255, 255, 255, 0.9)",
                  margin: 0,
                }}
              >
                {volume.quote}
              </p>
            </div>
          )}

          {/* Quote Source */}
          {volume.quoteSource && (
            <p
              style={{
                fontFamily: "var(--font-ui), Inter, sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.6)",
                marginBottom: "20px",
                paddingLeft: "24px",
              }}
            >
              &mdash; {volume.quoteSource}
            </p>
          )}

          {/* Hook */}
          {volume.hook && (
            <p
              style={{
                fontFamily: "var(--font-body), 'Source Serif 4', serif",
                fontSize: "17px",
                lineHeight: 1.65,
                color: "rgba(255, 255, 255, 0.85)",
                textAlign: "justify",
                marginBottom: "24px",
              }}
            >
              {volume.hook}
            </p>
          )}

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "16px" }}>
            {isPublished ? (
              <Link
                href={`/legends/${legendSlug}/${volume.slug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "white",
                  color: "#0F2F53",
                  padding: "14px 28px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                  fontFamily: "var(--font-ui), Inter, sans-serif",
                }}
              >
                Interactive Dossier
              </Link>
            ) : (
              <button
                disabled
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "white",
                  padding: "14px 28px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: 600,
                  border: "none",
                  cursor: "not-allowed",
                  opacity: 0.5,
                  fontFamily: "var(--font-ui), Inter, sans-serif",
                }}
              >
                Coming Soon
              </button>
            )}

            {/* PDF Download Card */}
            {volume.pdfStatus === "available" && volume.pdfUrl ? (
              <a
                href={volume.pdfUrl}
                download
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 20px",
                  background: "rgba(255, 255, 255, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "8px",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <div>
                  <div style={{ fontFamily: "var(--font-ui), Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255, 255, 255, 0.7)", textTransform: "uppercase" }}>
                    Volume Dossier
                  </div>
                  <div style={{ fontFamily: "var(--font-ui), Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "white" }}>
                    Download PDF
                  </div>
                </div>
              </a>
            ) : (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 20px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10,9 9,9 8,9" />
                </svg>
                <div>
                  <div style={{ fontFamily: "var(--font-ui), Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255, 255, 255, 0.5)", textTransform: "uppercase" }}>
                    Volume Dossier
                  </div>
                  <div style={{ fontFamily: "var(--font-ui), Inter, sans-serif", fontSize: "11px", color: "rgba(255, 255, 255, 0.5)" }}>
                    Coming Soon
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Reading Time */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "rgba(255, 255, 255, 0.6)",
              fontFamily: "var(--font-ui), Inter, sans-serif",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
            {volume.readingTime} minutes
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default VolumeBlock;
