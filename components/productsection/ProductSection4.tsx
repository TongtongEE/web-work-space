import Image from "next/image";

import Reveal from "@/components/Reveal";
import { T } from "@/lib/i18n";

/* ============================================================
   PRODUCT — SECTION 4 : 로봇 카메라로만 가능한 독보적인 앵글 워킹
   · 기본은 아래 → 위 페이드인
   · 큰 앵글 이미지: high/low = 오른쪽에서 / normal = 왼쪽에서
   · 앵글 이미지는 원본 비율 그대로, 라운드 없이 바깥 화면 끝까지 블리드
   ============================================================ */
const GUTTER = "px-6 sm:px-10 lg:px-20 xl:px-28";
/** 텍스트 셀 여백 (이미지가 바깥으로 블리드되므로 텍스트만 안쪽 여백 적용) */
const TEXT_PAD = "px-6 sm:px-10 lg:px-16 xl:px-24";

const ANGLES = [
  {
    title: { ko: "하이앵글", en: "High Angle" },
    subtitle: {
      ko: "트렌디한 항공샷과 전신 무드 연출",
      en: "Trendy aerial shots and full-body mood",
    },
    desc: {
      ko: [
        "최대 3m 높이에서 유행하는 항공샷, 정수리샷 등 촬영할 수 있어요.",
        "가로 세로 모드에 따라 전신, 다인 촬영을 손쉽게 할 수 있습니다.",
      ],
      en: [
        "Shoot trendy aerial and top-down shots from up to 3m high.",
        "Easily capture full-body and group shots in portrait or landscape.",
      ],
    },
    angle: "/images/product/high_angle.jpg",
    ratio: "950 / 683",
    angleDir: "left" as const,
    textPad: TEXT_PAD,
    samples: [
      { src: "/images/product/high_sample_1.jpg", w: 267, h: 400 },
      { src: "/images/product/high_sample_2.jpg", w: 400, h: 268 },
    ],
    imageLeft: true,
  },
  {
    title: { ko: "노멀앵글", en: "Normal Angle" },
    subtitle: {
      ko: "가장 완벽하고 안정적인 시그니처 컷",
      en: "The most perfect, stable signature cut",
    },
    desc: {
      ko: ["정면 구도의 정석적인 프레임부터 카메라 회전 기능을 활용한 다이나믹한 더치샷(Tilt)까지 지원합니다. 브랜드 팝업의 기본 인증샷부터 프로필 퀄리티까지 안정적인 결과물을 보장합니다."],
      en: ["From classic head-on framing to dynamic Dutch (tilt) shots using camera rotation. It guarantees stable results, from basic brand-pop-up proof shots to profile-grade quality."],
    },
    angle: "/images/product/normal_angle.jpg",
    ratio: "968 / 683",
    angleDir: "right" as const,
    // 텍스트 블록 좌측 시작점(md:pl) — 값 ↑ = 더 오른쪽. (약 12vw↑부터 샘플 줄바꿈)
    textPad: "px-6 sm:px-10 md:pr-12 md:pl-[9.5vw]",
    samples: [
      { src: "/images/product/normal_sample_1.jpg", w: 267, h: 400 },
      { src: "/images/product/normal_sample_2.jpg", w: 400, h: 269 },
    ],
    imageLeft: false,
  },
  {
    title: { ko: "로우앵글", en: "Low Angle" },
    subtitle: {
      ko: "압도적인 비율을 만드는 스트릿 감성",
      en: "Street mood with overwhelming proportions",
    },
    desc: {
      ko: ["바닥에서 위를 올려다보는 과감한 로우앵글로 다리가 길어 보이는 완벽한 비율의 인생샷을 완성합니다. 일반 포토부스에서는 흉내 낼 수 없는 로봇 카메라만의 개성 있는 구도를 선사합니다."],
      en: ["A bold low angle looking up from the floor delivers leg-lengthening, perfectly proportioned shots. It offers distinctive compositions only a robot camera can, beyond any ordinary photo booth."],
    },
    angle: "/images/product/low_angle.jpg",
    ratio: "960 / 693",
    angleDir: "left" as const,
    textPad: TEXT_PAD,
    samples: [
      { src: "/images/product/low_sample_1.jpg", w: 267, h: 400 },
      { src: "/images/product/low_sample_2.jpg", w: 400, h: 269 },
    ],
    imageLeft: true,
  },
] as const;

