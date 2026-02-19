"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface PersonData {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote?: string;
  description: string;
  tags: string[];
}

interface PersonHoverCardProps {
  people: Record<string, PersonData>;
  archetypeColor: string;
}

export function PersonHoverCard({
  people,
  archetypeColor,
}: PersonHoverCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [currentPerson, setCurrentPerson] = useState<PersonData | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const showCard = useCallback(
    (personId: string, rect: DOMRect) => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }

      const person = people[personId];
      if (!person) return;

      setCurrentPerson(person);

      // Position the card
      const cardWidth = 300;
      let left = rect.left + rect.width / 2 - cardWidth / 2;
      let top = rect.bottom + 10;

      // Ensure card stays within viewport
      if (left < 20) left = 20;
      if (left + cardWidth > window.innerWidth - 20) {
        left = window.innerWidth - cardWidth - 20;
      }
      if (top + 350 > window.innerHeight) {
        top = rect.top - 350;
      }

      setPosition({ left, top });
      setIsVisible(true);
    },
    [people]
  );

  const hideCard = useCallback(() => {
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 200);
  }, []);

  const handleCardMouseEnter = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("person-link")) {
        const personId = target.getAttribute("data-person");
        if (personId) {
          showCard(personId, target.getBoundingClientRect());
        }
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("person-link")) {
        hideCard();
      }
    };

    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [showCard, hideCard]);

  if (!currentPerson) return null;

  return (
    <div
      ref={cardRef}
      className={`person-card ${isVisible ? "visible" : ""}`}
      style={
        {
          left: `${position.left}px`,
          top: `${position.top}px`,
          "--archetype-primary": archetypeColor,
          "--archetype-primary-muted": `${archetypeColor}1F`,
          "--archetype-primary-dark": archetypeColor,
        } as React.CSSProperties
      }
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
    >
      <div className="person-card-header">
        <div className="person-card-avatar">{currentPerson.avatar}</div>
        <div className="person-card-info">
          <h4>{currentPerson.name}</h4>
          <span>{currentPerson.role}</span>
        </div>
      </div>

      {currentPerson.quote && (
        <p className="person-card-quote">{currentPerson.quote}</p>
      )}

      <p className="person-card-description">{currentPerson.description}</p>

      <div className="person-card-meta">
        {currentPerson.tags.map((tag) => (
          <span key={tag} className="person-card-tag person-card-tag--relationship">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PersonHoverCard;
