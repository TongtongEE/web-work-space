import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/lib/i18n";
import { LANG_COOKIE, type Lang } from "@/lib/lang";

export const metadata: Metadata = {
  title: "POST ME",
  description: "POST ME — 크리에이티브 스튜디오",
  // iOS Safari 자동 감지(전화/주소/날짜/이메일)로 인한 DOM 변형 → 하이드레이션 불일치 방지
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 쿠키에서 언어를 읽어 서버 렌더 초기 언어로 사용 (언어 변경은 새로고침으로 반영)
  const saved = (await cookies()).get(LANG_COOKIE)?.value;
  const lang: Lang = saved === "EN" ? "EN" : "KO";

  return (
    <html lang={lang === "EN" ? "en" : "ko"}>
      <body>
        <LanguageProvider initialLang={lang}>
          {/* 전체 페이지 공통 상단 고정 네비게이션 */}
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
