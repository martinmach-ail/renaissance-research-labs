"use client";

import { ReactNode } from "react";

interface PlaybooksSectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  legendName?: string;
}

export function PlaybooksSection({
  children,
  title = "Extracted Frameworks",
  subtitle,
  legendName = "this legend",
}: PlaybooksSectionProps) {
  return (
    <section className="playbooks">
      <header className="playbooks-header">
        <div className="playbooks-label">Portable Playbooks</div>
        <h2 className="playbooks-title">{title}</h2>
        {subtitle && <p className="playbooks-subtitle">{subtitle}</p>}
        {!subtitle && (
          <p className="playbooks-subtitle">
            Methods from {legendName} for conscious application
          </p>
        )}
      </header>

      <div className="playbook-cards">{children}</div>
    </section>
  );
}

export default PlaybooksSection;
