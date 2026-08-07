import Image from "next/image";

/**
 * 호버 시 normal → hover 이미지로 전환 (CSS만, JS 불필요).
 * ※ 모바일 등 hover 불가 기기([@media(hover:none)])에서는 hover 이미지가 기본 상태로 고정.
 */
export default function HoverSwapImage({
  normalSrc,
  hoverSrc,
  alt,
  ratio,
  sizes,
  className = "",
}: {
  normalSrc: string;
  hoverSrc: string;
  alt: string;
  /** 박스 비율 (예: "699 / 567") */
  ratio: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={normalSrc}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-opacity duration-500 group-hover:opacity-0 [@media(hover:none)]:opacity-0"
      />
      <Image
        src={hoverSrc}
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
      />
    </div>
  );
}
