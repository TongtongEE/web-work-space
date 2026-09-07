/* ============================================================
   인스타그램 피드 수집 스크립트 (빌드 전 자동 실행)
   ------------------------------------------------------------
   npm run build 시 npm 이 prebuild 로 자동 실행한다. (수동: npm run insta)

   하는 일:
     1) SnapWidget 임베드 HTML 을 받아 게시물(링크·이미지·캡션)을 파싱
     2) 썸네일 이미지를 public/insta/ 로 내려받아 사이트에 내장
     3) public/insta/feed.json 매니페스트 기록 → lib/instagram.ts 가 읽는다

   왜 내려받나:
     인스타 CDN 주소는 서명 URL이라 발급 후 약 4.5일이면 만료(403)된다.
     HTML에 그 주소를 박아두면 배포 4.5일 뒤 사진이 전부 깨진다.
     이미지를 우리 사이트에 내장하면 만료 자체가 없어진다.

   public/insta/ 는 매 빌드마다 새로 만든다(.gitignore 대상).
     → 지워지거나 숨긴 게시물의 낡은 파일이 쌓이지 않는다.
   ============================================================ */

import { readFileSync } from "node:fs";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

/** 숨김 목록 등 피드 설정 (lib/instagram.ts 와 공유) */
const config = JSON.parse(
  readFileSync(path.join(process.cwd(), "lib", "instagram.config.json"), "utf8"),
);
const HIDDEN = new Set(config.hiddenShortcodes);

/** SnapWidget 위젯 ID (임베드 데이터 소스) */
const WIDGET_ID = process.env.NEXT_PUBLIC_SNAPWIDGET_ID ?? "1128367";

/** 이미지가 저장되고 사이트에서 서빙될 위치 */
const OUT_DIR = path.join(process.cwd(), "public", "insta");
const MANIFEST = path.join(OUT_DIR, "feed.json");

/** 동시 다운로드 수 (인스타 CDN 에 과하게 몰리지 않도록 제한) */
const CONCURRENCY = 6;

/** 소스가 죽었을 때 빈 피드로도 빌드를 통과시키는 탈출구 */
const ALLOW_EMPTY = process.env.ALLOW_EMPTY_INSTAGRAM_FEED === "1";

const UA = "Mozilla/5.0 (compatible; PostmeSite/1.0)";

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function attr(block, name) {
  const m = block.match(new RegExp(`${name}="([^"]*)"`));
  return m ? m[1] : "";
}

function parsePosts(html) {
  // 각 게시물은 <a ... class="thumbnail hover-caption" data-link="..."> 블록으로 시작.
  const blocks = html
    .split(/<a\s+/)
    .slice(1)
    .filter((b) => /data-link="https:\/\/www\.instagram\.com\/p\//.test(b));

  const posts = [];
  const seen = new Set();

  for (const b of blocks) {
    const link = attr(b, "data-link");
    const id = link.match(/\/p\/([^/]+)\//)?.[1] ?? "";
    if (!id || seen.has(id)) continue; // data-link이 중복 등장하므로 shortcode로 중복 제거

    // data-src 가 비어 있는 경우가 있어 크기별 후보를 순서대로 확인한다.
    const src = ["data-src", "data-src-large", "data-src-medium", "data-src-small"]
      .map((n) => decodeEntities(attr(b, n)))
      .find(Boolean);
    if (!src) continue;

    seen.add(id);
    posts.push({
      id,
      link,
      src,
      caption: decodeEntities(attr(b, "alt")).trim(),
      isVideo: /post-type\s+video/.test(b),
    });
  }
  return posts;
}

/** URL 경로에서 확장자를 뽑는다 (쿼리스트링 제외, 모르면 .jpg) */
function extOf(url) {
  const ext = path.extname(new URL(url).pathname).toLowerCase();
  return /^\.(jpe?g|png|webp|gif)$/.test(ext) ? ext : ".jpg";
}

/** 이미지 1장을 public/insta/ 로 내려받는다. 실패하면 null. */
async function download(post) {
  const file = `${post.id}${extOf(post.src)}`;
  try {
    const res = await fetch(post.src, { headers: { "User-Agent": UA } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length === 0) throw new Error("빈 응답");

    await writeFile(path.join(OUT_DIR, file), buf);
    return {
      bytes: buf.length,
      entry: {
        id: post.id,
        link: post.link,
        image: `/insta/${file}`, // 사이트 내 경로 (만료 없음)
        caption: post.caption,
        isVideo: post.isVideo,
      },
    };
  } catch (e) {
    console.warn(`  ✗ ${post.id} 다운로드 실패: ${e.message}`);
    return null;
  }
}

/** tasks 를 최대 limit 개씩 동시에 실행한다. */
async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await fn(items[i]);
      }
    }),
  );
  return results;
}

async function main() {
  console.log(`[instagram] SnapWidget(${WIDGET_ID}) 피드 수집 중...`);

  let parsed = [];
  let reason = "";
  try {
    const res = await fetch(`https://snapwidget.com/embed/${WIDGET_ID}`, {
      headers: { "User-Agent": UA },
    });
    if (res.ok) parsed = parsePosts(await res.text());
    else reason = `HTTP ${res.status}`;
  } catch (e) {
    reason = e.message;
  }

  if (parsed.length === 0) {
    const msg =
      `[instagram] 게시물을 가져오지 못했습니다` +
      (reason ? ` (${reason})` : " (파싱 결과 0건 — 임베드 HTML 구조 변경 가능성)");
    // 빈 피드로 배포되면 멀쩡하던 포트폴리오가 회색 플레이스홀더로 덮인다.
    // 빌드를 세워두면 배포 단계가 건너뛰어져 직전 정상 빌드가 그대로 유지된다.
    if (!ALLOW_EMPTY) throw new Error(msg);
    console.warn(`${msg} — ALLOW_EMPTY_INSTAGRAM_FEED=1 이라 빈 피드로 진행합니다.`);
  }

  // 매 빌드마다 폴더를 새로 만든다 → 낡은 파일이 남지 않는다.
  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  // 숨긴 게시물은 내려받지 않는다 → 배포물에 파일 자체가 생기지 않는다.
  const visible = parsed.filter((p) => !HIDDEN.has(p.id));
  const hiddenCount = parsed.length - visible.length;

  console.log(
    `[instagram] 게시물 ${parsed.length}건` +
      (hiddenCount > 0 ? ` (숨김 ${hiddenCount}건 제외)` : "") +
      ` — 이미지 내려받는 중...`,
  );
  const downloaded = (await mapLimit(visible, CONCURRENCY, download)).filter(Boolean);

  if (visible.length > 0 && downloaded.length === 0 && !ALLOW_EMPTY) {
    throw new Error("[instagram] 이미지를 한 장도 내려받지 못했습니다.");
  }

  const bytes = downloaded.reduce((sum, d) => sum + d.bytes, 0);
  const posts = downloaded.map((d) => d.entry);

  await writeFile(
    MANIFEST,
    JSON.stringify({ widgetId: WIDGET_ID, fetchedAt: new Date().toISOString(), posts }, null, 2),
  );

  const failed = visible.length - downloaded.length;
  console.log(
    `[instagram] 완료 — ${downloaded.length}건 저장` +
      (failed > 0 ? ` (${failed}건 실패)` : "") +
      ` · ${(bytes / 1024 / 1024).toFixed(1)}MB → public/insta/`,
  );
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
