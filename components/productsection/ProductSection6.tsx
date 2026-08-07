import ArrowButton from "@/components/ArrowButton";
import LangImage from "@/components/LangImage";
import Reveal from "@/components/Reveal";
import ProductAiBlock from "@/components/productsection/ProductAiBlock";
import { CONTACT_URL } from "@/lib/links";
import { T } from "@/lib/i18n";

/* ============================================================
   PRODUCT — SECTION 6 : POST ME AI
   1) postme_ai 배너 fade-in + 글로우(AI 느낌)
   2) 각 블록: before → ai_effect → after 순으로 오른쪽에서 단계 등장
      · 결과물(after)은 "생성되는" 효과(generate: 흐릿+확대 → 선명)
   3) 하단 버튼 아래 → 위
   ============================================================ */
const GUTTER = "px-6 sm:px-10 lg:px-20 xl:px-28";

const BLOCKS = [
  {
    title: { ko: "AI 피사체 오토 트래킹", en: "AI Subject Auto-Tracking" },
    desc: {
      ko: "AI가 피사체를 실시간으로 인식하여 추적합니다. 어떤 앵글에서도 최적의 구도를 잡아 완성도 높은 사진을 완성합니다.",
      en: "AI recognizes and tracks the subject in real time.\nIt locks the ideal composition from any angle for a highly polished photo.",
    },
    before: "/images/product/auto_tracking_before.jpg",
    beforeRatio: "375 / 400",
    afters: [
      {
        src: "/images/product/auto_tracking_after.jpg",
        w: 763,
        h: 683,
        label: { ko: "", en: "" },
      },
    ],
  },
  {
    title: { ko: "AI 딥러닝 생성 & 보정", en: "AI Deep-Learning\nGeneration & Retouch" },
    desc: {
      ko: "사전 설정된 프롬프트에 맞춰 다양한 배경과 컨셉 이미지를 즉석 생성합니다. 단 한 장의 촬영으로 고품격 프로필과 맞춤형 화보를 완성하여 차별화된 경험을 선사합니다.",
      en: "It instantly generates diverse backgrounds and concept images from preset prompts. A single shot yields premium profiles and tailored editorials for a truly distinct experience.",
    },
    before: "/images/product/photo_before.jpg",
    beforeRatio: "375 / 400",
    afters: [
      {
        src: "/images/product/photo_after_1.jpg",
        w: 366,
        h: 548,
        label: { ko: "오차 없는 컨셉 프로젝트 생성", en: "Flawless concept generation" },
      },
      {
        src: "/images/product/photo_after_2.jpg",
        w: 366,
        h: 548,
        label: { ko: "배경 생성", en: "Background generation" },
      },
    ],
  },
] as const;

export default function ProductSection6() {
  return (
    <section className="py-24 md:py-32">
      {/* POST ME AI 배너 — 페이드인 + 글로우 (뒤에 은은한 그린 글로우) */}
      <div className="relative overflow-hidden">
        {/*<div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background:radial-gradient(55%_120%_at_50%_50%,rgba(0,255,0,0.12),transparent_70%)]"
        />*/}
        <Reveal direction="fade" duration={3000}>
          {/* 데스크톱 배너 (md↑) — postme_ai.png (1704×559) · EN은 postme_ai_en.png */}
          <div className="relative mx-auto hidden aspect-[1704/559] w-full max-w-[1652px] md:block">
            <LangImage
              src="/images/product/postme_ai.png"
              alt="POST ME AI"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          {/* 모바일 배너 (md↓) — postme_ai_m.png (1578×540) · 크기는 aspect로 조정 */}
          <div className="relative mx-auto aspect-[1578/540] w-[180%] md:hidden items-center left-1/2 -translate-x-1/2">
            <LangImage
              src="/images/product/postme_ai_m.png"
              alt="POST ME AI"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </Reveal>
        {/* 소제목 문구는 배너 이미지(postme_ai.png)에 포함되어 있어 별도 텍스트 없음 */}
      </div>

      {/* AI 기능 블록 */}
      <div className={`mx-auto max-w-[1740px] ${GUTTER}`}>
        <div className="mt-20 space-y-24 md:space-y-28">
          {/* 각 블록은 단일 트리거로 before → ai_effect → after(스캔) 순서 보장 */}
          {BLOCKS.map((block) => (
            <ProductAiBlock key={block.title.ko} block={block} />
          ))}
        </div>

        {/* 하단 버튼 */}
        <Reveal direction="up" className="mt-40 flex justify-center">
          <ArrowButton href={CONTACT_URL} tone="brand" external>
            <T ko="문의하기" en="Contact" />
          </ArrowButton>
        </Reveal>
      </div>
    </section>
  );
}
