import Image from "next/image";

/**
 * 파트너/클라이언트 로고 무한 롤링 마퀴.
 * - 동일한 로고 리스트를 2벌 나란히 두고 각각 translateX(0 → -100%) 애니메이션 → 이음매 없이 반복.
 * - 마우스 호버 시 일시정지, prefers-reduced-motion 시 정지.
 * - 로고 리소스는 /public/images/logos/ 에 넣고 아래 LOGOS 배열에 추가하면 됩니다.
 *   (파일이 없어도 레이아웃은 유지됨. 슬롯 크기 고정 + object-contain 이라 로고 비율은 안 깨짐)
 */
const LOGOS = [
  { src: "/images/logos/logo-1.png", alt: "파트너 로고 1" },
  { src: "/images/logos/logo-2.png", alt: "파트너 로고 2" },
  { src: "/images/logos/logo-3.png", alt: "파트너 로고 3" },
  { src: "/images/logos/logo-4.png", alt: "파트너 로고 4" },
  { src: "/images/logos/logo-5.png", alt: "파트너 로고 5" },
  { src: "/images/logos/logo-6.png", alt: "파트너 로고 6" },
  { src: "/images/logos/logo-7.png", alt: "파트너 로고 7" },
  { src: "/images/logos/logo-8.png", alt: "파트너 로고 8" },
] as const;

export default function LogoMarquee() {
  return (
    <div className="group relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className="flex shrink-0 animate-marquee items-center gap-16 pr-16 group-hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]"
        >
          {LOGOS.map((logo, i) => (
            <li
              key={i}
              className="relative h-11 w-36 shrink-0 opacity-70 grayscale transition hover:opacity-100 hover:scale-105 duration-300 hover:grayscale-0"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                sizes="144px"
                className="object-contain"
              />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
