'use client';

export async function trackPageView(slug: string, title: string): Promise<void> {
  const key = `page:[${title}]`;

  if (!sessionStorage.getItem(key)) {
    try {
      await fetch(`/api/page_views/${slug}`, {
        method: 'POST',
      });

      sessionStorage.setItem(key, JSON.stringify({ visited: true }));
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }
}

export async function getPageViews(slug: string): Promise<number> {
  try {
    const response = await fetch(`/api/page_views/${slug}`);
    const data = await response.json();
    return data.views || 0;
  } catch (error) {
    console.error('Failed to fetch page views:', error);
    return 0;
  }
}
