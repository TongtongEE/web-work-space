import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/lib/i18n";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // output: 'export' 이므로 프리렌더는 항상 KO로 고정하고,
  // 저장된 언어(localStorage/쿠키) 반영은 LanguageProvider가 클라이언트에서 처리한다.
  return (
    <html lang="ko">
      <body>
        <LanguageProvider>
          {/* 전체 페이지 공통 상단 고정 네비게이션 */}
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
