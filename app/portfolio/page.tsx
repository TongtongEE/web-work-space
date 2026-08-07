import ArrowButton from "@/components/ArrowButton";
import Footer from "@/components/Footer";
import LogoMarquee from "@/components/LogoMarquee";
import InstagramFeed from "@/components/portfoliosection/InstagramFeed";
import Reveal from "@/components/Reveal";
import { CONTACT_URL } from "@/lib/links";
import { T } from "@/lib/i18n";

const GUTTER = "px-6 sm:px-10 lg:px-20 xl:px-28";

export default function PortfolioPage() {
  return (
    <>
      <main className="relative overflow-hidden pb-24 pt-36 md:pb-32 md:pt-44">
        {/* 타이틀 — 1280 */}
        <div className={`mx-auto max-w-[1480px] ${GUTTER}`}>
          <Reveal direction="up">
            <h2 className="text-center">
              <T
                ko={
                  <>
                    글로벌 기업부터 공공 및 교육기관까지
                    <br />
                    포스트미와 함께하는 고객사
                  </>
                }
                en={
                  <>
                    From global enterprises to public <br /> and educational institutions
                    the clients who partner with POST ME
                  </>
                }
              />
            </h2>
          </Reveal>
        </div>

        {/* 파트너 로고 무한 롤링 — 1920 (home section3와 동일 컴포넌트) */}
        <div className="mx-auto max-w-[1620px] py-12 md:py-20">
          <LogoMarquee />
        </div>

        {/* 인스타그램 피드 + 문의하기 — 1280 */}
        <div className={`mx-auto max-w-[1280px] ${GUTTER}`}>
          <Reveal direction="up" delay={120}>
            <InstagramFeed />
          </Reveal>

          <Reveal direction="up" className="mt-16 flex justify-center md:mt-20">
            <ArrowButton href={CONTACT_URL} tone="brand" external>
              <T ko="문의하기" en="Contact" />
            </ArrowButton>
          </Reveal>
        </div>
      </main>

      <Footer />
    </>
  );
}
