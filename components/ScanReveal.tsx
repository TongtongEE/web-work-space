"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Shining Scan 생성 효과.
 * - 진입 전: 이미지 없이 "빈 캔버스"(스켈레톤 시머)만 표시.
 * - 진입 시: 위 → 아래로 이미지가 채워지며 생성(clip-path)되고,
 *   스캔 경계를 따라 밝은 글로우 라인이 훑고 내려감(AI 생성 느낌).
 * - prefers-reduced-motion: 애니메이션 없이 즉시 최종 이미지 표시.
 *
 * 그림자는 래퍼(className)에, 라운드/클립은 내부에서 처리합니다.
 * (children 이미지에는 rounded/shadow를 넣지 말고 block + 사이즈만)
 */
export default function ScanReveal({
  children,
  delay = 0,
  className = "",
  play,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** 외부 트리거로 제어(ai_effect 다음에 재생 등). 지정 시 자체 옵저버 미사용 */
  play?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [selfOn, setSelfOn] = useState(false);
  const controlled = play !== undefined;
  const on = controlled ? !!play : selfOn;

  useEffect(() => {
    if (controlled) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSelfOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [controlled]);

  return (
    <div ref={ref} className={`relative w-full rounded-2xl ${className}`}>
      {/* 빈 캔버스 (생성 전) — 스켈레톤 시머 */}
      <span
        aria-hidden="true"
        className="animate-shimmer absolute inset-0 z-0 rounded-2xl bg-[linear-gradient(100deg,#e9edf1_35%,#f6f8fa_50%,#e9edf1_65%)] bg-[length:200%_100%] motion-reduce:animate-none"
      />

      {/* 이미지 — 위 → 아래로 채워지며 생성 */}
      <div className="relative z-10 overflow-hidden rounded-2xl">
        <div
          style={{ animationDelay: `${delay}ms` }}
          className={`${
            on ? "animate-scan-clip" : "[clip-path:inset(0_0_100%_0)]"
          } motion-reduce:!animate-none motion-reduce:![clip-path:none]`}
        >
          {children}
        </div>
      </div>

      {/* 스캔 라인 (가로) — 위 → 아래 이동 */}
      {on && (
        <span
          aria-hidden="true"
          style={{ animationDelay: `${delay}ms` }}
          className="animate-scan-edge pointer-events-none absolute left-0 right-0 top-0 z-20 h-[3px] -translate-y-1/2 rounded-full bg-white opacity-0 shadow-[0_0_26px_8px_rgba(0,255,0,0.55),0_0_12px_3px_rgba(255,255,255,0.95)] motion-reduce:hidden"
        />
      )}
    </div>
  );
}
