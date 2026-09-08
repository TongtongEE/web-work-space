import ArrowButton from "@/components/ArrowButton";
import InViewVideo from "@/components/InViewVideo";
import LangImage from "@/components/LangImage";
import Reveal from "@/components/Reveal";
import { CONTACT_URL } from "@/lib/links";
import { T } from "@/lib/i18n";

/* ============================================================
   PRODUCT — SECTION 7 : GLAMOTION
   1) glamotion 배너 fade-in + 글로우 (소제목 문구는 이미지에 포함)
   2) 대표 클립 1개(왼쪽) + 카피(오른쪽)
   3) 인/아웃트로 브랜딩 카피 (같은 칼럼) + 클립 3개 나란히
   4) 하단 문의 버튼
   · 영상 원본은 1080×1350 → 표시 규격 496×620 (동일한 4:5)
   ============================================================ */
const GUTTER = "px-6 sm:px-10 lg:px-20 xl:px-28";

/** 하단 3컷 — homepage_glamotion_2 · 3 · 4 순서 */
const CLIPS = [
  { src: "/videos/homepage_glamotion_2.mp4", label: { ko: "글래모션 촬영 예시 1", en: "Glamotion sample 1" } },
  { src: "/videos/homepage_glamotion_3.mp4", label: { ko: "글래모션 촬영 예시 2", en: "Glamotion sample 2" } },
  { src: "/videos/homepage_glamotion_4.mp4", label: { ko: "글래모션 촬영 예시 3", en: "Glamotion sample 3" } },
] as const;

