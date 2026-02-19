import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable MDX page support
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
