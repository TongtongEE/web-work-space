import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 개발 모드에서 LAN IP(실물 아이폰 등)로 dev 리소스(HMR·청크) 접근 허용.
  // 없으면 폰에서 dev 모드 JS가 차단돼 흰 화면·하이드레이션 실패가 남.
  allowedDevOrigins: ["172.30.1.9"],
  images: {
    // 인스타그램 CDN 썸네일 (포트폴리오 피드)
    remotePatterns: [
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
  },
};

export default nextConfig;
