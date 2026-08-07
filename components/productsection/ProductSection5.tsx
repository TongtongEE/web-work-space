import Image from "next/image";

import Reveal from "@/components/Reveal";
import { T } from "@/lib/i18n";

/* ============================================================
   PRODUCT — SECTION 5 : 브랜드 무드를 그대로 담는 맞춤형 프레임
   · 모든 요소 스크롤 시 아래 → 위 페이드인
   ============================================================ */
const GUTTER = "px-6 sm:px-10 lg:px-20 xl:px-28";

export default function ProductSection5() {
  return (
    <section className={`mx-auto max-w-[1400px] ${GUTTER} py-24 md:py-32`}>
      <Reveal direction="up">
        <h2 className="text-center">
          <T
            ko="브랜드 무드를 그대로 담는 맞춤형 프레임"
            en="Custom frames that capture your brand mood"
          />
        </h2>
      </Reveal>
      <Reveal direction="up" delay={120}>
        <p className="body-md mx-auto mt-5 max-w-[800px] text-center text-ink-soft">
          <T
            ko={
              <>
                원하는 레이아웃부터 고유의 브랜드 컬러, 로고 배치까지 자유롭게 디자인할 수 있습니다.
                <br/>우리 브랜드만의 독창적인 포토 프레임으로 특별한 소장 가치를 완성하세요.
              </>
            }
            en={
              <>
                Design freely — from the layout you want to your own brand colors and logo placement.
                Complete a keepsake worth treasuring with a photo frame unique to your brand.
              </>
            }
          />
        </p>
      </Reveal>

      <Reveal direction="up" delay={200}>
        <div className="relative mt-14 aspect-[1628/1160] w-full overflow-hidden">
          <Image
            src="/images/product/photo_frames.png"
            alt="맞춤형 프레임 디자인 예시 모음"
            fill
            sizes="(min-width: 1280px) 1224px, 100vw"
            className="object-contain"
          />
        </div>
      </Reveal>
    </section>
  );
}
