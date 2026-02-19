"use client";

import Image from "next/image";
import Link from "next/link";

interface VolumeCoverProps {
  legendName: string;
  legendSlug: string;
  volumeTitle?: string;
  volumeSubtitle: string;
  dates: string;
  industry: string;
  readingTime: number;
  archetype: string;
  secondaryArchetypes?: string[];
  disciplines?: string[];
  coverImage: string;
  quote?: string;
  quoteAttribution?: string;
  archetypeColor: string;
  pdfUrl?: string;
}

export function VolumeCover({
  legendName,
  legendSlug,
  volumeTitle: _volumeTitle, // eslint-disable-line @typescript-eslint/no-unused-vars
  volumeSubtitle,
  dates,
  industry,
  readingTime,
  archetype,
  secondaryArchetypes = [],
  disciplines = [],
  coverImage,
  quote,
  quoteAttribution,
  archetypeColor,
  pdfUrl,
}: VolumeCoverProps) {
  return (
    <section
      className="volume-cover"
      id="cover"
      style={
        {
          "--archetype-primary": archetypeColor,
          "--archetype-primary-light": archetypeColor,
          "--archetype-primary-dark": archetypeColor,
          "--archetype-primary-muted": `${archetypeColor}1F`,
        } as React.CSSProperties
      }
    >
      {/* Back to Legend Index Button */}
      <Link
        href={`/legends/${legendSlug}`}
        className="cover-back-button"
        style={{
          position: "absolute",
          top: "80px",
          left: "48px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "var(--font-ui)",
          fontSize: "13px",
          fontWeight: 500,
          color: "rgba(255, 255, 255, 0.7)",
          textDecoration: "none",
          zIndex: 10,
          transition: "color 0.15s ease",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to {legendName} Index
      </Link>
      <div className="cover-content">
        {/* Illustration */}
        <div className="cover-illustration">
          <div className="cover-illustration-border" />
          <Image
            src={coverImage}
            alt={legendName}
            width={380}
            height={380}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        {/* Info */}
        <div className="cover-info">
          <div className="cover-label">Legend Dossier</div>
          <h1 className="cover-title">{legendName}</h1>
          <p className="cover-subtitle">{volumeSubtitle}</p>

          <div className="cover-divider" />

          <div className="cover-meta">
            <div className="cover-meta-item">
              <span className="cover-meta-label">Lived</span>
              <span className="cover-meta-value">{dates}</span>
            </div>
            <div className="cover-meta-item">
              <span className="cover-meta-label">Industry</span>
              <span className="cover-meta-value">{industry}</span>
            </div>
            <div className="cover-meta-item">
              <span className="cover-meta-label">Reading Time</span>
              <span className="cover-meta-value">~{readingTime} minutes</span>
            </div>
          </div>

          <div className="cover-tags">
            <span className="cover-tag cover-tag--primary">{archetype}</span>
            {secondaryArchetypes.map((arch, idx) => (
              <span
                key={arch}
                className={`cover-tag ${idx === 0 ? "cover-tag--secondary" : ""}`}
              >
                {arch}
              </span>
            ))}
            {disciplines.map((disc) => (
              <span key={disc} className="cover-tag">
                {disc}
              </span>
            ))}
          </div>

          {/* PDF Download Button */}
          {pdfUrl && (
            <a
              href={pdfUrl}
              download
              className="cover-pdf-download"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "20px",
                padding: "12px 24px",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "8px",
                color: "white",
                textDecoration: "none",
                fontFamily: "var(--font-ui)",
                fontSize: "14px",
                fontWeight: 600,
                transition: "all 0.15s ease",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Volume PDF
            </a>
          )}

          {quote && (
            <div className="cover-quote">
              <p className="cover-quote-text">&ldquo;{quote}&rdquo;</p>
              {quoteAttribution && (
                <p className="cover-quote-attribution">{quoteAttribution}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="cover-scroll-hint">
        <span>Scroll to begin</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

export default VolumeCover;
