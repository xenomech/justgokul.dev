'use client';
import analytics from '@/lib/analytics';
import { usePathname } from 'next/navigation';
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
  const lastTrackedPath = useRef<string>('');

  useEffect(() => {
    const currentUrl = window.location.href;

    if (lastTrackedPath.current !== currentUrl) {
      analytics.trackPageView();
      lastTrackedPath.current = currentUrl;
    }
  }, [pathname]);

  return null;
}
