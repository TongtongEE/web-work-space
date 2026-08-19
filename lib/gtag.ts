/* ============================================================
   Google Analytics 4 (GA4) — 이벤트 전송 유틸
   ------------------------------------------------------------
   · 스크립트 로드는 app/layout.tsx 의 <Script>(next/script)가 담당한다.
   · 이 파일은 TSX 컴포넌트에서 window.gtag 를 타입 에러 없이
     호출하기 위한 Window 타입 선언 + 얇은 래퍼 함수만 제공한다.

   사용 예 (버튼 클릭 이벤트):

     "use client";
     import { gaEvent } from "@/lib/gtag";

     <button onClick={() => gaEvent("contact_click", { location: "navbar" })}>
       문의하기
     </button>
   ============================================================ */

/** GA4 측정 ID (Measurement ID) */
export const GA_MEASUREMENT_ID = "G-N6YCD6YCRB";

/** gtag()에 넘길 수 있는 파라미터 값 */
type GtagParamValue = string | number | boolean | null | undefined;

/** 이벤트/설정에 함께 보내는 파라미터 객체 */
export type GtagParams = Record<string, GtagParamValue>;

/** gtag() 호출 시그니처 — 실제로 쓰는 커맨드만 좁게 정의 */
type GtagCommands =
  | ["js", Date]
  | ["config", string, GtagParams?]
  | ["event", string, GtagParams?]
  | ["set", GtagParams];

declare global {
  interface Window {
    /** gtag.js가 밀어 넣는 큐 배열 */
    dataLayer?: unknown[];
    /**
     * gtag.js 전역 함수.
     * 스크립트 로드 전/차단(광고 차단기)된 경우 undefined 일 수 있으므로 optional.
     */
    gtag?: (...args: GtagCommands) => void;
  }
}

/**
 * gtag.js 가 실제로 호출 가능한 상태인지 확인.
 * (SSR/정적 프리렌더 시점에는 window 자체가 없다 — output: 'export' 환경 주의)
 */
export function isGaReady(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

/**
 * GA4 커스텀 이벤트 전송.
 * @param name   이벤트 이름 (예: "contact_click", "portfolio_view")
 * @param params 함께 보낼 파라미터 (선택)
 */
export function gaEvent(name: string, params?: GtagParams): void {
  if (!isGaReady()) return;
  window.gtag?.("event", name, params);
}

/**
 * 수동 페이지뷰 전송.
 * GA4 향상된 측정(브라우저 방문 기록 변경)이 SPA 이동을 대부분 잡아주므로 보통은 불필요하지만,
 * 직접 제어가 필요할 때 사용한다.
 * @param path 예: "/product#ai"
 */
export function gaPageview(path: string): void {
  if (!isGaReady()) return;
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
