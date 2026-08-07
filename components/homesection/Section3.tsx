import ArrowButton from "@/components/ArrowButton";
import CountUp from "@/components/CountUp";
import LogoMarquee from "@/components/LogoMarquee";
import Reveal from "@/components/Reveal";
import { CONTACT_URL } from "@/lib/links";
import { T } from "@/lib/i18n";

/* ============================================================
   SECTION 3 — 프로젝트 숫자가 입증한 신뢰도
     · 좌: 제목(h) + 본문   / 우: 성과 지표 카드(카운트업)
     · 하단: 파트너 로고 무한 마퀴
     · 그 아래: 포트폴리오 / 문의하기 버튼 (섹션2 버튼과 동일)
   ============================================================ */

/** 좌우 여백(거터) — 다른 섹션과 정렬 */
const GUTTER = "px-6 sm:px-10 lg:px-20 xl:px-28";

/** 성과 지표 (뷰포트 진입 시 0 → value 카운트업, 접미사 "+") */
const STATS = [
  { value: 30, label: { ko: "프로젝트", en: "Projects run" } },
  { value: 10000, label: { ko: "누적 체험", en: "Total experiences" } },
] as const;

export default function Section3() {
  return (
    <section aria-label="프로젝트 신뢰도" className="relative">
      {/* 제목/본문 + 성과 카드 */}
      <div
        className={`mx-auto grid max-w-[1620px] items-center gap-0 ${GUTTER} py-20 md:grid-cols-2 md:py-28`}
      >
        {/* 좌측 — 제목 + 본문 (스크롤 시 아래 → 위로 페이드인) */}
        <div>
          <Reveal direction="up">
            <h2>
              <T
                ko={
                  <>
                    프로젝트 숫자가
                    <br />
                    입증한 신뢰도
                  </>
                }
                en={
                  <>
                    Trust proven by
                    <br />
                    the numbers
                  </>
                }
              />
            </h2>
          </Reveal>
          <Reveal direction="up" delay={120}>
            <p className="body-md mt-6 max-w-[550px] text-ink-soft">
              <T
                ko={
                  <>
                    트렌디한 브랜드 팝업부터 대형 전시까지,{" "}
                    <br className="hidden md:block" />
                    검증된 솔루션으로 리스크 없는 완벽한 행사를 완성하세요.
                  </>
                }
                en={
                  <>
                    From trendy brand pop-ups to large-scale exhibitions,{" "}
                    <br className="hidden md:block" />
                    deliver a flawless, risk-free event with a proven solution.
                  </>
                }
              />
            </p>
          </Reveal>
        </div>

        {/* 우측 — 성과 지표 카드 (오른쪽에서 제자리로 페이드인) */}
        <Reveal direction="right">
          <div className="rounded-[32px] bg-white px-0 py-20 shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:px-0 mt-5 md:mt-0">
            <div className="grid grid-cols-2 divide-x divide-black/10 px">
              {STATS.map((stat) => (
                <div
                  key={stat.label.ko}
                  className="flex flex-col items-center px-4 mr-5 text-center"
                >
                  <span className="flex items-start font-heading text-[clamp(40px,5vw,80px)] leading-none text-ink">
                    <CountUp end={stat.value} />
                    <span className="ml-1 text-[0.5em] font-light text-ink/30">
                      +
                    </span>
                  </span>
                  <span className="body-md mt-3 text-ink-soft">
                    <T ko={stat.label.ko} en={stat.label.en} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* 파트너 로고 무한 마퀴 — 상/하 여백 분리 (모바일 pt·pb 개별 조정) */}
      <div className="pt-0 pb-0 md:pt-16 md:pb-16">
        <LogoMarquee />
      </div>

      {/* CTA 버튼 — 섹션2 버튼과 동일(스크롤 up 등장, 호버 확대+이동) */}
      <Reveal
        direction="up"
        className="flex flex-wrap justify-center gap-4 pb-24 pt-14 md:pb-32"
      >
        <ArrowButton href="/portfolio">
          <T ko="포트폴리오" en="Portfolio" />
        </ArrowButton>
        <ArrowButton
          href={CONTACT_URL}
          tone="brand"
          external
          className="mt-20 md:mt-0"
        >
          <T ko="문의하기" en="Contact" />
        </ArrowButton>
      </Reveal>
    </section>
  );
}
