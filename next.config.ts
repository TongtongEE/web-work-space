import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages 정적 배포 필수 설정
  output: 'export',

  // 개발 모드에서 LAN IP(실물 아이폰 등)로 dev 리소스(HMR·청크) 접근 허용.
  allowedDevOrigins: ["172.30.1.9"],
  images: {
    // GitHub Pages 환경에서는 Next.js 기본 서버 이미지 최적화를 사용할 수 없어 필요
    unoptimized: true,
    // 인스타그램 CDN 썸네일 (포트폴리오 피드)
    remotePatterns: [
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
  },
};

export default nextConfig;
