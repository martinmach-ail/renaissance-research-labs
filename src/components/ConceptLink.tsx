import { ReactNode } from "react";

interface ConceptLinkProps {
  id: string;
  children: ReactNode;
}

export function ConceptLink({ id, children }: ConceptLinkProps) {
  return (
    <span className="concept-link" data-concept-id={id}>
      {children}
    </span>
  );
}
