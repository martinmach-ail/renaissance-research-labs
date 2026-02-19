import Image from "next/image";

const images = Array.from(
  { length: 38 },
  (_, i) => `/images/carousel/Carousel_${i + 1}.png`
);

export default function Carousel() {
  return (
    <div className="w-full overflow-hidden mt-8 py-8 group">
      <div className="inline-flex w-max animate-scroll group-hover:[animation-play-state:paused]">
        {[...images, ...images].map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Carousel image ${(index % 38) + 1}`}
            width={150}
            height={150}
            className="mx-1 flex-none opacity-[0.85] hover:opacity-100 hover:scale-105 transition-all duration-300 object-cover"
          />
        ))}
      </div>
    </div>
  );
}
