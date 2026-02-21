'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

interface MarginaliaContextType {
  activeSection: string | null;
  /** Scroll progress within the active section, 0.0 to 1.0 */
  sectionProgress: number;
  /** Index of the currently active marginalia note within the section */
  activeNoteIndex: number;
  /** ID of the currently visible marginalia note */
  activeNoteId: string | null;
}

const MarginaliaContext = createContext<MarginaliaContextType>({
  activeSection: null,
  sectionProgress: 0,
  activeNoteIndex: 0,
  activeNoteId: null,
});

export function useMarginaliaContext() {
  return useContext(MarginaliaContext);
}

interface MarginaliaProviderProps {
  children: ReactNode;
  /** Total marginalia items per section for calculating note index */
  sectionNoteCounts?: Record<string, number>;
  /** Map of section ID -> array of marginalia note IDs, in order */
  sectionNoteIds?: Record<string, string[]>;
}

export function MarginaliaProvider({ children, sectionNoteCounts = {}, sectionNoteIds = {} }: MarginaliaProviderProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [activeNoteIndex, setActiveNoteIndex] = useState(0);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  const updateActiveSection = useCallback(() => {
    const headings = document.querySelectorAll('[data-section]');
    if (headings.length === 0) return;

    const scrollY = window.scrollY + 200;
    const viewportHeight = window.innerHeight;

    let currentId: string | null = null;
    let currentIdx = -1;

    // Walk backwards through headings to find the one we've scrolled past
    for (let i = headings.length - 1; i >= 0; i--) {
      const el = headings[i] as HTMLElement;
      if (el.offsetTop <= scrollY) {
        currentId = el.getAttribute('data-section') || el.id;
        currentIdx = i;
        break;
      }
    }

    // If we haven't scrolled to any heading yet, use "intro"
    if (!currentId) {
      const firstHeading = headings[0] as HTMLElement;
      if (firstHeading.offsetTop > scrollY) {
        currentId = 'intro';
        // Calculate intro progress: from top of page to first heading
        const introEnd = firstHeading.offsetTop;
        const progress = Math.min(1, Math.max(0, scrollY / Math.max(introEnd, 1)));
        setSectionProgress(progress);
      } else {
        currentId = firstHeading.getAttribute('data-section') || firstHeading.id;
        currentIdx = 0;
      }
    }

    // Calculate progress within the section
    if (currentIdx >= 0 && currentId) {
      const currentHeading = headings[currentIdx] as HTMLElement;
      const sectionStart = currentHeading.offsetTop;

      // Section end is either next heading or end of content
      let sectionEnd: number;
      if (currentIdx < headings.length - 1) {
        sectionEnd = (headings[currentIdx + 1] as HTMLElement).offsetTop;
      } else {
        // Last section: estimate end as 2x viewport below the heading
        sectionEnd = sectionStart + viewportHeight * 2;
      }

      const sectionLength = sectionEnd - sectionStart;
      const progress = Math.min(1, Math.max(0, (scrollY - sectionStart) / Math.max(sectionLength, 1)));
      setSectionProgress(progress);
    }

    if (currentId) {
      setActiveSection(currentId);

      // Calculate which note should be active based on scroll progress
      const noteCount = sectionNoteCounts[currentId] || 0;
      if (noteCount > 0) {
        // Use the already-computed sectionProgress for this calculation
        const currentHeadingEl = currentIdx >= 0 ? headings[currentIdx] as HTMLElement : null;
        let progress = 0;

        if (currentId === 'intro') {
          const firstHeading = headings[0] as HTMLElement;
          progress = Math.min(1, Math.max(0, scrollY / Math.max(firstHeading.offsetTop, 1)));
        } else if (currentHeadingEl) {
          const sectionStart = currentHeadingEl.offsetTop;
          let sectionEnd: number;
          if (currentIdx < headings.length - 1) {
            sectionEnd = (headings[currentIdx + 1] as HTMLElement).offsetTop;
          } else {
            sectionEnd = sectionStart + viewportHeight * 2;
          }
          progress = Math.min(1, Math.max(0, (scrollY - sectionStart) / Math.max(sectionEnd - sectionStart, 1)));
        }

        // Divide the section evenly among notes
        const noteIdx = Math.min(noteCount - 1, Math.floor(progress * noteCount));
        setActiveNoteIndex(noteIdx);

        // Set the active note ID
        const noteIds = sectionNoteIds[currentId];
        if (noteIds && noteIds[noteIdx]) {
          setActiveNoteId(noteIds[noteIdx]);
        } else {
          setActiveNoteId(null);
        }
      } else {
        setActiveNoteIndex(0);
        setActiveNoteId(null);
      }
    }
  }, [sectionNoteCounts, sectionNoteIds]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial sync from DOM scroll position
    updateActiveSection();

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [updateActiveSection]);

  return (
    <MarginaliaContext.Provider value={{ activeSection, sectionProgress, activeNoteIndex, activeNoteId }}>
      {children}
    </MarginaliaContext.Provider>
  );
}
