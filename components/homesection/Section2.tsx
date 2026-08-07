import Image from "next/image";

import ArrowButton from "@/components/ArrowButton";
import BleedZoomImage from "@/components/BleedZoomImage";
import CountUp from "@/components/CountUp";
import LangImage from "@/components/LangImage";
import Reveal from "@/components/Reveal";
import { T } from "@/lib/i18n";
import type { ReactNode } from "react";

/* ============================================================
   SECTION 2 — AI 기술 & 성과 지표
   구성(위 → 아래):
     1) 오차 없는 AI 기술 (풀블리드 이미지 + 우측 텍스트 + AI 아이콘 2종)
     2) 시선을 압도하는 강력한 모객 효과 (좌 텍스트 / 우 이미지)
     3) 대기 걱정 없는 압도적인 회전율 (좌 이미지 / 우 텍스트)
   ※ "제품 상세페이지 →" 버튼은 섹션 2 마지막 요소로 이후 단계에서 추가 예정.

   리소스는 모두 /public 아래에 넣고 아래 경로만 맞추면 됩니다.
   (파일이 없어도 빌드는 되며, 넣는 즉시 화면에 표시됩니다 — Hero 방식과 동일)
   ============================================================ */

/** 좌우 여백(거터) — 네비게이션 바(최대 1487px)와 시각적으로 정렬 */
const GUTTER = "px-6 sm:px-10 lg:px-20 xl:px-28";

/**
 * 상단 블록의 AI 기능 아이콘 카드 (아이콘 + 배경 + 문구가 모두 합쳐진 이미지 리소스)
 * ※ 문구가 이미지에 포함되어 있으므로 화면 라벨은 없음. alt는 접근성/SEO용.
 * ※ src는 국문 기준 — 영문(EN)일 때는 LangImage가 `_en` 파일로 교체한다.
 */
const AI_ICONS = [
  {
    src: "/images/section2/icon-tracking.png",
    alt: "AI 인물 트래킹",
    altEn: "AI subject tracking",
  },
  {
    src: "/images/section2/icon-retouch.png",
    alt: "AI 보정",
    altEn: "AI retouching",
  },
] as const;

/**
 * min ~ max 수치 강조 박스 (모객 효과 / 회전율에서 재사용)
 * - 큰 숫자는 뷰포트 진입 시 0 → from / to 로 카운트업 (CountUp)
 * - suffix: 숫자 뒤 단위(예: "분"),  separator: 두 숫자 사이 구분자(예: "~")
 */
