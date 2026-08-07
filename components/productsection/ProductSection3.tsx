"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import HoverSwapImage from "@/components/HoverSwapImage";
import Reveal from "@/components/Reveal";
import { T, useLang } from "@/lib/i18n";

/* ============================================================
   PRODUCT — SECTION 3 : 제품구성
   · 모든 요소 스크롤 시 아래 → 위 페이드인
   · 이미지 박스 호버 시 normal → hover 전환 (모바일은 hover 이미지 고정) + shadow
   · 박스 클릭 시 detail 이미지로 부드럽게 확장 (원본 사이즈)
     선택한 모델만 노출되고 다른 모델은 가려짐 · 다시 클릭하면 닫힘
   ============================================================ */
const GUTTER = "px-6 sm:px-10 lg:px-20 xl:px-28";

const BOXES = [
  {
    label: { ko: "Kiosk 분리형", en: "Split Kiosk" },
    normal: "/images/product/type1_normal.jpg",
    hover: "/images/product/type1_hover.jpg",
    detail: "/images/product/type1_detail.png",
    detailW: 1639,
    detailH: 820,
  },
  {
    label: { ko: "Kiosk 일체형", en: "All-in-One Kiosk" },
    normal: "/images/product/type2_normal.jpg",
    hover: "/images/product/type2_hover.jpg",
    detail: "/images/product/type2_detail.png",
    detailW: 1473,
    detailH: 736,
  },
] as const;

export default function ProductSection3() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const open = expanded !== null;
  const { lang } = useLang();
  const label = (b: (typeof BOXES)[number]) =>
    lang === "EN" ? b.label.en : b.label.ko;

  // 모바일 캐러셀 (좌우 스와이프 + 도트 + 5초 자동 전환)
  const scrollRef = useRef<HTMLDivElement>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCarouselIndex(Math.round(el.scrollLeft / el.clientWidth));
  };
  const scrollToCard = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };
  useEffect(() => {
    if (open) return; // 상세 확장 중엔 자동 전환 멈춤
    const el = scrollRef.current;
    if (!el || el.clientWidth === 0) return;
    const id = setTimeout(() => {
      const next = (carouselIndex + 1) % BOXES.length;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    }, 5000);
    return () => clearTimeout(id);
  }, [carouselIndex, open]);

  // 모델 이미지 버튼 (탭 시 상세 확장) — 데스크톱 그리드·모바일 캐러셀 공용
  const modelButton = (box: (typeof BOXES)[number], i: number) => (
    <button
      type="button"
      onClick={() => setExpanded(i)}
      aria-label={
        lang === "EN"
          ? `View ${box.label.en} details`
          : `${box.label.ko} 상세 구성 보기`
      }
      className="block w-full cursor-pointer rounded-2xl transition-transform duration-300 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <HoverSwapImage
        normalSrc={box.normal}
        hoverSrc={box.hover}
        alt={label(box)}
        ratio="699 / 567"
        sizes="(min-width: 768px) 50vw, 100vw"
        className="rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.12)]"
      />
    </button>
  );

  return (
    <section className={`mx-auto max-w-[1280px] ${GUTTER} py-24 md:py-32`}>
      <Reveal direction="up">
        <h3>
          <T ko="제품구성" en="Product Configuration" />
        </h3>
      </Reveal>
      <Reveal direction="up" delay={120}>
        <p className="body-md mt-5 max-w-[800px] text-ink-soft">
          <T
            ko={
              <>
                모든 모델은 자유로운 이동이 가능하여 어떤 공간이든 빠르고 손쉽게 설치할 수 있습니다.
                <br />
                원하시는 모델의 이미지를 클릭해 상세한 제품 구성을 확인해 보세요.
              </>
            }
            en={
              <>
                Every model moves freely, installing quickly and easily in any space.
                <br />
                Click a model&apos;s image to explore its detailed configuration.
              </>
            }
          />
        </p>
      </Reveal>

      <div className="relative mt-16">
        {/* 선택 전 — 데스크톱 2열 그리드 / 모바일 스와이프 캐러셀 (확장 시 숨김) */}
        {!open && (
          <>
            {/* 데스크톱(sm↑): 2열 그리드 */}
            <div className="hidden gap-8 sm:grid sm:grid-cols-2">
              {BOXES.map((box, i) => (
                <Reveal key={box.label.ko} direction="up" delay={120 + i * 120}>
                  {modelButton(box, i)}
                </Reveal>
              ))}
            </div>

            {/* 모바일(sm↓): 좌우 스와이프 캐러셀 + 도트
                (py/px 로 카드 그림자 공간 확보) */}
            <div className="sm:hidden">
              <div
                ref={scrollRef}
                onScroll={onScroll}
                className="flex snap-x snap-mandatory overflow-x-auto py-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {BOXES.map((box, i) => (
                  <div
                    key={box.label.ko}
                    className="w-full shrink-0 snap-center px-4"
                  >
                    {modelButton(box, i)}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center gap-2">
                {BOXES.map((box, i) => (
                  <button
                    key={box.label.ko}
                    type="button"
                    onClick={() => scrollToCard(i)}
                    aria-label={`${i + 1}번째 모델 보기`}
                    aria-current={i === carouselIndex}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === carouselIndex ? "w-6 bg-brand" : "w-2 bg-neutral-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* 선택 후 — detail 이미지 (원본 사이즈, 부드럽게 확장) */}
        {open && (
          <div className="animate-detail-open origin-top">
            <button
              type="button"
              onClick={() => setExpanded(null)}
              aria-label={lang === "EN" ? "Close" : "닫기"}
              className="block w-full cursor-zoom-out focus-visible:outline-none"
            >
              {/* 이미지 우측 상단에 ✕가 포함되어 있어 별도 닫기 버튼 없음 (전체 클릭 시 닫힘) */}
              <Image
                src={BOXES[expanded].detail}
                alt={
                  lang === "EN"
                    ? `${BOXES[expanded].label.en} configuration`
                    : `${BOXES[expanded].label.ko} 상세 구성`
                }
                width={BOXES[expanded].detailW}
                height={BOXES[expanded].detailH}
                sizes="(min-width: 1280px) 1280px, 100vw"
                priority
                className="mx-auto h-auto w-full rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.12)]"
                style={{ maxWidth: BOXES[expanded].detailW }}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
