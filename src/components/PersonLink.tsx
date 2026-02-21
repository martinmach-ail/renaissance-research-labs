'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const linkRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount flag for SSR hydration
    setMounted(true);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const person = peopleData[id as keyof typeof peopleData] as Person | undefined;

  const show = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (linkRef.current) {
      const rect = linkRef.current.getBoundingClientRect();
      let x = rect.left + rect.width / 2;
      let y = rect.bottom + 8;

      const cardW = 320;
      const cardH = 220;
      if (x - cardW / 2 < 12) x = cardW / 2 + 12;
      if (x + cardW / 2 > window.innerWidth - 12) x = window.innerWidth - cardW / 2 - 12;
      if (y + cardH > window.innerHeight - 12) y = rect.top - cardH - 8;

      setPos({ x, y });
    }
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    timerRef.current = setTimeout(() => setVisible(false), 400);
  }, []);

  const keepOpen = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  if (!person) {
    return <span className="person-link person-link--missing">{children}</span>;
  }

  const relationship = person.tags[0]?.toLowerCase() || 'reference';

  const card = visible && mounted ? (
    <div
      className="person-card"
      style={{
        position: 'fixed',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translateX(-50%)',
        zIndex: 9999,
      }}
      onMouseEnter={keepOpen}
      onMouseLeave={hide}
    >
      <div className="person-card-header">
        <div className="person-card-initials">{person.avatar}</div>
        <div>
          <div className="person-card-name">{person.name}</div>
          <div className="person-card-role">{person.role}</div>
        </div>
      </div>
      <div className={`person-card-relationship rel-${relationship}`}>{relationship}</div>
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
  ) : null;

  return (
    <>
      <span
        ref={linkRef}
        className="person-link"
        data-person={id}
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        {children}
      </span>
      {mounted && card && createPortal(card, document.body)}
    </>
  );
}
