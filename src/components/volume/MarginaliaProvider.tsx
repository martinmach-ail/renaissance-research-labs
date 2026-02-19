'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface MarginaliaContextType {
  activeSection: string | null;
}

const MarginaliaContext = createContext<MarginaliaContextType>({ activeSection: null });

export function useMarginaliaContext() {
  return useContext(MarginaliaContext);
}

interface MarginaliaProviderProps {
  children: ReactNode;
}

export function MarginaliaProvider({ children }: MarginaliaProviderProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    // Find all sections with IDs or data-section attributes
    const sections = document.querySelectorAll('[id][data-section], [data-section]');

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        let mostVisibleId: string | null = null;
        let highestRatio = 0;

        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
            const id = entry.target.getAttribute('data-section') || entry.target.id;
            if (id) {
              mostVisibleId = id;
              highestRatio = entry.intersectionRatio;
            }
          }
        });

        if (mostVisibleId) {
          setActiveSection(mostVisibleId);
        }
      },
      {
        threshold: [0.1, 0.2, 0.3, 0.5],
        rootMargin: '-80px 0px -40% 0px'
      }
    );

    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <MarginaliaContext.Provider value={{ activeSection }}>
      {children}
    </MarginaliaContext.Provider>
  );
}
