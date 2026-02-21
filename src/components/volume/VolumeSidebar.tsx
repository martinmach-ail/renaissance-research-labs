"use client";

import { useEffect, useState, useCallback } from "react";

interface TocItem {
  id: string;
  title: string;
}

interface VolumeSidebarProps {
  tocItems: TocItem[];
  archetype: string;
  secondaryArchetypes?: string[];
  disciplines?: string[];
  motifs?: string[];
  archetypeColor: string;
}

export function VolumeSidebar({
  tocItems,
  archetype,
  secondaryArchetypes = [],
  disciplines = [],
  motifs = [],
  archetypeColor,
}: VolumeSidebarProps) {
  const [activeSection, setActiveSection] = useState<string>("");

  const updateActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY + 200;

    for (let i = tocItems.length - 1; i >= 0; i--) {
      const section = document.getElementById(tocItems[i].id);
      if (section && scrollPosition >= section.offsetTop) {
        setActiveSection(tocItems[i].id);
        return;
      }
    }

    if (tocItems.length > 0) {
      setActiveSection(tocItems[0].id);
    }
  }, [tocItems]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial sync from DOM scroll position
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection);
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [updateActiveSection]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <aside
      className="volume-sidebar"
      style={
        {
          "--archetype-primary": archetypeColor,
          "--archetype-primary-muted": `${archetypeColor}1F`,
        } as React.CSSProperties
      }
    >
      {/* Table of Contents */}
      <div className="sidebar-section">
        <div className="sidebar-label">In This Dossier</div>
        <ul className="toc-list">
          {tocItems.map((item) => (
            <li key={item.id} className="toc-item">
              <a
                href={`#${item.id}`}
                className={`toc-link ${activeSection === item.id ? "active" : ""}`}
                onClick={(e) => handleClick(e, item.id)}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Archetypes */}
      <div className="sidebar-section">
        <div className="sidebar-label">Archetypes</div>
        <div className="sidebar-tags">
          <span className="sidebar-tag sidebar-tag--archetype">{archetype}</span>
          {secondaryArchetypes.map((arch) => (
            <span key={arch} className="sidebar-tag">
              {arch}
            </span>
          ))}
        </div>
      </div>

      {/* Disciplines */}
      {disciplines.length > 0 && (
        <div className="sidebar-section">
          <div className="sidebar-label">Disciplines</div>
          <div className="sidebar-tags">
            {disciplines.map((disc) => (
              <span key={disc} className="sidebar-tag">
                {disc}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Key Motifs */}
      {motifs.length > 0 && (
        <div className="sidebar-section">
          <div className="sidebar-label">Key Motifs</div>
          <div className="sidebar-tags">
            {motifs.map((motif) => (
              <span key={motif} className="sidebar-tag">
                {motif}
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

export default VolumeSidebar;
