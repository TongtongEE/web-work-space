import Image from "next/image";

import ArrowButton from "@/components/ArrowButton";
import Reveal from "@/components/Reveal";
import { CONTACT_URL } from "@/lib/links";
import { T } from "@/lib/i18n";

/* ============================================================
   PRODUCT — HERO
   · 배경: postme_kv_1 / postme_kv_2 (1920x956) 크로스페이드 루프
   · 콘텐츠(스크롤 시 아래→위 페이드인): 소제목 · POST ME 로고 · 문의하기 버튼
   ============================================================ */
export default function ProductHero() {
  return (
    <section className="relative h-[80svh] min-h-[520px] w-full overflow-hidden bg-[#0d0d0d] md:h-auto md:min-h-0 md:aspect-[1920/956]">
      {/* 배경 KV 루프 — 하단 이미지 상시 + 상단 이미지 크로스페이드.
          데스크톱(md↑): 1920x956 가로 / 모바일(md↓): 1080x1920 세로 (별도 리소스) */}
      {/* 데스크톱 KV */}
      <Image
        src="/images/product/postme_kv_1.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="hidden object-cover md:block"
      />
      <Image
        src="/images/product/postme_kv_2.jpg"
        alt="AI 로봇 카메라 키비주얼"
        fill
        sizes="100vw"
        className="animate-kv-fade hidden object-cover md:block"
      />
      {/* 모바일 KV */}
      <Image
        src="/images/product/postme_kv_1_m.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover md:hidden"
      />
      <Image
        src="/images/product/postme_kv_2_m.jpg"
        alt="AI 로봇 카메라 키비주얼"
        fill
        sizes="100vw"
        className="animate-kv-fade object-cover md:hidden"
      />

      {/* 콘텐츠
          - 데스크톱(md↑): 원본 1920x956 기준 좌상단 앵커(x321,y329) · 좌측 정렬
          - 모바일(md↓): 전체폭 · 중앙 정렬 (top·카피 크기 등 따로 조정) */}
      <div className="absolute inset-x-0 top-[35%] px-6 text-center md:inset-x-auto md:left-[16.72%] md:top-[34.41%] md:px-0 md:text-left">
        <Reveal direction="up">
          {/* 카피 — 모바일 16px / 데스크톱 25px (모바일 값만 바꾸면 됨) */}
          <p className="text-[18px] leading-relaxed text-white/80 md:text-[25px]">
            <T
              ko="AI 로봇 인터렉티브 미디어 전시"
              en="AI Robot Interactive Media Exhibition"
            />
          </p>

          <Image
            src="/images/product/productpage_logo.svg"
            alt="POST ME"
            width={460}
            height={120}
            priority
            className="mt-4 block h-auto w-[min(70vw,460px)] mx-auto md:mx-0"
          />

          <div className="mt-10 flex justify-center md:justify-start">
            <ArrowButton href={CONTACT_URL} tone="outline" external>
              <T ko="문의하기" en="Contact" />
            </ArrowButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
