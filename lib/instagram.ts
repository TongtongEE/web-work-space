/* ============================================================
   인스타그램 피드 데이터 (포트폴리오)
   ------------------------------------------------------------
   SnapWidget 임베드(무료)를 "데이터 피드"로만 사용한다.
   임베드 HTML에는 게시물마다 실제 인스타 링크(data-link) · 이미지(data-src)
   · 캡션(img alt) 이 들어 있어, 이를 파싱해 우리 그리드로 직접 렌더한다.
   → iframe을 쓰지 않으므로 클릭 시 게시물로 바로 이동 / 스타일 자유 / 특정 게시물 숨김 가능.

   ※ 이미지 주소는 인스타 CDN 서명 URL이라 시간이 지나면 만료된다.
     fetch의 revalidate(ISR)로 주기적으로 다시 불러와 항상 신선한 URL을 유지한다.
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
export const HIDDEN_SHORTCODES: string[] = ["DaSEm_EPhcw","DIBcCdZyZap"];

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

/** 인스타 게시물 목록을 가져온다 (실패 시 빈 배열 → 컴포넌트에서 폴백 처리) */
export async function getInstagramPosts(): Promise<InstaPost[]> {
  try {
    const res = await fetch(`https://snapwidget.com/embed/${WIDGET_ID}`, {
      next: { revalidate: 3600 }, // 1시간마다 갱신 (서명 URL 만료 대비)
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PostmeSite/1.0)" },
    });
    if (!res.ok) return [];
    return parsePosts(await res.text());
  } catch {
    return [];
  }
}
