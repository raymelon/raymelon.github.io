
import BlurFade from "@/components/magicui/blur-fade";
import { PortfolioGrid } from "@/components/portfolio-grid";

export const metadata = {
  title: "Portfolio",
  description: "Portfolio showcase",
};

const BLUR_FADE_DELAY = 0.04;

export default function PortfolioPage() {
  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">portfolio</h1>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <PortfolioGrid />
      </BlurFade>
    </section>
  );
}
