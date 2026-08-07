/* 언어 상수/타입 — 서버·클라이언트 공용 (일반 모듈: "use client" 아님).
   ※ 서버 컴포넌트가 "use client" 모듈에서 값을 import하면 실제 값이 아니라
     클라이언트 참조를 받으므로, 쿠키 키 같은 공용 값은 여기서 관리한다. */

export type Lang = "KO" | "EN";

export const LANG_COOKIE = "postme-lang";

/**
 * 문구가 그려진 이미지의 영문판 경로 — 국문 파일명 뒤에 `_en` 을 붙인 규칙.
 * 예) /images/product/postme_ai.png → /images/product/postme_ai_en.png
 */
export function enImageSrc(src: string): string {
  return src.replace(/(\.[^./]+)$/, "_en$1");
}

/** 현재 언어에 맞는 이미지 경로 (EN 이면 _en 버전) */
export function langImageSrc(src: string, lang: Lang): string {
  return lang === "EN" ? enImageSrc(src) : src;
}
