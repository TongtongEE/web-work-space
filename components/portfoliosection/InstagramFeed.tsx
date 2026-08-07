import Image from "next/image";

import {
  getInstagramPosts,
  HIDDEN_SHORTCODES,
  MAX_POSTS,
} from "@/lib/instagram";

/* ============================================================
   PORTFOLIO — 인스타그램 피드 (네이티브 그리드)
   · SnapWidget 임베드를 데이터 소스로만 사용하고, 그리드는 우리가 직접 렌더.
   · 각 셀 = 인스타 게시물로 바로 가는 링크(새 탭).
   · 호버 시 딤 + 캡션 노출. (클릭하면 해당 게시물로 이동)
   · 특정 게시물 숨김: lib/instagram.ts 의 HIDDEN_SHORTCODES 에 shortcode 추가.
   · 데이터를 못 불러오면 프로필로 가는 플레이스홀더 그리드로 폴백.
   ============================================================ */

const PROFILE_URL = "https://www.instagram.com/post___me/";
const PLACEHOLDER_COUNT = 30;

export default async function InstagramFeed() {
  const hidden = new Set(HIDDEN_SHORTCODES);
  const posts = (await getInstagramPosts())
    .filter((p) => !hidden.has(p.id))
    .slice(0, MAX_POSTS);

  // 폴백 — 데이터 로드 실패 시 프로필로 가는 플레이스홀더
  if (posts.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
        {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
          <a
            key={i}
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="포스트미 인스타그램"
            className="block aspect-[4/5] rounded-xl bg-neutral-200/80 transition-colors hover:bg-neutral-300/80"
          />
        ))}
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
      {posts.map((post) => (
        <li key={post.id}>
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              post.caption
                ? post.caption.slice(0, 60)
                : "포스트미 인스타그램 게시물"
            }
            className="group relative block aspect-[4/5] overflow-hidden rounded-xl bg-neutral-200"
          >
            <Image
              src={post.image}
              alt={post.caption || "포스트미 인스타그램 게시물"}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />

            {/* 동영상/릴스 뱃지 */}
            {post.isVideo && (
              <span className="absolute right-2 top-2 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            )}

            {/* 호버 시 딤 + 캡션 */}
            <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/85 via-black/25 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {post.caption && (
                <p className="line-clamp-4 text-sm leading-snug text-white">
                  {post.caption}
                </p>
              )}
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
