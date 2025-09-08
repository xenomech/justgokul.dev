'use client';
import analytics from '@/lib/analytics';
import { useEffect } from 'react';

export function CustomAnalytics() {
  useEffect(() => {
    analytics.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN as string);
  }, []);

  return null;
}

export function TrackPageView() {
  useEffect(() => {
    analytics.trackPageView();
  }, []);

  return null;
}
