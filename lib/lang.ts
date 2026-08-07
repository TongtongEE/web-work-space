/* 언어 상수/타입 — 서버·클라이언트 공용 (일반 모듈: "use client" 아님).
   ※ 서버 컴포넌트가 "use client" 모듈에서 값을 import하면 실제 값이 아니라
     클라이언트 참조를 받으므로, 쿠키 키 같은 공용 값은 여기서 관리한다. */

export type Lang = "KO" | "EN";

export const LANG_COOKIE = "postme-lang";
