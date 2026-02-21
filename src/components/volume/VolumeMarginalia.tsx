"use client";

import { useEffect, useState, useCallback } from "react";

interface MarginNote {
  id: string;
  type: "person" | "motif" | "concept";
  title: string;
  subtitle?: string;
  quote?: string;
  text: string;
  tags?: string[];
  sections: string[]; // Which sections this note appears in
}

interface VolumeMarginaliaProps {
  notes: MarginNote[];
  archetypeColor: string;
}

export function VolumeMarginalia({
  notes,
  archetypeColor,
}: VolumeMarginaliaProps) {
  const [visibleNotes, setVisibleNotes] = useState<Set<string>>(new Set());

  const updateVisibleNotes = useCallback(() => {
    const scrollPosition = window.scrollY + 200;
    const newVisible = new Set<string>();

    // Find which section we're currently in
    const sections = document.querySelectorAll("[data-section]");
    let currentSectionId: string | null = null;

    sections.forEach((section) => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSectionId = section.getAttribute("data-section");
      }
    });

    // Show notes that match the current section
    if (currentSectionId) {
      notes.forEach((note) => {
        if (note.sections.includes(currentSectionId!)) {
          newVisible.add(note.id);
        }
      });
    }

    setVisibleNotes(newVisible);
  }, [notes]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial sync from DOM scroll position
    updateVisibleNotes();
    window.addEventListener("scroll", updateVisibleNotes);
    return () => window.removeEventListener("scroll", updateVisibleNotes);
  }, [updateVisibleNotes]);

  return (
    <aside
      className="volume-marginalia"
      id="marginalia"
      style={
        {
          "--archetype-primary": archetypeColor,
          "--archetype-primary-muted": `${archetypeColor}1F`,
          "--archetype-primary-dark": archetypeColor,
        } as React.CSSProperties
      }
    >
      <div className="marginalia-container">
        <div className="marginalia-header">Contextual Notes</div>
        <p className="marginalia-description">
          Annotations appear here as you scroll through the dossier. Hover over
          highlighted names for detailed cards.
        </p>

        {/* Render notes based on type */}
        {notes.map((note) => {
          const isVisible = visibleNotes.has(note.id);

          if (note.type === "motif") {
            return (
              <div
                key={note.id}
                id={note.id}
                className={`margin-motif ${isVisible ? "visible" : ""}`}
              >
                <div className="margin-motif-label">Motif</div>
                <div className="margin-motif-title">{note.title}</div>
                <div className="margin-motif-text">{note.text}</div>
              </div>
            );
          }

          return (
            <div
              key={note.id}
              id={note.id}
              className={`margin-note margin-note--${note.type} ${isVisible ? "visible" : ""}`}
            >
              <div className="margin-note-label">
                {note.type.charAt(0).toUpperCase() + note.type.slice(1)}
              </div>
              <div className="margin-note-title">{note.title}</div>
              {note.subtitle && (
                <div className="margin-note-subtitle">{note.subtitle}</div>
              )}
              {note.quote && (
                <div className="margin-note-quote">&ldquo;{note.quote}&rdquo;</div>
              )}
              <div className="margin-note-text">{note.text}</div>
              {note.tags && note.tags.length > 0 && (
                <div className="margin-note-tags">
                  {note.tags.map((tag, idx) => (
                    <span
                      key={tag}
                      className={`margin-note-tag ${idx === 0 ? "margin-note-tag--gold" : ""}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default VolumeMarginalia;
