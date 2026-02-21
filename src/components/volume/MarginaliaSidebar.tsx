'use client';

import { useEffect, useRef, useState } from 'react';
import { useMarginaliaContext } from './MarginaliaProvider';
import { getMarginaliaColor, getDisplayName } from '@/lib/taxonomy';

export interface MarginaliaItem {
  id: string;
  section: string;
  type: string;
  title: string;
  content: string;
}

interface MarginaliaSidebarProps {
  items: MarginaliaItem[];
  archetypeColor?: string;
}

export function MarginaliaSidebar({ items, archetypeColor = '#CA8A04' }: MarginaliaSidebarProps) {
  const { activeSection, activeNoteIndex } = useMarginaliaContext();
  const [displayedNote, setDisplayedNote] = useState<MarginaliaItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prevNoteRef = useRef<string | null>(null);

  // Filter items for the active section
  const activeItems = items.filter(item => item.section === activeSection);

  // Get the single note to show
  const currentNote = activeItems[activeNoteIndex] || null;

  // Animate transitions between notes
  useEffect(() => {
    const noteId = currentNote?.id || null;

    if (noteId !== prevNoteRef.current) {
      // Fade out current note
      // eslint-disable-next-line react-hooks/set-state-in-effect -- transition animation requires sequential setState
      setIsVisible(false);

      // After fade-out, swap note and fade in
      const timer = setTimeout(() => {
        setDisplayedNote(currentNote);
        prevNoteRef.current = noteId;

        // Small delay before fade-in for visual clarity
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      }, 200); // fade-out duration

      return () => clearTimeout(timer);
    }
  }, [currentNote]);

  // Derive a short display title from the content
  const getShortTitle = (item: MarginaliaItem): string | null => {
    const titleClean = item.title.replace(/\.{3}$/, '').trim();
    const contentStart = item.content.substring(0, titleClean.length);
    if (contentStart.toLowerCase() === titleClean.toLowerCase()) {
      return null;
    }
    return item.title;
  };

  // Truncate long content for the sidebar
  const truncateContent = (text: string, maxLen: number = 280): string => {
    if (text.length <= maxLen) return text;
    const truncated = text.substring(0, maxLen);
    const lastSpace = truncated.lastIndexOf(' ');
    return truncated.substring(0, lastSpace) + '...';
  };

  return (
    <aside
      className="volume-marginalia"
      style={{ '--archetype-primary': archetypeColor } as React.CSSProperties}
    >
      <div className="marginalia-container">
        <div className="marginalia-header">Marginalia</div>

        {!displayedNote ? (
          <div className="marginalia-empty">
            <p className="marginalia-empty-text">
              Scroll to see contextual notes appear as you read.
            </p>
          </div>
        ) : (
          (() => {
            const shortTitle = getShortTitle(displayedNote);
            const noteColor = getMarginaliaColor(displayedNote.type);
            // Count position within section
            const sectionItems = items.filter(item => item.section === displayedNote.section);
            const notePos = sectionItems.findIndex(item => item.id === displayedNote.id);
            const totalInSection = sectionItems.length;

            return (
              <div
                key={displayedNote.id}
                className={`margin-note ${isVisible ? 'visible' : ''}`}
                style={{ '--note-color': noteColor } as React.CSSProperties}
              >
                {/* Progress indicator */}
                {totalInSection > 1 && (
                  <div className="margin-note-progress">
                    {sectionItems.map((_, idx) => (
                      <span
                        key={idx}
                        className={`margin-note-pip ${idx === notePos ? 'active' : ''}`}
                        style={idx === notePos ? { background: noteColor } : undefined}
                      />
                    ))}
                  </div>
                )}

                <div className="margin-note-label" style={{ color: noteColor }}>
                  <span className="margin-note-dot" style={{ background: noteColor }} />
                  {getDisplayName(displayedNote.type)}
                </div>
                {shortTitle && (
                  <div className="margin-note-title">{shortTitle}</div>
                )}
                <div className="margin-note-text">
                  {truncateContent(displayedNote.content)}
                </div>
              </div>
            );
          })()
        )}
      </div>
    </aside>
  );
}

export default MarginaliaSidebar;
