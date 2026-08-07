"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * 고정 비율 박스 안에서 뷰포트 폭에 따라 이미지를 좌측 기준으로 확대/축소.
 * - 넓은 화면(≥toW): scale = maxScale → 인물(좌측)이 프레임을 채우고 우측 여백은 박스 밖으로 잘림
 * - 좁아질수록(→fromW): scale = 1 → 원본 전체(우측 여백 포함)가 그대로 드러남
 * 박스 비율(ratio)은 항상 고정, 인물 크기만 변함. 여백은 이미지 자체의 것(페이지 배경 노출 없음).
 *
 * ※ 잘림은 object-fit 크롭이 아니라 박스(overflow-hidden) 밖으로 밀려나는 방식.
 */
export default function BleedZoomImage({
  src,
  alt,
  ratio,
  sizes,
  side = "left",
  maxScale = 1.16,
  fromW = 1400,
  toW = 1920,
  boxClassName = "",
}: {
  src: string;
  alt: string;
  /** 박스 고정 비율 (예: "1325 / 704") */
  ratio: string;
  sizes?: string;
  /** 고정할 쪽(확대 기준). left=좌측 고정·우측 여백 잘림 / right=우측 고정·좌측 여백 잘림 */
  side?: "left" | "right";
  /** 최대 확대율 (인물이 프레임을 꽉 채우는 배율) */
  maxScale?: number;
  /** 축소가 끝나는(=scale 1) 뷰포트 폭 */
  fromW?: number;
  /** 최대 확대가 되는 뷰포트 폭 */
  toW?: number;
  boxClassName?: string;
}) {
  const anchorRight = side === "right";
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const t = Math.min(1, Math.max(0, (w - fromW) / (toW - fromW)));
      setScale(1 + (maxScale - 1) * t);
    };
    // 초기 1회는 rAF로 비동기 실행(effect 내 동기 setState 회피)
    const raf = requestAnimationFrame(update);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
    };
  }, [fromW, toW, maxScale]);

  return (
    <div
      className={`relative w-full overflow-hidden ${boxClassName}`}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover ${anchorRight ? "object-right" : "object-left"}`}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: anchorRight ? "right center" : "left center",
        }}
      />
    </div>
  );
}
