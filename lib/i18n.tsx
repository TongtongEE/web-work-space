"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { LANG_COOKIE, type Lang } from "@/lib/lang";

/* ============================================================
   다국어(KO/EN) — 전역 언어 상태 + <T> 헬퍼
   ------------------------------------------------------------
   · output: 'export'(정적 배포)라 서버에서 쿠키를 읽을 수 없다
     (Next 문서 static-exports "Unsupported Features"). 따라서 언어는
     전적으로 클라이언트에서 결정한다.
   · 프리렌더 HTML은 항상 KO → 하이드레이션 직후 저장된 언어로 교체(새로고침 없음).
   · 저장은 localStorage(주) + 쿠키(구버전 값 승계·폴백) 양쪽에.
   · 서버 컴포넌트는 <T ko en /> 만 심으면 되고, 클라이언트 컴포넌트는
     useLang() 으로 문자열(alt/aria 등)을 직접 고른다.
   ============================================================ */

export type { Lang } from "@/lib/lang";

const DEFAULT_LANG: Lang = "KO";

const isLang = (v: unknown): v is Lang => v === "KO" || v === "EN";

/** 저장된 언어 읽기 — localStorage 우선, 없으면 기존 쿠키에서 승계 */
function readStoredLang(): Lang | null {
  try {
    const saved = window.localStorage.getItem(LANG_COOKIE);
    if (isLang(saved)) return saved;
  } catch {
    // 사파리 프라이빗 모드 등 localStorage 접근 차단 → 쿠키로 폴백
  }
  const fromCookie = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${LANG_COOKIE}=`))
    ?.slice(LANG_COOKIE.length + 1);
  return isLang(fromCookie) ? fromCookie : null;
}

function persistLang(l: Lang) {
  try {
    window.localStorage.setItem(LANG_COOKIE, l);
  } catch {
    // 무시 — 아래 쿠키 저장으로 대체
  }
  // 1년 유지 (localStorage를 못 쓰는 환경 대비)
  document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
}

/* ---------- 언어 스토어 (useSyncExternalStore용 외부 저장소) ----------
   렌더 중 localStorage를 매번 읽지 않도록 모듈 스코프에 캐시한다.
   getSnapshot 은 동일 값에 대해 항상 같은 참조를 반환해야 하므로 문자열만 다룬다. */
let cached: Lang | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): Lang {
  if (cached === null) cached = readStoredLang() ?? DEFAULT_LANG;
  return cached;
}

/** 서버·하이드레이션 시점 값 — 프리렌더 HTML과 일치해야 한다 */
function getServerSnapshot(): Lang {
  return DEFAULT_LANG;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // 다른 탭에서 언어를 바꾼 경우도 반영
  const onStorage = (e: StorageEvent) => {
    if (e.key !== LANG_COOKIE) return;
    cached = isLang(e.newValue) ? e.newValue : DEFAULT_LANG;
    listeners.forEach((l) => l());
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function writeLang(l: Lang) {
  if (cached === l) return;
  cached = l;
  persistLang(l);
  listeners.forEach((l) => l());
}

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // <html lang> 도 현재 언어에 맞춰 갱신 (스크린 리더·번역기 힌트)
  useEffect(() => {
    document.documentElement.lang = lang === "EN" ? "en" : "ko";
  }, [lang]);

  const setLang = useCallback((l: Lang) => writeLang(l), []);
  const toggle = useCallback(
    () => writeLang(lang === "KO" ? "EN" : "KO"),
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLang, toggle }),
    [lang, setLang, toggle],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within <LanguageProvider>");
  }
  return ctx;
}

/** 언어에 따라 ko/en 중 하나를 렌더. 서버 컴포넌트 안에서도 사용 가능(클라이언트 리프). */
export function T({ ko, en }: { ko: ReactNode; en: ReactNode }) {
  const { lang } = useLang();
  return <>{lang === "EN" ? en : ko}</>;
}
