import Link from "next/link";
import Image from "next/image";

export interface FolderCardProps {
  href: string;
  title: string;
  subtitle: string;
  description: string;
  tabLabel: string;
  tabNumber: string;
  color: "legends" | "library" | "archetypes";
  image: string;
}

const colorMap = {
  legends: "var(--legends-blue)",
  library: "var(--library-cyan)",
  archetypes: "var(--archetypes-ice)",
};

export default function FolderCard({
  href,
  title,
  subtitle,
  description,
  tabLabel,
  tabNumber,
  color,
  image,
}: FolderCardProps) {
  const stripColor = colorMap[color];

  return (
    <Link
      href={href}
      className="folder relative cursor-pointer no-underline transition-transform duration-300 hover:-translate-y-1.5"
      style={{
        width: "360px",
        height: "460px",
      }}
    >
      {/* Main Folder Body */}
      <div
        className="folder-body absolute top-0 left-0 bottom-0 transition-shadow duration-300"
        style={{
          right: "30px",
          background: "var(--folder-cream)",
          borderRadius: "3px",
          boxShadow:
            "0 8px 24px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        {/* Folder Content */}
        <div
          className="flex flex-col h-full"
          style={{ padding: "26px 24px" }}
        >
          {/* Title */}
          <h3
            className="font-display font-bold"
            style={{
              fontSize: "24px",
              letterSpacing: "-0.3px",
              marginBottom: "4px",
              color: "var(--text-black)",
            }}
          >
            {title}
          </h3>

          {/* Subtitle */}
          <span
            className="font-mono uppercase"
            style={{
              fontSize: "9px",
              letterSpacing: "1px",
              color: "var(--text-muted)",
            }}
          >
            {subtitle}
          </span>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Bottom Content */}
          <div className="flex flex-col">
            {/* Blueprint Illustration */}
            <div
              className="flex items-center justify-center"
              style={{
                width: "80px",
                height: "80px",
                marginBottom: "16px",
              }}
            >
              <Image
                src={image}
                alt={`${title} illustration`}
                width={80}
                height={80}
                style={{
                  objectFit: "contain",
                }}
              />
            </div>

            {/* Description */}
            <p
              className="font-body"
              style={{
                fontSize: "13px",
                lineHeight: 1.6,
                color: "var(--text-secondary)",
                textAlign: "justify",
                hyphens: "auto",
                minHeight: "105px",
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Color Indent Strip */}
      <div
        className="absolute top-0 overflow-hidden"
        style={{
          right: "30px",
          width: "9px",
          height: "155px",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundColor: stripColor,
            borderRadius: "0 0 0 3px",
          }}
        />
      </div>

      {/* Right Side Tab */}
      <div
        className="absolute top-0 right-0 z-10"
        style={{
          width: "30px",
          height: "155px",
        }}
      >
        {/* Tab SVG Shape */}
        <svg
          viewBox="0 0 30 155"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.04))" }}
        >
          <path
            d="M 0 0
               L 19 0
               Q 30 0, 30 11
               L 30 128
               Q 30 139, 19 139
               L 11 139
               Q 0 139, 0 150
               L 0 155
               L 0 0 Z"
            fill="#F9F8F6"
          />
        </svg>

        {/* Tab Text */}
        <div
          className="absolute top-0 right-0 flex flex-col justify-between items-center"
          style={{
            width: "30px",
            height: "155px",
            padding: "14px 0 20px",
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: "8px",
              fontWeight: 400,
              letterSpacing: "0.3px",
              color: "var(--text-black)",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            {tabLabel}
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: "8px",
              fontWeight: 400,
              color: "var(--text-black)",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            {tabNumber}
          </span>
        </div>
      </div>
    </Link>
  );
}
