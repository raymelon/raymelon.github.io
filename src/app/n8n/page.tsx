import BlurFade from "@/components/magicui/blur-fade";
import { N8nGrid } from "@/components/n8n-grid";

export const metadata = {
  title: "N8n Automations Showcase",
  description: "Showcase of n8n automation demos",
};

const BLUR_FADE_DELAY = 0.04;

export default function N8nPage() {
  return (
    <section className="max-w-6xl mx-auto py-10 sm:py-20 px-6">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">n8n automations showcase</h1>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <N8nGrid />
      </BlurFade>
    </section>
  )
}