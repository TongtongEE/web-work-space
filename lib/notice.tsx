"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/* ============================================================
   상단 공지 배너 — 관리자 설정
   ------------------------------------------------------------
   ▼ 아래 NOTICE 값만 고치면 됩니다. (수정 후 재배포)

   · enabled     : true = 배너 노출 / false = 완전히 숨김(DOM에도 없음)
   · id          : 공지 내용을 새로 쓸 때마다 값을 바꿔주세요.
                   → 이전 공지를 [X]로 닫았던 방문자에게도 새 공지가 다시 보입니다.
   · text        : 흐르는 문구 (ko = 한국어 / en = 영어)
   · href        : 배너를 클릭했을 때 이동할 랜딩 페이지 주소.
                   ┌ 공란("") → 링크 없이 공지 문구만 표시 (클릭 불가)
                   ├ "/product"                → 사이트 내부 페이지 (같은 탭 이동)
                   ├ "/product#ai"             → 내부 페이지의 특정 섹션으로 바로 이동
                   │                             (#ai = POST ME AI 이미지 생성 섹션)
                   └ "https://example.com/..." → 외부 페이지 (새 탭으로 열림)
   · height      : 배너 높이 px (기본 50 — 1920 x 50 기준)
   · durationSec : 문구가 화면을 한 번 가로지르는 시간(초). 작을수록 빠름.
   · repeat      : 문구를 몇 번 이어 붙일지 (와이드 화면에서 빈 공간이 생기면 늘리세요)
   ============================================================ */
type NoticeConfig = {
  enabled: boolean;
  id: string;
  text: { ko: string; en: string };
  href: string;
  height: number;
  durationSec: number;
  repeat: number;
};

export const NOTICE: NoticeConfig = {
  enabled: true,
  id: "2026-08-notice",
  text: {
    ko: "POST ME AI 이미지 생성 서비스를 출시하였습니다! 자세한 내용은 이곳을 클릭하세요.",
    en: "POST ME AI image generation is now live! Click here to learn more.",
  },
  href: "/product#ai",
  height: 40,
  durationSec: 28,
  repeat: 1,
};

/** 방문자가 닫은 공지를 기억하는 키 (세션 단위 — 브라우저 탭을 닫으면 초기화) */
const DISMISS_KEY = "postme.notice.dismissed";

type NoticeContextValue = {
  /** 지금 배너가 보이는 상태인지 (관리자 ON + 사용자가 닫지 않음) */
  visible: boolean;
  /** 배너 높이 px — 네비게이션 바가 이만큼 아래로 내려감 */
  height: number;
  /** [X] 버튼 — 배너 닫기 */
  close: () => void;
};

const NoticeContext = createContext<NoticeContextValue | null>(null);

/* ---------- 닫힘 상태 스토어 (useSyncExternalStore용 외부 저장소) ----------
   lib/i18n.tsx 의 언어 스토어와 같은 방식.
   output: 'export'(정적 배포)라 프리렌더 HTML은 항상 "열린 상태"로 만들어지고,
   닫았던 기록(sessionStorage)은 하이드레이션 직후 클라이언트에서만 반영된다. */
let dismissedCache: boolean | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): boolean {
  if (dismissedCache === null) {
    try {
      dismissedCache =
        window.sessionStorage.getItem(DISMISS_KEY) === NOTICE.id;
    } catch {
      // 사파리 프라이빗 모드 등 storage 접근 차단 → 그냥 계속 노출
      dismissedCache = false;
    }
  }
  return dismissedCache;
}

/** 서버·하이드레이션 시점 값 — 프리렌더 HTML과 일치해야 한다 */
function getServerSnapshot(): boolean {
  return false;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function dismissNotice() {
  if (dismissedCache === true) return;
  dismissedCache = true;
  try {
    window.sessionStorage.setItem(DISMISS_KEY, NOTICE.id);
  } catch {
    // 저장 실패해도 현재 화면에서는 닫힌 상태 유지
  }
  listeners.forEach((l) => l());
}

/**
 * 공지 배너 상태 제공자.
 * 배너 자신(NoticeBanner)과 네비게이션 바(Navbar)가 같은 상태를 봐야 하므로 컨텍스트로 공유한다.
 */
export function NoticeProvider({ children }: { children: ReactNode }) {
  const dismissed = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const close = useCallback(() => dismissNotice(), []);

  const visible = NOTICE.enabled && !dismissed;

  const value = useMemo(
    () => ({ visible, height: NOTICE.height, close }),
    [visible, close],
  );

  return (
    <NoticeContext.Provider value={value}>{children}</NoticeContext.Provider>
  );
}

export function useNotice(): NoticeContextValue {
  const ctx = useContext(NoticeContext);
  if (!ctx) {
    throw new Error("useNotice must be used within <NoticeProvider>");
  }
  return ctx;
}