function MetricBox({
  badge,
  from,
  to,
  separator,
  suffix = "",
  iconSrc,
  iconAlt,
  tone,
  valueClass = "text-[clamp(56px,13vw,150px)]",
  showMinMax = true,
  note,
}: {
  badge: ReactNode;
  from: number;
  to: number;
  separator: string;
  suffix?: ReactNode;
  iconSrc: string;
  iconAlt: string;
  tone: "yellow" | "green";
  /** 큰 숫자 글자 크기 (박스마다 개별 지정 가능) */
  valueClass?: string;
  /** min·max 라벨 표시 여부 (박스별) */
  showMinMax?: boolean;
  /** 배지 옆 참고 문구 (선택) */
  note?: ReactNode;
}) {
  // 톤별 글래스 스타일
  // - box   : 수치 박스(반투명 + 테두리)
  // - badge : 라벨 pill(솔리드 채우기, 테두리 없음)
  // - bleed : 이미지 위로 겹치도록 밀어내는 정도 (yellow만 오른쪽 이미지와 겹침)
  // align: 아이콘·배지를 박스의 어느 쪽 끝에 맞출지 (yellow 좌측 / green 우측 — 제목 정렬과 동일)
  const style =
    tone === "yellow"
      ? {
          box: "border-[#FFF600]/80 bg-[#FBE79F]/35",
          badge: "bg-[#FFF600]",
          align: "md:items-start",
        }
      : {
          box: "border-brand/80 bg-brand/25",
          badge: "bg-brand",
          align: "md:items-end",
        };

  return (
    <div
      className={`relative z-20 flex w-full flex-col items-start gap-4 md:inline-flex md:w-auto ${style.align}`}
    >
      {/* 상단 아이콘 (노란 인물 그룹 / 초록 회전 화살표 — 이미지 리소스)
          모바일에서는 숨김(md↑에서만 표시) */}
      <Image
        src={iconSrc}
        alt={iconAlt}
        width={120}
        height={120}
        className="ml-2 mr-4 hidden h-20 w-auto md:block"
      />

      {/* 라벨 pill(뒤) + 수치 글래스 박스(앞) — 톤별 좌/우 정렬 (모바일은 항상 좌·꽉참) */}
      <div
        className={`relative flex w-full flex-col items-start md:w-auto ${style.align}`}
      >
        {/* 라벨 pill(+참고 문구) — 솔리드 채우기(테두리 없음). 세로를 늘리고 글자는
            위쪽 정렬, 아랫부분(-mb)이 글래스 박스에 덮이도록 뒤에 배치.
            참고 문구는 배지 오른쪽에(모바일 폭 부족 시 숨김: sm↑에서 표시) */}
        <div className="z-0 -mb-9 flex items-start gap-x-3">
          <span
            className={`body-sm w-fit rounded-2xl ${style.badge} px-7 pb-11 pt-3 font-medium text-ink`}
          >
            {badge}
          </span>
          {note && (
            <span className="hidden whitespace-nowrap pt-3 text-[13px] leading-snug text-ink/50 sm:inline-block">
              {note}
            </span>
          )}
        </div>

        {/* 수치 글래스 박스 — 모바일은 화면 꽉참(w-full), 데스크톱은 내용폭(w-auto) */}
        <div
          className={`flex w-full items-end justify-center gap-3 rounded-2xl border ${style.box} px-5 pb-3 pt-7 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-md md:w-auto md:gap-4 md:px-20`}
        >
          {showMinMax && (
            <span className="body-sm mb-1 font-medium text-ink/60">min</span>
          )}
          <span
            className={`font-heading ${valueClass} flex items-end gap-1 whitespace-nowrap leading-none text-ink`}
          >
            <CountUp end={from} />
            {suffix}
            {separator}
            <CountUp end={to} />
            {suffix}
          </span>
          {showMinMax && (
            <span className="body-sm mb-2 self-start font-medium text-ink/60">
              max
            </span>
          )}
        </div>

        {/* 참고 문구 — 모바일은 박스 아래 중앙 정렬 (데스크톱은 배지 옆) */}
        {note && (
          <span className="mt-3 block w-full text-center text-[12px] leading-snug text-ink/50 sm:hidden">
            {note}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Section2() {
  // 블록1 공용 텍스트 (데스크톱 오버레이 · 모바일 스택에서 재사용)
  const titleT = (
    <T
      ko={
        <>
          오차 없는 AI 기술로
          <br />
          만드는 완벽한 인생샷!
        </>
      }
      en={
        <>
          Picture-perfect shots,
          <br />
          crafted by flawless AI!
        </>
      }
    />
  );
  const descT = (
    <T
      ko={
        <>
          인물을 실시간으로 추적하는 AI 기술이 최적의 구도를 찾아냅니다.
          <br />
          AI 기반 감각적인 이미지 생성과 딥러닝 보정으로 고퀄리티 화보컷부터
          <br />
           숏폼 영상까지, 무조건 터지는 브랜드 바이럴을 경험하세요.
        </>
      }
      en={
        <>
          AI tracks each subject in real time to find the ideal composition.
          <br />
          From high-end editorial cuts to short-form clips, powered by AI
          <br />
          generation and deep-learning retouch — experience unstoppable virality.
        </>
      }
    />
  );

  // ── 블록2 (모객 효과) 요소 (데스크톱·모바일 공용) ──
  const crowdTitle = (
    <T
      ko={
        <>
          시선을 압도하는
          <br />
          강력한 모객 효과
        </>
      }
      en={
        <>
          An overwhelming
          <br />
          crowd-drawing effect
        </>
      }
    />
  );
  const crowdDesc = (
    <T
      ko="멀리서도 눈에 띄는 로봇 카메라의 비주얼로 방문객의 발길을 단숨에 사로잡습니다. 줄을 서서 기다리고 촬영하는 모든 과정이 그 자체로 현장의 힙한 이벤트가 됩니다."
      en="The robot camera's striking look grabs visitors from across the room. Lining up and shooting all becomes a trendy on-site event in itself."
    />
  );
  const crowdMetric = (
    <MetricBox
      tone="yellow"
      badge={<T ko="하루 평균 이용객 수" en="Avg. daily visitors" />}
      note={
        <T
          ko="* 하루 8시간 운영 기준이며 체험시간 세팅에 따라 변동"
          en="* Based on 8 hrs/day operation; varies with session settings"
        />
      }
      from={100}
      to={250}
      separator="~"
      showMinMax={false}
      iconSrc="/images/section2/icon-visitors.png"
      iconAlt="하루 평균 이용객 수 아이콘"
    />
  );
  const crowdImage = (
    <BleedZoomImage
      src="/images/section2/attract.jpg"
      alt="로봇 카메라 앞에 앉아 촬영 중인 인물"
      ratio="1325 / 704"
      sizes="(min-width: 768px) 50vw, 100vw"
      boxClassName="rounded-l-2xl"
    />
  );

  // ── 블록3 (회전율) 요소 (데스크톱·모바일 공용) ──
  const turnTitle = (
    <T
      ko={
        <>
          대기 걱정 없는
          <br />
          압도적인 회전율
        </>
      }
      en={
        <>
          No waiting worries,
          <br />
          unmatched turnover
        </>
      }
    />
  );
  const turnDesc = (
    <T
      ko="로봇 카메라만의 정밀하고 빠른 자동화 시스템으로 인파가 몰리는 피크 타임에도 딜레이 없는 완벽한 현장 운영을 보장합니다."
      en="The robot camera's precise, high-speed automation guarantees flawless, delay-free operation even at the busiest peak times."
    />
  );
  const turnMetric = (
    <MetricBox
      tone="green"
      badge={<T ko="1회 촬영 소요 시간" en="Time per shoot" />}
      from={1}
      to={3}
      separator=" ~ "
      suffix={<T ko="분" en="min" />}
      showMinMax={false}
      valueClass="text-[clamp(64px,16vw,140px)]"
      iconSrc="/images/section2/icon-rotation.png"
      iconAlt="1회 촬영 소요 시간 아이콘"
    />
  );
  const turnImage = (
    <BleedZoomImage
      src="/images/section2/rotation.jpg"
      alt="로봇 카메라 앞에서 자유롭게 촬영 중인 인물"
      ratio="1137 / 704"
      side="right"
      sizes="(min-width: 768px) 50vw, 100vw"
      boxClassName="rounded-r-2xl"
    />
  );

  // 데스크톱(md↑) 오버레이 — 우측 정렬. 태블릿~PC 동일 비율 유지 위해
  // 타이틀·본문·아이콘을 뷰포트 폭(vw)에 비례 스케일 (1920 기준, 하한 clamp)
  const aiTechTextDesktop = (
    <div className="max-w-[900px] text-right">
      <Reveal direction="up">
        <h1 className="text-[clamp(24px,3.65vw,70px)] leading-tight">
          {titleT}
        </h1>
      </Reveal>
      <Reveal direction="up" delay={120}>
        <p className="mt-[clamp(8px,1.4vw,24px)] text-[clamp(11px,1.04vw,20px)] leading-relaxed text-ink-soft">
          {descT}
        </p>
      </Reveal>
      <Reveal
        direction="up"
        delay={240}
        className="mt-[clamp(12px,2.4vw,40px)] flex justify-end gap-[clamp(8px,1.6vw,24px)]"
      >
        {AI_ICONS.map((icon) => (
          <LangImage
            key={icon.src}
            src={icon.src}
            alt={icon.alt}
            altEn={icon.altEn}
            width={320}
            height={320}
            className="h-auto w-[clamp(40px,10.4vw,200px)]"
          />
        ))}
      </Reveal>
    </div>
  );

  return (
    <section aria-label="AI 기술 및 성과 지표" className="relative">
      {/* ========================================================
          1) 오차 없는 AI 기술로 만드는 완벽한 인생샷
          - 태블릿~PC(md↑): 풀블리드 이미지 + 우측 텍스트 오버레이 (vw 비례 스케일)
          - 모바일(md↓): 타이틀 → 이미지(AI 아이콘 오버레이) → 본문
          ======================================================== */}
      {/* 태블릿~PC(md↑) */}
      <div className="relative hidden w-full overflow-hidden md:block md:aspect-[1920/754]">
        <Image
          src="/images/section2/ai-tech.jpg"
          alt="태블릿 화면 속 자신의 모습을 바라보는 인물 — AI 인물 트래킹 데모"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className={`absolute inset-0 ${GUTTER}`}>
          <div className="mx-auto flex h-full max-w-[1520px] items-center justify-end">
            {aiTechTextDesktop}
          </div>
        </div>
      </div>

      {/* 모바일(md↓): 타이틀 → 이미지+아이콘 → 본문 */}
      <div className="md:hidden">
        <div className={`${GUTTER} pt-8`}>
          <Reveal direction="up">
            <h2 className="text-left">{titleT}</h2>
          </Reveal>
        </div>

        <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden">
          <Image
            src="/images/section2/ai-tech.jpg"
            alt="태블릿 화면 속 자신의 모습을 바라보는 인물 — AI 인물 트래킹 데모"
            fill
            sizes="100vw"
            className="object-cover object-left"
          />
          {/* AI 기능 아이콘 — 인물 이미지 위에 레이어로 오버레이 (세로 정렬) */}
          <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-3">
            {AI_ICONS.map((icon) => (
              <LangImage
                key={icon.src}
                src={icon.src}
                alt={icon.alt}
                altEn={icon.altEn}
                width={320}
                height={320}
                className="h-24 w-24 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] sm:h-30 sm:w-30"
              />
            ))}
          </div>
        </div>

        <div className={`${GUTTER} py-8`}>
          <Reveal direction="up" delay={120}>
            <p className="body-md text-left text-ink-soft">{descT}</p>
          </Reveal>
        </div>
      </div>

      {/* ========================================================
          2) 시선을 압도하는 강력한 모객 효과
          - 데스크톱(md↑): 좌 텍스트 / 우 이미지
          - 모바일(md↓): 타이틀 → 인물 이미지 → desc → 지표
          ======================================================== */}
      {/* 데스크톱 */}
      <div className="mx-auto hidden max-w-[1920px] items-center md:grid md:grid-cols-2 md:gap-0 md:py-28">
        <div className={`relative z-20 ${GUTTER} md:pr-0`}>
          <div className="mx-auto max-w-[650px] [html[lang=en]_&]:max-w-[750px] md:ml-auto md:mr-0">
            <Reveal direction="up">
              <h2>{crowdTitle}</h2>
            </Reveal>
            <Reveal direction="up" delay={120}>
              <p className="body-md mt-6 text-ink-soft">{crowdDesc}</p>
            </Reveal>
            <Reveal direction="up" delay={240} className="mt-10 flex justify-start">
              {crowdMetric}
            </Reveal>
          </div>
        </div>
        <Reveal direction="right" className="w-full">
          {crowdImage}
        </Reveal>
      </div>

      {/* 모바일 — 타이틀 → 이미지 → 메트릭(이미지 하단 겹침) → desc */}
      <div className="py-16 md:hidden">
        <div className={GUTTER}>
          <Reveal direction="up">
            <h2 className="text-left">{crowdTitle}</h2>
          </Reveal>
        </div>
        <Reveal direction="right" className="mt-5 w-full">
          {crowdImage}
        </Reveal>
        {/* 메트릭 — 이미지 하단과 겹치도록 위로 당김 */}
        <div className={`relative z-20 -mt-14 ${GUTTER}`}>
          <Reveal direction="up" delay={200}>
            {crowdMetric}
          </Reveal>
        </div>
        <div className={`${GUTTER} mt-8`}>
          <Reveal direction="up" delay={120}>
            <p className="body-md text-left text-ink-soft">{crowdDesc}</p>
          </Reveal>
        </div>
      </div>

      {/* ========================================================
          3) 대기 걱정 없는 압도적인 회전율
          - 데스크톱(md↑): 좌 이미지 / 우 텍스트
          - 모바일(md↓): 타이틀 → 인물 이미지 → desc → 지표
          ======================================================== */}
      {/* 데스크톱 */}
      <div className="mx-auto hidden max-w-[1920px] items-center md:grid md:grid-cols-2 md:gap-0 md:py-28">
        <Reveal direction="left" className="w-full">
          {turnImage}
        </Reveal>
        <div className={`${GUTTER} md:pl-10`}>
          <div className="mx-auto max-w-[600px] [html[lang=en]_&]:max-w-[750px] md:ml-0 md:mr-auto">
            <Reveal direction="up">
              <h2 className="md:text-right">{turnTitle}</h2>
            </Reveal>
            <Reveal direction="up" delay={120}>
              <p className="body-md mt-6 text-ink-soft md:text-right">{turnDesc}</p>
            </Reveal>
            <Reveal
              direction="up"
              delay={240}
              className="mt-10 mb-4 flex md:justify-end"
            >
              {turnMetric}
            </Reveal>
          </div>
        </div>
      </div>

      {/* 모바일 — 타이틀 → 이미지 → 메트릭(이미지 하단 겹침) → desc */}
      <div className="py-16 md:hidden">
        <div className={GUTTER}>
          <Reveal direction="up">
            <h2 className="text-left">{turnTitle}</h2>
          </Reveal>
        </div>
        <Reveal direction="left" className="mt-5 w-full">
          {turnImage}
        </Reveal>
        {/* 메트릭 — 이미지 하단과 겹치도록 위로 당김 */}
        <div className={`relative z-20 -mt-14 ${GUTTER}`}>
          <Reveal direction="up" delay={200}>
            {turnMetric}
          </Reveal>
        </div>
        <div className={`${GUTTER} mt-8`}>
          <Reveal direction="up" delay={120}>
            <p className="body-md text-left text-ink-soft">{turnDesc}</p>
          </Reveal>
        </div>
      </div>

      {/* 섹션 2 마지막 — 제품 상세페이지 버튼 (중앙)
          · 스크롤 시 아래 → 위로 페이드인
          · 호버 시 버튼이 살짝 커지고(scale) 글자·화살표가 우측으로 이동 */}
      <Reveal direction="up" className="flex justify-center pb-24 md:pb-32">
        <ArrowButton href="/product">
          <T ko="제품 상세페이지" en="Product Details" />
        </ArrowButton>
      </Reveal>
    </section>
  );
}
