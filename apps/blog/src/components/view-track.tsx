'use client';

import { useEffect } from 'react';
import { mutate } from 'swr';

interface ViewTrackerProps {
  slug: string;
  title: string;
}

export function ViewTracker({ slug, title }: ViewTrackerProps) {
  useEffect(() => {
    const key = `page:[${title}]`;

    if (!sessionStorage.getItem(key)) {
      const trackView = async () => {
        try {
          await fetch(`/api/page_views/${slug}`, {
            method: 'POST',
          });
          sessionStorage.setItem(key, JSON.stringify({ visited: true }));

          mutate(`/api/page_views/${slug}`);
        } catch (error) {
          console.error('Failed to track page view:', error);
        }
      };

      trackView();
    }
  }, [slug, title]);

  return null;
}
