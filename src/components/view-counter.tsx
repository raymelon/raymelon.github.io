import { getViews } from '@/lib/views';

export async function ViewCounter({ slug }: { slug: string }) {
  const views = await getViews(slug);

  if (views <= 0) {
    return <p></p>;
  } else if (views === 1) {
    return <p>{views} view</p>;
  } else {
    return <p>{views} views</p>;
  }
}
