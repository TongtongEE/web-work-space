"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { LANG_COOKIE, type Lang } from "@/lib/lang";

/* ============================================================
   다국어(KO/EN) — 전역 언어 상태 + <T> 헬퍼
   ------------------------------------------------------------
   · 언어는 쿠키(postme-lang)에 저장 → 서버(layout)가 읽어 SSR 초기 언어로 사용.
   · 언어 변경 시 쿠키를 쓰고 전체 새로고침 → 새 언어로 서버 렌더(깜빡임 없음).
   · 서버 컴포넌트는 <T ko en /> 만 심으면 되고, 클라이언트 컴포넌트는
     useLang() 으로 문자열(alt/aria 등)을 직접 고른다.
   ============================================================ */

export type { Lang } from "@/lib/lang";

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

function persistAndReload(l: Lang) {
  // 1년 유지. 쓰고 나서 전체 새로고침 → 서버가 쿠키를 읽어 새 언어로 렌더.
  document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
  window.location.reload();
}

export function LanguageProvider({
  initialLang = "KO",
  children,
}: {
  initialLang?: Lang;
  children: ReactNode;
}) {
  // 서버가 넘겨준 초기 언어로 시작 → SSR·CSR 일치. 변경은 새로고침으로 처리.
  const [lang] = useState<Lang>(initialLang);

  const setLang = useCallback((l: Lang) => {
    if (l === lang) return;
    persistAndReload(l);
  }, [lang]);

  const toggle = useCallback(() => {
    persistAndReload(lang === "KO" ? "EN" : "KO");
  }, [lang]);

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
