"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 뷰포트에 들어올 때만 내려받아 자동 재생하는 인라인 영상.
 * - preload="none" + 진입 시 src 주입: 페이지 로드 때 영상 전체를 받지 않는다.
 *   (glamotion 클립 4개 합계 약 64MB — 정적 배포라 대역폭이 그대로 비용)
 * - 화면 밖으로 나가면 pause, 다시 들어오면 play (모바일 배터리·데이터 절약)
 * - muted/playsInline: iOS Safari 포함 자동재생 정책 충족 (next/docs videos.md)
 */
export default function InViewVideo({
  src,
  label,
  /** CSS aspect-ratio — 기본값은 원본 1080×1350(=496×620)과 같은 4:5 */
  ratio = "496 / 620",
  className = "",
}: {
  src: string;
  label: string;
  ratio?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loadedSrc, setLoadedSrc] = useState<string>();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadedSrc(src); // 최초 진입 → 이때부터 다운로드 시작
          // src 주입 전 첫 호출은 reject 되지만 autoPlay 가 이어받는다.
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return (
    <div
      className={`relative w-full overflow-hidden bg-neutral-200 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <video
        ref={ref}
        src={loadedSrc}
        aria-label={label}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      />
    </div>
  );
}
