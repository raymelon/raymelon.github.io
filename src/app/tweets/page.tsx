import BlurFade from "@/components/magicui/blur-fade";
import { getHighlightTwitterPosts } from "@/data/highlight-tweets";
import Link from "next/link";

export const metadata = {
  title: "Tweets",
  description: "highlight tweets archive",
};

const BLUR_FADE_DELAY = 0.04;

export default async function TweetPage() {
  const tweets = await getHighlightTwitterPosts();
  // @ts-ignore
  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">tweets</h1>
      </BlurFade>
      {tweets
        .sort((a, b) => {
          if (
            new Date(a.created_at) > new Date(b.created_at)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.conversation_id_str}>
            <Link
              className="flex flex-col space-y-1 mb-4"
              href={`https://x.com/${post.tweet_owner}/status/${post.conversation_id_str}`}
            >
              <div className="w-full flex flex-col">
                <p className="tracking-tight">{post.full_text}</p>
                <p className="h-6 text-xs text-muted-foreground">
                  {post.created_at}
                </p>
              </div>
            </Link>
          </BlurFade>
        ))}
    </section>
  );
}
