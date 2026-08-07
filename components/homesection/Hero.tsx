"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useLang } from "@/lib/i18n";

/**
 * 배경 영상 목록.
 * - 우선 1개, 추후 배열에 항목을 추가하면 하단 라디오 선택 UI가 자동으로 늘어남.
 * - 영상 파일은 /public/videos/ 에 넣고 src 경로만 맞추면 됨.
 *   (원본 1920x1080 → 화면에서는 1920x956 비율로 크롭되어 표시됨)
 */
const HERO_VIDEOS = [
  {
    id: "moving-angle",
    label: "Moving Angle",
    src: "/videos/hero-1.mp4", 
    poster: "/videos/hero-1.jpg",
  },
] as const;

/** 중앙 하단 3컬럼 피처 (타이틀 = h4, 본문 = body-sm) */
const FEATURES = [
  {
    title: { ko: "인생샷을 만드는 무빙 앵글", en: "Moving Angles for the Best Shot" },
    desc: {
      ko: "하이앵글부터 로우까지 평범한 포토부스에는 없는 카메라 워킹을 선사합니다.",
      en: "From high to low, camera moves no ordinary photo booth can offer.",
    },
  },
  {
    title: { ko: "숏폼 바이럴 최적화", en: "Optimized for Short-Form Virality" },
    desc: {
      ko: "짧고 강렬한 세로형 영상으로 SNS에서 바이럴되기 좋은 결과물을 완성합니다.",
      en: "Short, striking vertical videos built to go viral across social media.",
    },
  },
  {
    title: { ko: "AI 실시간 트래킹", en: "AI Real-Time\nTracking" },
    desc: {
      ko: "AI가 인물을 실시간으로 인식하고 추적해 언제나 완벽한 구도를 잡아냅니다.",
      en: "AI detects and tracks subjects in real time for a perfect frame every time.",
    },
  },
] as const;

