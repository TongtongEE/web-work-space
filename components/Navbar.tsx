"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { CONTACT_URL } from "@/lib/links";
import { useLang } from "@/lib/i18n";

/** 우측 내부 라우팅 메뉴 */
const NAV_LINKS = [
  { label: "Home", href: "/" },
  /*{ label: "Brand", href: "/brand" },*/
  { label: "Product", href: "/product" },
  { label: "Portfolio", href: "/portfolio" },
] as const;

/** 글래스모피즘 배경 (네비 바 · 모바일 드로어 공용) */
const GLASS =
  "bg-[#282828]/50 shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-md backdrop-contrast-120 backdrop-saturate-500 border-[image:linear-gradient(to_right,rgba(255,255,255,1),rgba(255,255,255,0.2),rgba(255,255,255,0.1))_1]";

/**
 * 상단 고정 네비게이션 바
 * - 데스크톱(md↑): 로고 + Home·Product·Portfolio·Contact·KO/EN 한 줄
 * - 모바일(md↓): 로고 + 햄버거 → 탭 시 드로어 펼침
 */
export default function Navbar() {
  const { lang, toggle } = useLang();
  const [open, setOpen] = useState(false);

  // 새로고침 시 브라우저의 스크롤 위치 복원을 끄고 항상 최상단(hero)에서 시작
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const langToggle = (
    <button
      type="button"
      onClick={toggle}
      aria-label="언어 전환 (한국어/영어)"
      className="flex items-center gap-2 rounded-full border border-white/40 px-4 py-1.5 text-sm"
    >
      <span
        className={`transition-colors duration-300 ${
          lang === "KO"
            ? "font-semibold text-green-400"
            : "hover:text-brand text-white/40"
        }`}
      >
        KO
      </span>
      <span className="text-white/25">|</span>
      <span
        className={`transition-colors duration-300 ${
          lang === "EN"
            ? "font-semibold text-green-400"
            : "hover:text-brand text-white/40"
        }`}
      >
        EN
      </span>
    </button>
  );

  return (
    <header className="fixed left-1/2 top-6 z-50 w-[1487px] max-w-[calc(100vw-2rem)] -translate-x-1/2">
      <nav
        className={`flex h-[68px] items-center justify-between rounded-2xl px-6 md:h-[78px] md:px-8 lg:px-14 xl:px-20 ${GLASS}`}
      >
        {/* 로고 → 메인 홈(hero). 클릭 시 전체 새로고침으로 항상 최상단에서 시작
            (⌘/Ctrl/새 탭 클릭 등은 기본 동작 유지) */}
        <Link
          href="/"
          aria-label="POST ME 홈으로 이동 (새로고침)"
          className="transition-opacity hover:opacity-80"
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            window.location.assign("/");
          }}
        >
          <Image
            src="/postme-logo.svg"
            alt="POST ME"
            width={130}
            height={32}
            priority
            className="h-6 w-auto md:h-7"
          />
        </Link>

        {/* 데스크톱 메뉴 (md↑) */}
        <div className="hidden items-center gap-4 md:flex lg:gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="body-sm font-medium text-white/85 transition-colors duration-300 hover:text-brand"
            >
              {link.label}
            </Link>
          ))}

          {/* Contact — 강조 pill, 외부 문의 페이지(cineticmotion.com) 새 탭 연결 */}
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="body-sm rounded-full border border-brand bg-transparent px-4 py-1 text-white transition-colors duration-300 hover:bg-brand hover:text-ink"
          >
            Contact
          </a>

          {langToggle}
        </div>

        {/* 모바일 햄버거 (md↓) */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center text-white md:hidden"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-0.5 w-6 -translate-y-1/2 bg-current transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
                open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* 모바일 드로어 (md↓) */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          open ? "mt-2 max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className={`flex flex-col gap-1 rounded-2xl p-4 ${GLASS}`}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-brand"
            >
              {link.label}
            </Link>
          ))}

          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-xl border border-brand px-4 py-3 text-center font-medium text-white transition-colors hover:bg-brand hover:text-ink"
          >
            Contact
          </a>

          <div className="mt-2 flex justify-center">{langToggle}</div>
        </div>
      </div>
    </header>
  );
}
