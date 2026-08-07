"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 뷰포트 진입 시 0 → end 로 카운트업 되는 숫자.
 * - IntersectionObserver로 한 번만 실행
 * - requestAnimationFrame + easeOutCubic 로 부드럽게 감속
 * - prefers-reduced-motion 사용자는 최종값을 즉시 표시
 */
export default function CountUp({
  end,
  duration = 1600,
}: {
  end: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();

        // 모션 최소화 설정 시 카운트업 없이 최종값만 표시
        if (reduce) {
          setValue(end);
          return;
        }

        let startTs: number | undefined;
        const step = (ts: number) => {
          if (startTs === undefined) startTs = ts;
          const progress = Math.min((ts - startTs) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
          setValue(Math.round(eased * end));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString()}
    </span>
  );
}
