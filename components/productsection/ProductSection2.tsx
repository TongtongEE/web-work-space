"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Reveal from "@/components/Reveal";
import { T } from "@/lib/i18n";

/* ============================================================
   PRODUCT — SECTION 2 : 공간과 목적에 맞춘 최적의 라인업
   · 데스크톱(sm↑): 3열 그리드
   · 모바일(sm↓): 좌우 스와이프 캐러셀 + 도트(라디오) · 5초 자동 전환 (Hero 방식)
   ============================================================ */
const GUTTER = "px-6 sm:px-10 lg:px-20 xl:px-28";

const CARDS = [
  {
    src: "/images/product/standard.jpg",
    title: { ko: "Kiosk 분리형", en: "Split Kiosk" },
    subtitle: {
      ko: "자유로운 동선 배치와 무인 운영 최적화",
      en: "Free layout flow, built for unmanned use",
    },
    desc: {
      ko: "키오스크와 로봇 카메라를 분리하여 현장 동선 관리에 유용하며, 상시 무인 운영에 가장 특화된 모델입니다.",
      en: "Separating the kiosk from the robot camera eases on-site flow control — the model best suited for always-on unmanned operation.",
    },
  },
  {
    src: "/images/product/compact.jpg",
    title: { ko: "Kiosk 일체형", en: "All-in-One Kiosk" },
    subtitle: {
      ko: "좁은 공간에서도 빛나는 공간 효율성",
      en: "High space efficiency, even in tight spots",
    },
    desc: {
      ko: "이동과 설치가 간편한 이벤트 행사 최적화 모델로, 제약이 많은 협소한 공간에서도 효율적인 운영이 가능합니다.",
      en: "An event-optimized model that's easy to move and install, running efficiently even in constrained, narrow spaces.",
    },
  },
  {
    src: "/images/product/tailored.jpg",
    title: { ko: "커스텀 OEM", en: "Custom OEM" },
    subtitle: {
      ko: "브랜드 아이덴티티를 담은 맞춤 제작",
      en: "Bespoke builds embody your brand identity",
    },
    desc: {
      ko: "독창적인 브랜딩이나 프랜차이즈 특화 컨셉에 맞춰 제품의 외관 및 기능을 커스텀 가공하는 맞춤형 솔루션입니다.",
      en: "A tailored solution that customizes the product's exterior and features to fit unique branding or franchise-specific concepts.",
    },
  },
] as const;

function Card({
  card,
  bleed = false,
}: {
  card: (typeof CARDS)[number];
  /** 모바일 캐러셀 풀블리드: 이미지를 화면 끝까지(라운드/그림자 제거), 텍스트만 여백 */
  bleed?: boolean;
}) {
  return (
    <article className="text-center">
      <div
        className={`relative aspect-[450/569] overflow-hidden ${
          bleed ? "" : "rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.12)]"
        }`}
      >
        <Image
          src={card.src}
          alt={card.title.ko}
          fill
          sizes={bleed ? "100vw" : "(min-width: 640px) 33vw, 90vw"}
          className="object-cover"
        />
      </div>
      <div className={bleed ? "px-6" : ""}>
        <p className="body-lg mt-6 font-bold">
          <T ko={card.title.ko} en={card.title.en} />
        </p>
        <p className="body-sm mt-2 font-bold text-ink">
          <T ko={card.subtitle.ko} en={card.subtitle.en} />
        </p>
        <p className="body-sm mt-2 text-ink-soft">
          <T ko={card.desc.ko} en={card.desc.en} />
        </p>
      </div>
    </article>
  );
}

export default function ProductSection2() {
  // 모바일 캐러셀 (좌우 스와이프 + 도트 + 5초 자동 전환)
  const scrollRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };
  const scrollToCard = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  // 5초마다 다음 카드로 자동 전환 (모바일에서만 · 순환). 스와이프·도트 시 리셋.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || el.clientWidth === 0) return; // 데스크톱(숨김)에선 미동작
    const id = setTimeout(() => {
      const next = (index + 1) % CARDS.length;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    }, 5000);
    return () => clearTimeout(id);
  }, [index]);

  return (
    <section
      className={`mx-auto max-w-[1280px] [html[lang=en]_&]:max-w-[1380px] ${GUTTER} py-24 md:py-32`}
    >
      <Reveal direction="up">
        <h2>
          <T
            ko="공간과 목적에 맞춘 최적의 라인업"
            en="The optimal lineup for every space and purpose"
          />
        </h2>
      </Reveal>
      <Reveal direction="up" delay={120}>
        <p className="body-md mt-5 max-w-[680px] text-ink-soft">
          <T
            ko={
              <>
                현장의 규모와 운영 방식에 맞춰 가장 효율적인 모델을 선택하세요.
                <br />
                브랜드 맞춤 커스텀 제작까지 유연하게 대응합니다.
              </>
            }
            en={
              <>
                Choose the most efficient model for your venue size and operation.
                <br />
                We flexibly handle everything down to custom brand-tailored builds.
              </>
            }
          />
        </p>
      </Reveal>

      {/* 데스크톱(sm↑): 3열 그리드 */}
      <div className="mt-16 hidden gap-8 sm:grid sm:grid-cols-3">
        {CARDS.map((card, i) => (
          <Reveal key={card.title.ko} direction="up" delay={120 + i * 120}>
            <Card card={card} />
          </Reveal>
        ))}
      </div>

      {/* 모바일(sm↓): 좌우 스와이프 캐러셀 + 도트.
          카드 비율/라운드/그림자 유지. overflow가 상하좌우 그림자를 클립하므로
          스크롤 컨테이너 py + 슬라이드 px 로 그림자 공간을 확보(잘림 방지) */}
      <div className="mt-8 sm:hidden">
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory overflow-x-auto py-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CARDS.map((card) => (
            <div
              key={card.title.ko}
              className="w-full shrink-0 snap-center px-6"
            >
              <Card card={card} />
            </div>
          ))}
        </div>

        {/* 도트 (현재 카드 표시 + 탭 이동) */}
        <div className="mt-8 flex justify-center gap-2">
          {CARDS.map((card, i) => (
            <button
              key={card.title.ko}
              type="button"
              onClick={() => scrollToCard(i)}
              aria-label={`${i + 1}번째 모델 보기`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-brand" : "w-2 bg-neutral-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
