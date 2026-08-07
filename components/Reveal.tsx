"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Direction = "up" | "left" | "right" | "fade" | "generate";

/** 방향별 초기 오프셋 (뷰포트 진입 전 위치/상태) */
const HIDDEN: Record<Direction, string> = {
  up: "translate-y-10", //  아래 → 제자리
  left: "-translate-x-16", // 왼쪽 → 제자리
  right: "translate-x-16", // 오른쪽 → 제자리
  fade: "", //  제자리에서 서서히 나타남(불투명도만)
  generate: "scale-105 blur-md", // AI 생성 느낌: 흐릿+살짝 확대 → 선명
};

/**
 * 스크롤 진입 시 페이드 + 슬라이드로 나타나는 래퍼.
 * - IntersectionObserver로 한 번만 트리거(재생 후 관찰 해제)
 * - prefers-reduced-motion 사용자는 애니메이션 없이 즉시 표시
 * - className으로 전달한 레이아웃(flex/grid 등)과 함께 사용 가능
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  className = "",
  play,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  /** 등장 애니메이션 재생 시간(ms). 기본 700 */
  duration?: number;
  className?: string;
  /** 외부 트리거로 제어(여러 요소를 한 시점에 순차 재생할 때). 지정 시 자체 옵저버 미사용 */
  play?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [selfShown, setSelfShown] = useState(false);
  const controlled = play !== undefined;

  useEffect(() => {
    if (controlled) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        // 일반 요소는 20% 노출 시 트리거.
        // 뷰포트보다 큰 요소(예: 긴 iframe 피드)는 20%를 못 채우므로,
        // 교차하는 즉시 트리거해 영영 숨겨지는 것을 방지.
        const tallerThanViewport =
          entry.boundingClientRect.height > window.innerHeight;
        if (
          entry.isIntersecting &&
          (entry.intersectionRatio >= 0.2 || tallerThanViewport)
        ) {
          setSelfShown(true);
          io.disconnect();
        }
      },
      { threshold: [0, 0.2] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [controlled]);

  const shown = controlled ? !!play : selfShown;

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
      // motion-reduce: 모션 최소화 설정 시 애니메이션 없이 즉시 최종 상태로 표시
      className={`transition-all ease-out motion-reduce:!translate-x-0 motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:!transition-none ${
        shown
          ? "translate-x-0 translate-y-0 scale-100 opacity-100 blur-0"
          : `opacity-0 ${HIDDEN[direction]}`
      } ${className}`}
    >
      {children}
    </div>
  );
}
