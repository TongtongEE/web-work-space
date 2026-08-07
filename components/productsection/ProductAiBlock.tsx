"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Reveal from "@/components/Reveal";
import ScanReveal from "@/components/ScanReveal";
import { useLang } from "@/lib/i18n";

type Loc = { ko: string; en: string };
type Block = {
  title: Loc;
  desc: Loc;
  before: string;
  beforeRatio?: string;
  afters: readonly { src: string; w: number; h: number; label: Loc }[];
};

/**
 * POST ME AI 기능 블록 — 하나의 트리거로 순차 재생을 보장.
 * 진입(블록 20% 노출) 시 play=true → 모든 요소가 같은 시점을 기준으로
 * before(120ms) → ai_effect(340ms) → after 스캔(1050ms~) 순서로 재생됩니다.
 * (요소별 개별 옵저버를 쓰지 않으므로 순서가 어긋나지 않음)
 */
export default function ProductAiBlock({ block }: { block: Block }) {
  const ref = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);
  const { lang } = useLang();
  const tr = (l: Loc) => (lang === "EN" ? l.en : l.ko);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col gap-10 md:flex-row md:items-center md:gap-5"
    >
      {/* 좌 그룹 (column): (title+desc) 위 + [before | ai_effect] row2 아래.
          before/ai_effect도 자연 너비 비율(375 : 315)로 나눠 컨테이너에 맞춰 스케일. */}
      <div className="w-full md:min-w-0 md:flex-1">
        <Reveal direction="right" play={play}>
          <h3 className="whitespace-pre-line">{tr(block.title)}</h3>
          <p className="body-md mt-4 max-w-[600px] whitespace-pre-line text-ink-soft">
            {tr(block.desc)}
          </p>
        </Reveal>

        <div className="mt-8 flex items-center gap-6">
          {/* before — 원본 375x400 */}
          <div className="min-w-0" style={{ flex: `375 1 0%` }}>
            <Reveal direction="left" delay={120} play={play}>
              <Image
                src={block.before}
                alt={tr(block.title)}
                width={375}
                height={400}
                sizes="(min-width: 768px) 22vw, 45vw"
                className="h-auto w-full rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.12)]"
              />
            </Reveal>
          </div>
          {/* ai_effect — 자연 447x447, 표시 비율은 before의 315/375 */}
          <div className="min-w-0" style={{ flex: `315 1 0%` }}>
            <Reveal direction="left" delay={340} play={play}>
              <Image
                src="/images/product/ai_effect.png"
                alt="AI 변환"
                width={447}
                height={447}
                sizes="(min-width: 768px) 18vw, 38vw"
                className="h-auto w-full animate-ai-glow"
              />
            </Reveal>
          </div>
        </div>
      </div>

      {/* after — ai_effect 다음(1050ms)에 Shining Scan 생성.
          자연 너비 비율로 열을 나눠 컨테이너 폭에 맞춰 함께 스케일(비율 유지). */}
      <div className="w-full md:min-w-0 md:flex-1">
        <div className="flex items-start gap-4">
          {block.afters.map((after, i) => (
            <figure
              key={after.src}
              className="min-w-0"
              style={{ flex: `${after.w} 1 0%` }}
            >
              <ScanReveal
                play={play}
                delay={1150 + i * 350}
                className="shadow-[0_10px_20px_rgba(0,0,0,0.12)]"
              >
                <Image
                  src={after.src}
                  alt={tr(block.title)}
                  width={after.w}
                  height={after.h}
                  sizes="(min-width: 768px) 32vw, 90vw"
                  className="block h-auto w-full"
                />
              </ScanReveal>
              {tr(after.label) && (
                <figcaption className="body-sm mt-3 text-center text-ink-soft">
                  {tr(after.label)}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
