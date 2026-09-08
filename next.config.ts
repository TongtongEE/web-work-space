import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages 정적 배포 필수 설정
  output: 'export',

  // 개발 모드에서 LAN IP(실물 아이폰 등)로 dev 리소스(HMR·청크) 접근 허용.
  // ※ 여기 없는 주소로 접속하면 JS/CSS 청크가 403 으로 막혀, 화면은 뜨는데
  //    콘텐츠가 안 보이고(Reveal 이 opacity-0 상태로 멈춤) 버튼도 안 눌린다.
  //    공유기·네트워크가 바뀌면 IP도 바뀌므로 사설 IP 대역을 통째로 열어둔다.
  //    (development 전용 설정 — 정적 배포 결과물에는 영향 없음)
  allowedDevOrigins: [
    "10.*.*.*",
    "172.*.*.*",
    "192.168.*.*",
  ],
  images: {
    // GitHub Pages 환경에서는 Next.js 기본 서버 이미지 최적화를 사용할 수 없어 필요
    unoptimized: true,
    // 포트폴리오 피드 이미지는 빌드 때 public/insta/ 로 내려받아 사이트에 내장하므로
    // (scripts/fetch-instagram.mjs) 외부 호스트 허용(remotePatterns)이 필요 없다.
  },
};

export default nextConfig;
