import Link from "next/link";
import type { ReactNode } from "react";

/**
 * 화살표(→) pill 버튼 — 섹션 공용.
 * 호버 시 버튼이 살짝 커지고(scale) 글자·화살표가 우측으로 이동.
 * - tone: dark(기본, 검정) / brand(브랜드 그린) / outline(투명 채우기 + 화이트 스트로크)
 * - external: 외부 링크(새 탭)
 */
export default function ArrowButton({
  href,
  children,
  tone = "dark",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "brand" | "outline";
  external?: boolean;
  className?: string;
}) {
  const toneCls =
    tone === "brand"
      ? "bg-brand text-ink hover:bg-brand/90 shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
      : tone === "outline"
        ? "border border-white/80 text-white hover:bg-white/10"
        : "bg-ink text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]";

  const externalProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      href={href}
      {...externalProps}
      className={`group inline-flex items-center gap-2.5 rounded-full ${toneCls} px-12 py-4 body-sm font-medium transition-transform duration-300 ease-out hover:scale-105 ${className}`}
    >
      <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="transition-transform duration-300 ease-out group-hover:translate-x-2"
      >
        →
      </span>
    </Link>
  );
}
