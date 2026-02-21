'use client';

import { ReactNode } from "react";
import { useMarginaliaContext } from "@/components/volume/MarginaliaProvider";

interface ConceptLinkProps {
  id: string;
  children: ReactNode;
}

export function ConceptLink({ id, children }: ConceptLinkProps) {
  const { activeNoteId } = useMarginaliaContext();

  // Highlight this concept when ANY marginalia note is currently active
  // (The concept is in the reader's current focus area)
  const isActive = activeNoteId !== null;

  return (
    <span
      className={`concept-link ${isActive ? 'concept-link--active' : ''}`}
      data-concept-id={id}
    >
      {children}
    </span>
  );
}
