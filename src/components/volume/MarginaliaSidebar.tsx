'use client';

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
  const { activeSection } = useMarginaliaContext();

  // Filter items to show only those matching the active section
  const activeItems = items.filter(item => item.section === activeSection);

  return (
    <aside
      className="volume-marginalia"
      style={{ '--archetype-primary': archetypeColor } as React.CSSProperties}
    >
      <div className="marginalia-container">
        <div className="marginalia-header">Contextual Notes</div>
        <p className="marginalia-description">
          Annotations appear here as you scroll through the dossier. Hover over
          highlighted names for detailed cards.
        </p>

        {activeItems.length === 0 ? (
          <div className="marginalia-empty">
            <p className="marginalia-empty-text">
              Scroll to see contextual notes for each section.
            </p>
          </div>
        ) : (
          activeItems.map(item => (
            <div
              key={item.id}
              className="margin-note visible"
              style={{ '--note-color': getMarginaliaColor(item.type) } as React.CSSProperties}
            >
              <div className="margin-note-label" style={{ color: getMarginaliaColor(item.type) }}>
                <span className="margin-note-dot" style={{ background: getMarginaliaColor(item.type) }} />
                {getDisplayName(item.type)}
              </div>
              <div className="margin-note-title">{item.title}</div>
              <div className="margin-note-text">{item.content}</div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}

export default MarginaliaSidebar;
