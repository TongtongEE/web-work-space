import Footer from "@/components/Footer";
import Hero from "@/components/homesection/Hero";
import Section2 from "@/components/homesection/Section2";
import Section3 from "@/components/homesection/Section3";

export default function Home() {
  return (
    <>
      <main className="relative overflow-hidden">
        {/* 메인 전용 하단 그라데이션 (#F5F5F5 → #FFFFFF, 하단 1749px) */}
        <div className="main-gradient" aria-hidden="true" />

        {/* 섹션 1 — 히어로 (배경 영상) */}
        <Hero />

        {/* 섹션 2 — AI 기술 & 성과 지표 */}
        <Section2 />

        {/* 섹션 3 — 프로젝트 신뢰도 (성과·로고·CTA) */}
        <Section3 />
      </main>

      {/* 전역 푸터 */}
      <Footer />
    </>
  );
}
