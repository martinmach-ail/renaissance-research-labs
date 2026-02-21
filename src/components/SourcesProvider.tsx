'use client';

import { createContext, useContext } from 'react';

export interface SourceData {
  id: number;
  citation: string;
  dbId?: string;
}

const SourcesContext = createContext<SourceData[]>([]);

export function SourcesProvider({
  sources,
  children,
}: {
  sources: SourceData[];
  children: React.ReactNode;
}) {
  return (
    <SourcesContext.Provider value={sources}>
      {children}
    </SourcesContext.Provider>
  );
}

export function useSources(): SourceData[] {
  return useContext(SourcesContext);
}
