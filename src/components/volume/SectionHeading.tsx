'use client';

import { useSectionContext } from './SectionContext';

interface SectionHeadingProps {
  children: React.ReactNode;
}

export function SectionHeading({ children }: SectionHeadingProps) {
  const { getSectionId } = useSectionContext();
  const title = String(children);
  const id = getSectionId(title);

  return (
    <h2 className="section-title" id={id} data-section={id}>
      {children}
    </h2>
  );
}