export default function ProductSection4() {
  return (
    <section className="py-24 md:py-32">
      <div className={`mx-auto max-w-[1400px] ${GUTTER}`}>
        <Reveal direction="up">
          <h2 className="text-center">
            <T
              ko="로봇카메라만 가능한 독보적 앵글 워킹"
              en="Signature angle work only a robot camera can achieve"
            />
          </h2>
        </Reveal>
        <Reveal direction="up" delay={120}>
          <p className="body-md mx-auto mt-5 max-w-[760px] text-center text-ink-soft">
            <T
              ko={
                <>
                  하이앵글부터 로우앵글까지, 단 한 대의 장비로 다채로운 컨셉 촬영이
                  가능합니다.{" "}
                  <br className="hidden md:block" />
                  여러 구도의 사진을 한 프레임에 담아 방문객에게 특별한 브랜드 소장
                  가치를 선물하세요.
                </>
              }
              en={
                <>
                  From high to low angles, one single device captures a rich
                  variety of concepts.
                 
                  Combine multiple compositions in one frame to give visitors a
                  keepsake worth treasuring.
                </>
              }
            />
          </p>
        </Reveal>
      </div>

      <div className="mt-20 md:mt-30 space-y-24 md:space-y-28">
        {ANGLES.map((a) => (
          <div key={a.title.ko}>
            {/* 모바일(md↓) 전용 타이틀 — 이미지 위에 배치
                (순서: 타이틀 → 이미지 → desc → 샘플) */}
            <div className={`md:hidden ${a.textPad}`}>
              <Reveal direction="up">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3>
                    <T ko={a.title.ko} en={a.title.en} />
                  </h3>
                  <span className="body-md font-medium text-ink-soft">
                    <T ko={a.subtitle.ko} en={a.subtitle.en} />
                  </span>
                </div>
              </Reveal>
            </div>

            <div className="mt-6 grid items-center gap-8 md:mt-0 md:grid-cols-2 md:gap-0">
              {/* 큰 앵글 이미지 — 원본 비율 그대로, 라운드 없이 바깥 끝까지 블리드 */}
              <Reveal
                direction={a.angleDir}
                className={a.imageLeft ? "md:order-1" : "md:order-2"}
              >
                <div
                  className="relative w-full"
                  style={{ aspectRatio: a.ratio }}
                >
                  <Image
                    src={a.angle}
                    alt={a.title.ko}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>

              {/* 텍스트 + 샘플 2컷 (아래 → 위) */}
              <div
                className={`${a.textPad} ${a.imageLeft ? "md:order-2" : "md:order-1"}`}
              >
                {/* 타이틀(h3) + 우측 subtitle — 데스크톱만(모바일은 이미지 위에) */}
                <Reveal direction="up" className="hidden md:block">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3>
                      <T ko={a.title.ko} en={a.title.en} />
                    </h3>
                    <span
                      aria-hidden="true"
                      className="body-lg hidden text-ink/25 md:inline"
                    >
                      |
                    </span>
                    <span className="body-md font-medium text-ink-soft">
                      <T ko={a.subtitle.ko} en={a.subtitle.en} />
                    </span>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={120}>
                <p className="body-md mt-4 max-w-[660px] text-ink-soft">
                  <T
                    ko={a.desc.ko.map((line, i) => (
                      <span key={i}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    ))}
                    en={a.desc.en.map((line, i) => (
                      <span key={i}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  />
                </p>
              </Reveal>

              {/* 결과물 샘플 — 자연 너비 비율(세로 267 : 가로 400)로 열을 나눠
                  컨테이너 폭에 맞춰 함께 스케일. 각 이미지는 w-full/h-auto 로
                  비율 유지하며 해상도에 따라 커지고 작아짐. */}
              <div className="mt-8 flex items-center gap-4">
                {a.samples.map((s, i) => (
                  <div
                    key={s.src}
                    className="min-w-0"
                    style={{ flex: `${s.w} 1 0%` }}
                  >
                    <Reveal direction="up" delay={200 + i * 100}>
                      <Image
                        src={s.src}
                        alt={`${a.title.ko} ${i + 1}`}
                        width={s.w}
                        height={s.h}
                        sizes="(min-width: 768px) 30vw, 45vw"
                        className="h-auto w-full rounded-xl"
                      />
                    </Reveal>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        ))}
      </div>
    </section>
  );
}
