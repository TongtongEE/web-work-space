/* ============================================================
   인스타그램 피드 데이터 (포트폴리오)
   ------------------------------------------------------------
   SnapWidget 임베드(무료)를 "데이터 피드"로만 사용한다.
   임베드 HTML에는 게시물마다 실제 인스타 링크(data-link) · 이미지(data-src)
   · 캡션(img alt) 이 들어 있어, 이를 파싱해 우리 그리드로 직접 렌더한다.
   → iframe을 쓰지 않으므로 클릭 시 게시물로 바로 이동 / 스타일 자유 / 특정 게시물 숨김 가능.

   ※ 이미지 주소는 인스타 CDN 서명 URL이라 발급 후 약 4.5일이면 만료된다(403).
     이 사이트는 next.config.ts 의 output: 'export' 정적 배포라 ISR(revalidate)이
     동작하지 않는다 → 이 fetch는 오직 빌드 시점에 한 번만 실행된다.
     따라서 신선한 URL은 "재빌드"로만 유지되며, .github/workflows/deploy.yml 의
     schedule(매일 재빌드)이 그 역할을 한다. 수동 갱신은 Actions → Run workflow.
   ============================================================ */

export type InstaPost = {
  id: string; // 게시물 shortcode (예: DaSEm_EPhcw)
  link: string; // 인스타 게시물 URL
  image: string; // 썸네일 이미지 URL
  caption: string; // 캡션 (없을 수 있음)
  isVideo: boolean; // 릴스/동영상 여부
};

/** SnapWidget 위젯 ID (임베드 데이터 소스) */
const WIDGET_ID = process.env.NEXT_PUBLIC_SNAPWIDGET_ID ?? "1128367";

/** 피드에서 숨길 게시물 shortcode 목록 (여기에 추가하면 그리드에서 제외) */
export const HIDDEN_SHORTCODES: string[] = ["DaSEm_EPhcw","DIBcCdZyZap","Db48zmqDds8"];

/** 표시할 최대 게시물 수 */
export const MAX_POSTS = 33;

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function attr(block: string, name: string): string {
  const m = block.match(new RegExp(`${name}="([^"]*)"`));
  return m ? m[1] : "";
}

function parsePosts(html: string): InstaPost[] {
  // 각 게시물은 <a ... class="thumbnail hover-caption" data-link="..."> 블록으로 시작.
  const blocks = html
    .split(/<a\s+/)
    .slice(1)
    .filter((b) => /data-link="https:\/\/www\.instagram\.com\/p\//.test(b));

  const posts: InstaPost[] = [];
  const seen = new Set<string>();

  for (const b of blocks) {
    const link = attr(b, "data-link");
    const short = link.match(/\/p\/([^/]+)\//);
    const id = short ? short[1] : "";
    if (!id || seen.has(id)) continue; // data-link이 중복 등장하므로 shortcode로 중복 제거

    const image = decodeEntities(attr(b, "data-src") || attr(b, "data-src-small"));
    if (!image) continue;

    seen.add(id);
    posts.push({
      id,
      link,
      image,
      caption: decodeEntities(attr(b, "alt")).trim(),
      isVideo: /post-type\s+video/.test(b),
    });
  }
  return posts;
}

/**
 * 인스타 게시물 목록을 가져온다 (빌드 시점에 1회 실행).
 *
 * 빌드에서 게시물을 하나도 못 가져오면 기본적으로 빌드를 실패시킨다.
 * 정적 배포라 "빈 피드"로 빌드가 통과하면 그대로 배포되어, 멀쩡히 보이던
 * 포트폴리오가 회색 플레이스홀더로 덮여버리기 때문. 빌드를 세워두면 배포 단계가
 * 건너뛰어져 직전의 정상 빌드가 그대로 유지된다.
 * (소스가 일시적으로 죽었는데 그래도 배포해야 하면 ALLOW_EMPTY_INSTAGRAM_FEED=1)
 */
export async function getInstagramPosts(): Promise<InstaPost[]> {
  let posts: InstaPost[] = [];
  let reason = "";

  try {
    const res = await fetch(`https://snapwidget.com/embed/${WIDGET_ID}`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PostmeSite/1.0)" },
    });
    if (res.ok) posts = parsePosts(await res.text());
    else reason = `HTTP ${res.status}`;
  } catch (e) {
    reason = e instanceof Error ? e.message : String(e);
  }

  if (posts.length > 0) return posts;

  const message =
    `[instagram] SnapWidget(${WIDGET_ID})에서 게시물을 가져오지 못했습니다` +
    (reason ? ` (${reason})` : " (파싱 결과 0건 — 임베드 HTML 구조 변경 가능성)");

  // 개발 중에는 막지 않고 플레이스홀더 폴백으로 계속 진행한다.
  if (process.env.NODE_ENV === "development" || process.env.ALLOW_EMPTY_INSTAGRAM_FEED === "1") {
    console.warn(`${message} — 플레이스홀더로 대체합니다.`);
    return [];
  }

  throw new Error(message);
}
