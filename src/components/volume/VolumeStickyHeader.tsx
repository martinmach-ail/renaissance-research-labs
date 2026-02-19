"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

interface VolumeStickyHeaderProps {
  legendName: string;
  legendSlug: string;
  archetypeColor: string;
}

export function VolumeStickyHeader({
  legendName,
  legendSlug,
  archetypeColor,
}: VolumeStickyHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.scrollY;
    const progressPercent = Math.min((scrollTop / documentHeight) * 100, 100);

    setProgress(progressPercent);

    // Show header after scrolling past cover
    const cover = document.getElementById("cover");
    if (cover) {
      const coverHeight = cover.offsetHeight;
      setIsVisible(scrollTop > coverHeight - 100);
    }
  }, []);

  useEffect(() => {
    updateProgress();
    window.addEventListener("scroll", updateProgress);
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [updateProgress]);

  return (
    <>
      {/* Progress Bar */}
      <div
        className="progress-bar"
        style={
          {
            width: `${progress}%`,
            "--archetype-primary": archetypeColor,
            "--archetype-primary-light": archetypeColor,
          } as React.CSSProperties
        }
      />

      {/* Sticky Header */}
      <header
        className={`volume-sticky-header ${isVisible ? "visible" : ""}`}
        style={
          {
            "--archetype-primary": archetypeColor,
          } as React.CSSProperties
        }
      >
        <Link href={`/legends/${legendSlug}`} className="header-back">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to {legendName}
        </Link>

        <span className="header-title">{legendName}</span>

        <div className="header-progress">
          <span>{Math.round(progress)}%</span>
          <div className="header-progress-bar">
            <div
              className="header-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>
    </>
  );
}

export default VolumeStickyHeader;
