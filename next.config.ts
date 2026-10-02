import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // lib/admin-store.ts가 런타임에 data/vessels.json을 readFileSync → 서버리스 번들에 포함
  outputFileTracingIncludes: {
    "/**": ["./data/vessels.json"],
  },
  // public/은 CDN이 서빙 → 서버리스 번들에서 제외 (함수 50MB 제한)
  outputFileTracingExcludes: {
    "/**": ["./public/**/*"],
  },
};

export default nextConfig;
