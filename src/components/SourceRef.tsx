'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface SourceRefProps {
  id: number;
  sources?: Array<{
    id: number;
    citation: string;
    dbId?: string;
  }>;
}

export function SourceRef({ id, sources = [] }: SourceRefProps) {
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

  const source = sources.find((s) => s.id === id);

  const show = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (linkRef.current) {
      const rect = linkRef.current.getBoundingClientRect();
      let x = rect.left + rect.width / 2;
      let y = rect.bottom + 6;

      const cardW = 360;
      const cardH = 80;
      if (x - cardW / 2 < 12) x = cardW / 2 + 12;
      if (x + cardW / 2 > window.innerWidth - 12) x = window.innerWidth - cardW / 2 - 12;
      if (y + cardH > window.innerHeight - 12) y = rect.top - cardH - 6;

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

  const card = visible && mounted ? (
    <div
      className="source-ref-card"
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
      <div className="source-ref-card-label">Source</div>
      <div className="source-ref-card-citation">
        {source?.citation || `Source ${id}`}
      </div>
    </div>
  ) : null;

  return (
    <>
      <span
        ref={linkRef}
        className="source-ref"
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        <sup>{id}</sup>
      </span>
      {mounted && card && createPortal(card, document.body)}
    </>
  );
}
