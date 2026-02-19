"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  colorVar: string;
}

const navItems: NavItem[] = [
  { href: "/legends", label: "LEGENDS", colorVar: "var(--legends-blue)" },
  { href: "/library", label: "LIBRARY", colorVar: "var(--library-cyan)" },
  { href: "/archetypes", label: "ARCHETYPES", colorVar: "var(--archetypes-ice)" },
];

export default function NavHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  return (
    <>
      {/* Desktop Navigation - 4 Equal Columns */}
      <nav
        className="fixed top-0 left-0 right-0 z-[1000] hidden md:grid"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          borderBottom: "2px solid var(--nav-border)",
        }}
      >
        {/* Column 1: Home/Logo */}
        <Link
          href="/"
          className="flex items-center justify-between transition-colors duration-200"
          style={{
            padding: "18px 28px",
            backgroundColor: "var(--page-white)",
            borderRight: "2px solid var(--nav-border)",
          }}
        >
          <div className="flex items-center gap-3.5">
            <span
              className="font-display text-lg font-bold tracking-wider"
              style={{ color: "var(--text-black)" }}
            >
              RRL<sup className="text-[8px] align-super">&trade;</sup>
            </span>
            <div
              className={`w-3 h-3 rounded-full ${pathname === "/" ? "animate-pulse-glow" : ""}`}
              style={{
                backgroundColor:
                  pathname === "/" ? "var(--blueprint-glow)" : "transparent",
                border:
                  pathname === "/"
                    ? "none"
                    : "1.5px solid var(--blueprint-glow)",
                boxShadow:
                  pathname === "/"
                    ? "0 0 8px var(--blueprint-glow), 0 0 16px var(--blueprint-glow), 0 0 24px rgba(26, 95, 140, 0.4)"
                    : "0 0 4px var(--blueprint-glow), 0 0 8px rgba(26, 95, 140, 0.3)",
              }}
            />
          </div>
        </Link>

        {/* Navigation Columns 2-4 */}
        {navItems.map((item, index) => {
          const isHovered = hoveredItem === item.href;
          const active = isActive(item.href);
          const showFill = isHovered || active;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between transition-colors duration-200"
              style={{
                padding: "18px 28px",
                backgroundColor: isHovered ? "#E4E4E7" : "var(--nav-bg)",
                borderRight:
                  index < navItems.length - 1
                    ? "2px solid var(--nav-border)"
                    : "none",
              }}
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span
                className="font-mono text-xs uppercase tracking-wider"
                style={{ color: "var(--text-black)" }}
              >
                {item.label}
              </span>
              <div
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: showFill
                    ? item.colorVar
                    : "var(--page-white)",
                  border: showFill ? "none" : "1.5px solid #ccc",
                  boxShadow: active
                    ? `0 0 8px ${item.colorVar}, 0 0 16px ${item.colorVar}, 0 0 24px ${item.colorVar}`
                    : showFill
                      ? `0 0 6px ${item.colorVar}, 0 0 12px ${item.colorVar}`
                      : "none",
                  animation: active
                    ? "pulse-glow-nav 2s ease-in-out infinite"
                    : "none",
                }}
              />
            </Link>
          );
        })}
      </nav>

      {/* Mobile Navigation */}
      <header
        className="fixed top-0 left-0 right-0 z-[1000] md:hidden h-16"
        style={{
          backgroundColor: "var(--page-white)",
          borderBottom: "2px solid var(--nav-border)",
        }}
      >
        <div className="h-full flex items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <span
              className="font-display text-lg font-bold tracking-wider"
              style={{ color: "var(--text-black)" }}
            >
              RRL<sup className="text-[8px] align-super">&trade;</sup>
            </span>
            <div
              className="w-3 h-3 rounded-full animate-pulse-glow"
              style={{
                backgroundColor: "var(--blueprint-glow)",
                boxShadow:
                  "0 0 8px var(--blueprint-glow), 0 0 16px var(--blueprint-glow), 0 0 24px rgba(26, 95, 140, 0.4)",
              }}
            />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center w-12 h-12 -mr-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" style={{ color: "var(--text-black)" }} />
            ) : (
              <Menu
                className="w-6 h-6"
                style={{ color: "var(--text-black)" }}
              />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[999] md:hidden"
          style={{
            paddingTop: "64px",
            backgroundColor: "var(--page-white)",
          }}
        >
          <nav className="flex flex-col">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-6 h-14 transition-colors duration-200"
                  style={{
                    backgroundColor: "var(--nav-bg)",
                    borderBottom: "2px solid var(--nav-border)",
                  }}
                >
                  <span
                    className="font-mono text-xs uppercase tracking-wider"
                    style={{ color: "var(--text-black)" }}
                  >
                    {item.label}
                  </span>
                  <div
                    className="w-3 h-3 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: active
                        ? item.colorVar
                        : "var(--page-white)",
                      border: active ? "none" : "1.5px solid #ccc",
                      boxShadow: active
                        ? `0 0 6px ${item.colorVar}, 0 0 12px ${item.colorVar}`
                        : "none",
                    }}
                  />
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
