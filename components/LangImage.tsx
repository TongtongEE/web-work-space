"use client";

import Image, { type ImageProps } from "next/image";

import { useLang } from "@/lib/i18n";
import { langImageSrc } from "@/lib/lang";

/**
 * 문구가 그려진 이미지를 언어에 따라 교체하는 <Image> 래퍼.
 * - src 는 국문(기본) 경로 → EN 일 때 파일명 뒤 `_en` 버전을 사용.
 * - <T> 와 동일하게 서버 컴포넌트 안에서도 쓸 수 있는 클라이언트 리프.
 */
export default function LangImage({
  src,
  alt,
  altEn,
  ...rest
}: Omit<ImageProps, "src"> & {
  src: string;
  /** 영문일 때 쓸 대체 텍스트 (없으면 alt 그대로) */
  altEn?: string;
}) {
  const { lang } = useLang();
  return (
    <Image
      src={langImageSrc(src, lang)}
      alt={lang === "EN" && altEn ? altEn : alt}
      {...rest}
    />
  );
}
