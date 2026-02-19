'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import peopleData from '@/data/people.json';

interface Person {
  name: string;
  role: string;
  avatar: string;
  quote?: string;
  description: string;
  tags: string[];
}

interface PersonLinkProps {
  id: string;
  children: React.ReactNode;
}

export function PersonLink({ id, children }: PersonLinkProps) {
  const [showCard, setShowCard] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const linkRef = useRef<HTMLSpanElement>(null);

  // Only render portal after mount (client-side)
  useEffect(() => {
    setMounted(true);
  }, []);

  const person = peopleData[id as keyof typeof peopleData] as Person | undefined;

  const handleMouseEnter = () => {
    if (linkRef.current) {
      const rect = linkRef.current.getBoundingClientRect();
      // Position card below the link, centered
      let x = rect.left + rect.width / 2;
      let y = rect.bottom + 8;

      // Keep card within viewport
      const cardWidth = 300;
      const cardHeight = 200;

      if (x - cardWidth / 2 < 10) x = cardWidth / 2 + 10;
      if (x + cardWidth / 2 > window.innerWidth - 10) x = window.innerWidth - cardWidth / 2 - 10;
      if (y + cardHeight > window.innerHeight - 10) y = rect.top - cardHeight - 8;

      setPosition({ x, y });
    }
    setShowCard(true);
  };

  if (!person) {
    console.warn(`Missing person data for: ${id}`);
    return <span className="person-link person-link--missing">{children}</span>;
  }

  // Get relationship type from first tag
  const relationship = person.tags[0]?.toLowerCase() || 'reference';

  const card = showCard && mounted && (
    <div
      className="person-card visible"
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translateX(-50%)',
        zIndex: 9999
      }}
      onMouseEnter={() => setShowCard(true)}
      onMouseLeave={() => setShowCard(false)}
    >
      <div className="person-card-header">
        <div className="person-card-initials">
          {person.avatar}
        </div>
        <div>
          <div className="person-card-name">{person.name}</div>
          <div className="person-card-role">{person.role}</div>
        </div>
      </div>
      <div className={`person-card-relationship rel-${relationship}`}>
        {relationship.toUpperCase()}
      </div>
      {person.quote && (
        <p className="person-card-quote">&ldquo;{person.quote}&rdquo;</p>
      )}
      <p className="person-card-insight">{person.description}</p>
      {person.tags.length > 1 && (
        <div className="person-card-tags">
          {person.tags.slice(1).map(tag => (
            <span key={tag} className="person-card-tag">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <span
        ref={linkRef}
        className="person-link"
        data-person={id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShowCard(false)}
      >
        {children}
      </span>
      {mounted && card && createPortal(card, document.body)}
    </>
  );
}
