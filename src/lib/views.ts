import { headers } from 'next/headers';

export async function getViews(slug: string): Promise<number> {

  try {

    const moddedSlug = `/blog/${slug}`;

    console.log({ moddedSlug });

    const response = await fetch(`https://api.us-west-2.aws.tinybird.co/v0/pipes/views_per_page__custom_pipe.json?pathname=${moddedSlug}`, {
      headers: {
        'Authorization': `Bearer ${process.env.TINYBIRD_API_BEARER_TOKEN}`
      }
    });

    const data = await response.json();

    if (Array.isArray(data.data)) {
      const targetPost = data.data.find(item => item.pathname.split('/').at(-1) === slug);
      if (targetPost) {
        return targetPost.hits;
      }
    }
  } catch (error) {
    console.error(error);
  }

  return 0;
}