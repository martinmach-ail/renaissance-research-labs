"use client";

import Link from "next/link";

interface VolumeNavigationProps {
  legendSlug: string;
  legendName: string;
  prevVolume?: { slug: string; title: string };
  nextVolume?: { slug: string; title: string };
  isCrossCutting?: boolean;
}

export function VolumeNavigation({
  legendSlug,
  legendName,
  prevVolume: _prevVolume, // eslint-disable-line @typescript-eslint/no-unused-vars
  nextVolume,
  isCrossCutting = false,
}: VolumeNavigationProps) {
  return (
    <section className="volume-navigation">
      <div className="volume-navigation-container">
        {/* Back to Index - Always show */}
        <Link
          href={isCrossCutting ? "/archetypes" : `/legends/${legendSlug}`}
          className="volume-nav-button volume-nav-button--back"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="volume-nav-button-icon"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>{isCrossCutting ? "Back to Cross-Cutting Analyses" : `${legendName} Index`}</span>
        </Link>

        {/* Next Volume - Only show if exists */}
        {nextVolume && (
          <Link
            href={`/legends/${legendSlug}/${nextVolume.slug}`}
            className="volume-nav-button volume-nav-button--next"
          >
            <span>{nextVolume.title}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="volume-nav-button-icon"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </section>
  );
}

export default VolumeNavigation;
