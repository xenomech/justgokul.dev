'use client';
import analytics from '@/lib/analytics';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function CustomAnalytics() {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      analytics.init();
      initialized.current = true;
    }
  }, []);

  return null;
}

export function TrackPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPath = useRef<string>('');

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');

    if (lastTrackedPath.current !== url) {
      analytics.trackPageView();
      lastTrackedPath.current = url;
    }
  }, [pathname, searchParams]);

  return null;
}