const formatTime = (s: number) => {
  if (!Number.isFinite(s) || Number.isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${sec}`;
};

export default function Hero() {
  const { lang } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0); // 0 ~ 1
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const single = HERO_VIDEOS.length === 1;

  const handleMeta = useCallback(() => {
    setDuration(videoRef.current?.duration ?? 0);
  }, []);

  const handleTime = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setCurrentTime(v.currentTime);
    setProgress(v.duration ? v.currentTime / v.duration : 0);
  }, []);

  const handleEnded = useCallback(() => {
    // 영상이 여러 개면 다음 영상으로 자동 전환
    setActive((prev) => (prev + 1) % HERO_VIDEOS.length);
  }, []);

  const select = useCallback(
    (index: number) => {
      if (index === active) return;
      setActive(index);
      setProgress(0);
      setCurrentTime(0);
      setDuration(0);
    },
    [active],
  );

  const currentVideo = HERO_VIDEOS[active];

  // 모바일 피처 캐러셀 (좌우 스와이프 + 도트)
  const featScrollRef = useRef<HTMLDivElement>(null);
  const [featIndex, setFeatIndex] = useState(0);
  const onFeatScroll = () => {
    const el = featScrollRef.current;
    if (!el) return;
    setFeatIndex(Math.round(el.scrollLeft / el.clientWidth));
  };
  const scrollToFeat = (i: number) => {
    const el = featScrollRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  // 5초마다 다음 피처로 자동 전환 (모바일 캐러셀에서만 · 순환).
  // featIndex 변경(스와이프·도트·자동) 시 타이머가 리셋됨.
  useEffect(() => {
    const el = featScrollRef.current;
    if (!el || el.clientWidth === 0) return; // 데스크톱(숨김)에선 clientWidth 0 → 미동작
    const id = setTimeout(() => {
      const next = (featIndex + 1) % FEATURES.length;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    }, 5000);
    return () => clearTimeout(id);
  }, [featIndex]);

  return (
    <section className="relative h-[88svh] min-h-[560px] w-full overflow-hidden bg-[#101010] md:h-auto md:min-h-0 md:aspect-[1920/956]">
      {/* 배경 영상 (원본 16:9 → 1920x956 크롭) */}
      <video
        key={active}
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={currentVideo.src}
        poster={currentVideo.poster}
        autoPlay
        muted
        playsInline
        loop={single}
        onLoadedMetadata={handleMeta}
        onTimeUpdate={handleTime}
        onEnded={handleEnded}
      />

      {/* 텍스트 가독성용 오버레이 (하단 그라데이션 + 전체 살짝 어둡게) */}
      <div className="pointer-events-none absolute inset-0 bg-black/20" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 via-black/15 to-transparent"
        aria-hidden="true"
      />

      {/* 중앙 하단 피처 — 데스크톱(sm↑): 3컬럼 그리드.
          태블릿~PC 동일 비율 유지 위해 폰트·여백을 뷰포트 폭(vw)에 비례 축소
          (읽히는 하한은 clamp로 확보) */}
      <div className="absolute inset-x-0 bottom-[16%] z-10 hidden justify-center px-6 sm:flex">
        <div className="grid max-w-[1120px] grid-cols-3 divide-x divide-white/20 text-center">
          {FEATURES.map((f) => (
            <div key={f.title.ko} className="px-3 md:px-4 lg:px-8">
              <h4 className="whitespace-pre-line text-[clamp(14px,1.7vw,25px)] leading-tight text-white">
                {lang === "EN" ? f.title.en : f.title.ko}
              </h4>
              <p className="mx-auto mt-2 max-w-[310px] text-[clamp(11px,1.15vw,16px)] leading-relaxed text-white/70 lg:mt-3">
                {lang === "EN" ? f.desc.en : f.desc.ko}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 모바일(sm↓): 좌우 스와이프 캐러셀 + 도트 3개 */}
      <div className="absolute inset-x-0 bottom-[12%] z-10 sm:hidden">
        <div
          ref={featScrollRef}
          onScroll={onFeatScroll}
          className="flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {FEATURES.map((f) => (
            <div
              key={f.title.ko}
              className="w-full shrink-0 snap-center px-10 text-center"
            >
              <h4 className="whitespace-pre-line text-white">
                {lang === "EN" ? f.title.en : f.title.ko}
              </h4>
              <p className="body-sm mx-auto mt-3 max-w-[320px] leading-relaxed text-white/70">
                {lang === "EN" ? f.desc.en : f.desc.ko}
              </p>
            </div>
          ))}
        </div>

        {/* 도트 3개 (현재 피처 표시 + 탭 이동) */}
        <div className="mt-6 flex justify-center gap-2">
          {FEATURES.map((f, i) => (
            <button
              key={f.title.ko}
              type="button"
              onClick={() => scrollToFeat(i)}
              aria-label={`${i + 1}번째 특징 보기`}
              aria-current={i === featIndex}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === featIndex ? "w-6 bg-brand" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 하단 영상 진행바 — 모바일에선 숨김(sm↑에서만) */}
      <div className="absolute inset-x-0 bottom-20 z-10 hidden flex-col items-center gap-3 sm:flex">
        <div
          className="flex items-center gap-2"
          role="radiogroup"
          aria-label="배경 영상 선택"
        >
          {HERO_VIDEOS.map((v, i) => {
            const fill = i === active ? progress * 100 : i < active ? 100 : 0;
            return (
              <button
                key={v.id}
                type="button"
                role="radio"
                aria-checked={i === active}
                aria-label={`${v.label} 영상 재생`}
                onClick={() => select(i)}
                className="h-1 w-30 overflow-hidden rounded-full bg-white/25 transition-colors hover:bg-white/40"
              >
                <span
                  className="block h-full rounded-full bg-brand transition-[width] duration-200 ease-linear"
                  style={{ width: `${fill}%` }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
