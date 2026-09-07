/* ============================================================
   인스타그램 피드 데이터 (포트폴리오)
   ------------------------------------------------------------
   SnapWidget 임베드(무료)를 "데이터 피드"로만 사용한다.
   임베드 HTML에는 게시물마다 실제 인스타 링크 · 이미지 · 캡션이 들어 있어,
   이를 파싱해 우리 그리드로 직접 렌더한다.
   → iframe을 쓰지 않으므로 클릭 시 게시물로 바로 이동 / 스타일 자유 / 특정 게시물 숨김 가능.

   ※ 수집은 이 파일이 아니라 scripts/fetch-instagram.mjs 가 한다.
     빌드 전(prebuild)에 실행되어 이미지를 public/insta/ 로 내려받고,
     public/insta/feed.json 매니페스트를 남긴다. 이 파일은 그걸 읽기만 한다.

     이미지를 내려받는 이유: 인스타 CDN 주소는 서명 URL이라 발급 후 약 4.5일이면
     만료(403)된다. 주소를 HTML에 박아두면 배포 4.5일 뒤 사진이 전부 깨진다.
     사이트에 내장하면 만료가 사라진다.

   ※ 새 게시물은 재빌드 때 자동으로 반영된다.
     .github/workflows/deploy.yml 의 schedule(매일)이 그 역할을 하고,
     즉시 반영하려면 Actions → Run workflow.
   ============================================================ */

import { readFileSync } from "node:fs";
import path from "node:path";

import config from "./instagram.config.json";

export type InstaPost = {
  id: string; // 게시물 shortcode (예: DaSEm_EPhcw)
  link: string; // 인스타 게시물 URL
  image: string; // 사이트 내 이미지 경로 (예: /insta/DaSEm_EPhcw.jpg)
  caption: string; // 캡션 (없을 수 있음)
  isVideo: boolean; // 릴스/동영상 여부
};

/**
 * 피드에서 숨길 게시물 shortcode 목록 — 편집은 lib/instagram.config.json 에서.
 * 수집 스크립트도 같은 파일을 읽으므로, 숨긴 게시물은 이미지도 내려받지 않는다.
 */
export const HIDDEN_SHORTCODES: string[] = config.hiddenShortcodes;

/** 표시할 최대 게시물 수 (편집은 lib/instagram.config.json) */
export const MAX_POSTS = config.maxPosts;

/** prebuild 스크립트가 남기는 매니페스트 */
const MANIFEST = path.join(process.cwd(), "public", "insta", "feed.json");

/**
 * 인스타 게시물 목록을 읽는다 (빌드 시점에 1회 실행).
 *
 * 매니페스트가 없으면 = 수집 스크립트가 아직 안 돌았다는 뜻.
 * next dev 는 prebuild 를 거치지 않으므로 개발 중에는 흔한 상황이라,
 * 안내만 남기고 플레이스홀더 폴백으로 진행한다.
 * 반면 프로덕션 빌드에서 없다면 파이프라인이 깨진 것이므로 빌드를 세운다.
 */
export async function getInstagramPosts(): Promise<InstaPost[]> {
  try {
    const { posts } = JSON.parse(readFileSync(MANIFEST, "utf8")) as { posts: InstaPost[] };
    return posts;
  } catch (e) {
    const message =
      `[instagram] 피드 매니페스트를 읽지 못했습니다 (${MANIFEST}): ` +
      (e instanceof Error ? e.message : String(e));

    if (process.env.NODE_ENV === "development" || process.env.ALLOW_EMPTY_INSTAGRAM_FEED === "1") {
      console.warn(`${message}\n  → 'npm run insta' 로 피드를 먼저 수집하세요. 플레이스홀더로 대체합니다.`);
      return [];
    }

    throw new Error(message);
  }
}
