import { ReactNode } from "react";

interface InterludeProps {
  label?: string;
  title?: string;
  children: ReactNode;
}

export function Interlude({ label, title, children }: InterludeProps) {
  return (
    <aside className="interlude">
      {label && <span className="interlude-label">{label}</span>}
      {title && <h4 className="interlude-title">{title}</h4>}
      <div className="interlude-content">
        {children}
      </div>
    </aside>
  );
}
