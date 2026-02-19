"use client";
/* eslint-disable @next/next/no-img-element */

const images = Array.from(
  { length: 38 },
  (_, i) => `/images/carousel/Carousel_${i + 1}.png`
);

export default function Carousel() {
  return (
    <div
      className="w-full overflow-hidden mt-8 py-8 group"
      style={{ position: "relative" }}
    >
      <div
        className="inline-flex w-max animate-scroll group-hover:[animation-play-state:paused]"
        style={{ willChange: "transform" }}
      >
        {[...images, ...images].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Carousel image ${(index % 38) + 1}`}
            width={150}
            height={150}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              flexShrink: 0,
              margin: "0 4px",
              opacity: 0.85,
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0.85";
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        ))}
      </div>
    </div>
  );
}
