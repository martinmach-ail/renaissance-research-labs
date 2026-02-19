'use client';

import { createContext, useContext, ReactNode } from 'react';

interface Section {
  id: string;
  title: string;
}

interface SectionContextType {
  sections: Section[];
  getSectionId: (title: string) => string;
}

const SectionContext = createContext<SectionContextType>({
  sections: [],
  getSectionId: (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
});

export function useSectionContext() {
  return useContext(SectionContext);
}

interface SectionProviderProps {
  sections: Section[];
  children: ReactNode;
}

export function SectionProvider({ sections, children }: SectionProviderProps) {
  // Build a map from normalized titles to IDs
  const titleToId = new Map<string, string>();
  sections.forEach(section => {
    // Normalize title for matching
    const normalized = section.title.toLowerCase().trim();
    titleToId.set(normalized, section.id);
  });

  const getSectionId = (title: string): string => {
    const normalized = title.toLowerCase().trim();
    // Try exact match first
    if (titleToId.has(normalized)) {
      return titleToId.get(normalized)!;
    }
    // Fallback to slug
    return normalized.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  return (
    <SectionContext.Provider value={{ sections, getSectionId }}>
      {children}
    </SectionContext.Provider>
  );
}