export default function ProductSection7() {
  return (
    <section className="py-24 md:py-32">
      {/* GLAMOTION 배너 — 페이드인
          좌우가 잘리지 않도록 항상 컨테이너 폭에 맞추고, 좁아지면 비율 유지한 채 축소
          · 공지 배너(/product#glamotion)가 이 지점으로 착지 —
            scroll-mt 로 고정 네비게이션 바(+공지 배너) 아래에 오도록 내려준다. */}
      <div id="glamotion" className="scroll-mt-[150px] md:scroll-mt-[170px]">
        <Reveal direction="fade" duration={3000}>
          {/* 데스크톱 (md↑) — 국문 glamotion.png 1920×572 / 영문 glamotion_en.png 1924×572
              (소제목 1줄) · KO·EN 의 가로 길이가 미세하게 달라 고정 aspect 대신
                h-auto 로 각 이미지의 원본 비율을 따르게 한다.
              · 두 파일 모두 투명 여백 0px (캔버스 끝까지 내용) 이라 좌우 폭이 일치한다.
                ※ 영문판을 다시 내보낼 때 주변 여백이 들어가면 KO 보다 안쪽으로
                  들어가 보이므로, 여백 없이 내보낼 것. (원본은 _original_media/images/) */}
          <div className="mx-auto hidden w-full max-w-[1652px] md:block">
            <LangImage
              src="/images/product/glamotion.png"
              alt="GLAMOTION"
              width={1920}
              height={572}
              sizes="100vw"
              className="h-auto w-full"
            />
          </div>
          {/* 모바일 (md↓) — 국문 glamotion_m.png 1376×561 / 영문 glamotion_m_en.png 1376×612
              워드마크가 크고 소제목이 2줄로 조판되어 좁은 화면에서도 읽힌다.
              · 좌우 가장자리가 투명(알파 0) → 옅은 글로우 순으로 이어져 w-full 이면
                시안 띠가 화면 끝에 못 닿고 여백처럼 보인다. w-[133%] 로 밀어내 꽉 채운다.
                잘리는 좌우 각 12.5% 는 알파 0~81 의 옅은 글로우뿐 (본체는 ~127).
              · KO(561) 와 EN(612) 의 세로 길이가 달라 고정 aspect 컨테이너를 쓰지 않고
                h-auto 로 두어 각 이미지가 자기 원본 비율을 그대로 따르게 한다. */}
          <div className="relative left-1/2 w-[133%] max-w-none -translate-x-1/2 md:hidden">
            <LangImage
              src="/images/product/glamotion_m.png"
              alt="GLAMOTION"
              width={1376}
              height={561}
              sizes="133vw"
              className="h-auto w-full"
            />
          </div>
        </Reveal>
      </div>

      <div className={`mx-auto max-w-[1400px] ${GUTTER}`}>
        {/* 대표 클립 + 카피 */}
        <div className="mt-16 grid items-center gap-10 md:mt-24 md:grid-cols-2 md:gap-16">
          <Reveal direction="left" className="w-full">
            <InViewVideo
              src="/videos/homepage_glamotion_1.mp4"
              label="글래모션 대표 촬영 영상"
              className="max-w-[496px] rounded-2xl md:ml-auto"
            />
          </Reveal>

          <div>
            <Reveal direction="up">
              <h3 className="whitespace-pre-line">
                <T
                  ko={"모든 이벤트의 스포트라이트,\n주인공은 바로 당신!"}
                  en={"The spotlight of every event —\nand you are the star!"}
                />
              </h3>
            </Reveal>
            <Reveal direction="up" delay={120}>
              <p className="body-md mt-5 max-w-[560px] text-ink-soft">
                <T
                  ko={
                    <>
                      시상식부터 브랜드 팝업까지 다양한 이벤트 현장에서
                      <br className="hidden md:block" />
                      Glamotion은 당신이 서 있는 모든 무대를 압도적인 주인공의 순간으로 만듭니다.
                    </>
                  }
                  en="From award ceremonies to brand pop-ups, at every kind of event, Glamotion turns every stage you stand on into a commanding starring moment."
                />
              </p>
            </Reveal>

            {/* 인/아웃트로 브랜딩 — 같은 텍스트 칼럼 안에 이어서 배치 */}
            <Reveal direction="up" delay={200}>
              <h4 className="mt-10">
                <T ko="완벽한 인/아웃트로 브랜딩" en="Flawless intro & outro branding" />
              </h4>
            </Reveal>
            <Reveal direction="up" delay={280}>
              <p className="body-md mt-4 max-w-[560px] text-ink-soft">
                <T
                  ko={
                    <>
                      촬영 콘텐츠 앞뒤로 브랜딩을 자연스럽게 결합하여
                      <br className="hidden md:block" />
                      영상이 공유되는 모든 순간 브랜드 노출 효과를 극대화합니다.
                    </>
                  }
                  en="Your branding is woven naturally into the start and end of every clip, maximizing brand exposure every time the video is shared."
                />
              </p>
            </Reveal>
          </div>
        </div>

        {/* 하단 3컷 리드 카피 — 데스크톱은 가운데 정렬(Section4·5 인트로와 동일),
            모바일은 좁은 폭에서 가운데 정렬이 들쭉날쭉해 보여 좌측 정렬 */}
        <Reveal direction="up" className="mt-20 md:mt-28">
          <p className="body-md mx-auto max-w-[880px] text-left text-ink-soft md:text-center">
            <T
              ko={
                <>
                  Glamotion만의 감각적인 슬로모션 연출로
                  <br className="hidden md:block" />
                  매 순간을 영화 속 주인공처럼 사로잡는 비주얼 콘텐츠를 선사합니다.
                </>
              }
              en={
                <>
                  Captivate your audience with Glamotion&apos;s signature slow motion,
                  <br className="hidden md:block" />
                  transforming every moment into a cinematic main-character experience.
                </>
              }
            />
          </p>
        </Reveal>

        {/* 클립 3컷 */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3 md:mt-14 md:gap-8">
          {CLIPS.map((c, i) => (
            <Reveal key={c.src} direction="up" delay={120 + i * 120}>
              <InViewVideo src={c.src} label={c.label.ko} className="rounded-2xl" />
            </Reveal>
          ))}
        </div>

        {/* 하단 버튼 */}
        <Reveal direction="up" className="mt-24 flex justify-center md:mt-32">
          <ArrowButton href={CONTACT_URL} tone="brand" external>
            <T ko="문의하기" en="Contact" />
          </ArrowButton>
        </Reveal>
      </div>
    </section>
  );
}
