"use client";

import Link from "next/link";

import { useLang } from "@/lib/i18n";
import { NOTICE, useNotice } from "@/lib/notice";

/**
 * 페이지 최상단 공지 배너 (1920 x 50, 브랜드 그린).
 * - 문구는 우 → 좌 무한 롤링. 동일 문구 2벌을 나란히 두고 각각 translateX(0 → -100%)
 *   → 이음매 없이 반복 (LogoMarquee 와 같은 방식, animate-marquee 재사용).
 * - 마우스 호버 시 일시정지 / prefers-reduced-motion 이면 정지.
 * - NOTICE.href 를 채우면 배너 전체가 랜딩 페이지 링크가 되고, 공란이면 공지 문구만 표시.
 * - 우측 [X] 로 닫기. 문서 흐름의 맨 위에 sticky 로 붙어 스크롤해도 상단에 남는다.
 * - 노출 여부·문구·링크·속도는 lib/notice.tsx 의 NOTICE 에서 관리.
 */
export default function NoticeBanner() {
  const { visible, close } = useNotice();
  const { lang } = useLang();

  if (!visible) return null;

  const message = lang === "EN" ? NOTICE.text.en : NOTICE.text.ko;
  const closeLabel = lang === "EN" ? "Close notice" : "공지 닫기";

  const href = NOTICE.href.trim();
  const isExternal = /^https?:\/\//i.test(href);

  /** 배너 전체를 덮는 투명 링크. 우측 [X] 버튼이 그 위(z-2)에 있어 닫기는 그대로 동작한다. */
  const overlayClass = "absolute inset-0 z-[1]";
  const linkOverlay = !href ? null : isExternal ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={message}
      className={overlayClass}
    />
  ) : (
    <Link href={href} aria-label={message} className={overlayClass} />
  );

  return (
    <div
      role="status"
      className={`group sticky top-0 z-[60] w-full overflow-hidden bg-brand text-ink ${
        href ? "cursor-pointer" : ""
      }`}
      style={{ height: NOTICE.height }}
    >
      {/* 스크린 리더용 — 롤링 문구는 여러 벌 복제되므로 한 번만 읽히도록 분리.
          링크가 있으면 위 오버레이의 aria-label 이 같은 문구를 읽어주므로 생략. */}
      {!href && <span className="sr-only">{message}</span>}

      <div aria-hidden="true" className="flex h-full w-full">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            style={{ animationDuration: `${NOTICE.durationSec}s` }}
            className="flex min-w-full shrink-0 animate-marquee items-center whitespace-nowrap text-[13px] font-medium md:text-[15px] group-hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]"
          >
            {/* pr-16 = 문구를 반복해 이어 붙일 때 사이 간격 (구분 기호 없음) */}
            {Array.from({ length: NOTICE.repeat }).map((_, i) => (
              <span key={i} className="flex shrink-0 items-center pr-16">
                {/* 링크가 있을 때만 호버 시 밑줄 → 클릭 가능하다는 신호 */}
                <span
                  className={
                    href ? "underline-offset-4 group-hover:underline" : ""
                  }
                >
                  {message}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>

      {linkOverlay}

      {/* 닫기 — 배경이 배너와 같은 브랜드 컬러라 흐르는 문구가 자연스럽게 가려짐 */}
      <button
        type="button"
        onClick={close}
        aria-label={closeLabel}
        title={closeLabel}
        className="absolute inset-y-0 right-0 z-[2] flex cursor-pointer items-center bg-brand pl-6 pr-4 text-ink/70 transition-colors hover:text-ink md:pr-6"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M1.5 1.5 L12.5 12.5 M12.5 1.5 L1.5 12.5" />
        </svg>
      </button>
    </div>
  );
}
