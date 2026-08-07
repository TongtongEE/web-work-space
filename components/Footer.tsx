import Link from "next/link";

import { T } from "@/lib/i18n";

/* ============================================================
   전역 푸터
   - cineticmotion.com → 외부 링크(새 탭)
   - 이메일 → mailto (메일 작성)
   ============================================================ */

const GUTTER = "px-6 sm:px-10 lg:px-20 xl:px-28";

/** 하단 정책 링크 (라우트는 추후 연결 — 임시 경로) */
const POLICY_LINKS = [
  { label: { ko: "개인정보 처리방침", en: "Privacy Policy" }, href: "/privacy" },
  { label: { ko: "웹 사이트 이용 약관", en: "Terms of Use" }, href: "/terms" },
  { label: { ko: "법적 고지", en: "Legal Notice" }, href: "/legal" },
] as const;

const SITE_URL = "https://www.cineticmotion.com";
const EMAIL = "info@cineticmotion.com";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#f5f5f5]">
      <div className={`mx-auto max-w-[1920px] ${GUTTER} py-12`}>
        {/* 1행: 저작권 | 정책 링크 (모바일 세로 스택) */}
        <div className="flex flex-col gap-3 text-xs text-ink-soft md:text-sm md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-4">
          <p>
            <T
              ko="Copyright © 2026 cinetic motion Inc. 모든 권리 보유."
              en="Copyright © 2026 cinetic motion Inc. All rights reserved."
            />
          </p>
          {/* 정책 링크(개인정보 처리방침·이용약관·법적 고지) — 페이지 준비 전까지 숨김.
              복구 시 nav의 "hidden" 클래스만 제거하세요. */}
          <nav className="hidden flex-wrap items-center gap-x-4 gap-y-2">
            {POLICY_LINKS.map((link, i) => (
              <span key={link.href} className="flex items-center gap-x-4">
                {i > 0 && (
                  <span aria-hidden="true" className="hidden text-black/20 md:inline">
                    |
                  </span>
                )}
                <Link
                  href={link.href}
                  className="transition-colors hover:text-ink"
                >
                  <T ko={link.label.ko} en={link.label.en} />
                </Link>
              </span>
            ))}
          </nav>
        </div>

        {/* 2행: 회사 정보 (모바일 각 항목 세로 스택, 구분자 숨김) */}
        <div className="mt-8 space-y-2 text-xs text-ink-soft md:text-sm md:space-y-1">
          <p className="flex flex-col gap-1.5 md:flex-row md:flex-wrap md:items-center md:gap-x-3 md:gap-y-1">
            <span>
              <T ko="시네틱모션 주식회사" en="Cinetic Motion Inc." />
            </span>
            <Sep />
            <span>
              <T
                ko="주소: 서울특별시 강남구 테헤란로77길 11-15, 1001호"
                en="Address: 1001, 11-15 Teheran-ro 77-gil, Gangnam-gu, Seoul"
              />
            </span>
            <Sep />
            <span>
              <T ko="전화: 0507-1389-3478" en="Tel: 0507-1389-3478" />
            </span>
            <Sep />
            <a
              href={SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-ink"
            >
              {SITE_URL.replace(/^https?:\/\//, "")}
            </a>
          </p>
          <p className="flex flex-col gap-1.5 md:flex-row md:flex-wrap md:items-center md:gap-x-3 md:gap-y-1">
            <span>
              <T
                ko="사업자등록번호: 581-86-03121"
                en="Business Reg. No.: 581-86-03121"
              />
            </span>
            <Sep />
            <span>
              <T ko="이메일: " en="Email: " />
              <a
                href={`mailto:${EMAIL}`}
                className="underline underline-offset-2 transition-colors hover:text-ink"
              >
                {EMAIL}
              </a>
            </span>
          </p>
        </div>

        {/* 3행: SNS */}
        <div className="mt-10">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="인스타그램"
            className="inline-flex text-ink-soft transition-colors hover:text-ink"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}

/** 정보 구분자 " | " (모바일에선 세로 스택이라 숨김, md↑에서만 표시) */
function Sep() {
  return (
    <span aria-hidden="true" className="hidden text-black/20 md:inline">
      |
    </span>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
