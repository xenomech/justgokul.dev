import mixpanel from 'mixpanel-browser';
import { track } from '@vercel/analytics/react';

class Analytics {
  private mixpanel: typeof mixpanel;
  private initialized: boolean = false;
  private isProduction: boolean;
  private isBrowser: boolean;

  constructor() {
    this.mixpanel = mixpanel;
    this.initialized = false;
    this.isProduction = process.env.NODE_ENV === 'production';
    this.isBrowser = typeof window !== 'undefined';
  }

  init(): void {
    if (!this.isBrowser) {
      console.warn('Analytics init called on server side, skipping');
      return;
    }

    if (this.initialized) {
      console.log('Analytics already initialized');
      return;
    }

    const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
    const apiHost = process.env.NEXT_PUBLIC_MIXPANEL_API_HOST;
    if (!token || !apiHost) {
      console.error('NEXT_PUBLIC_MIXPANEL_TOKEN or NEXT_PUBLIC_MIXPANEL_API_HOST not found');
      return;
    }

    try {
      this.mixpanel.init(token, {
        debug: !this.isProduction,
        track_pageview: false,
        persistence: 'localStorage',
        api_host: apiHost,
      });

      const sessionId = this.getOrCreateSessionId();
      this.mixpanel.register({
        session_id: sessionId,
        blog_name: 'justgokul.dev',
        visitor_type: 'anonymous',
      });
      this.mixpanel.identify(`anonymous_user_${sessionId}`);

      this.initialized = true;
      if (!this.isProduction) {
        console.log('Analytics initialized successfully');
      }
    } catch (error) {
      console.error('Failed to initialize analytics:', error);
    }
  }

  track(event: string, properties?: Record<string, any>): void {
    if (!this.isBrowser) {
      return;
    }

    if (!this.initialized) {
      this.init();
      if (!this.initialized) {
        return;
      }
    }

    try {
      this.mixpanel.track(event, properties);
      track(event, properties);
      if (!this.isProduction) {
        console.log(`Analytics event tracked: ${event}`, properties);
      }
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }

  trackPageView(url?: string, properties?: Record<string, any>): void {
    if (!this.isBrowser) {
      return;
    }

    const currentUrl = url || window.location.href;
    const currentPath = url ? new URL(url).pathname : window.location.pathname;
    const urlParams = new URLSearchParams(url ? new URL(url).search : window.location.search);
    const utmParams: Record<string, string> = {};

    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    utmKeys.forEach(key => {
      const value = urlParams.get(key);
      if (value) {
        utmParams[key] = value;
      }
    });

    const eventProperties = {
      page: currentPath,
      url: currentUrl,
      referrer: document.referrer,
      ...utmParams,
      ...properties,
    };

    this.track('page_view', eventProperties);

    if (!this.isProduction) {
      console.log(`Analytics page view tracked for: ${currentPath}`, eventProperties);
    }
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  private getOrCreateSessionId(): string {
    if (!this.isBrowser) {
      return '';
    }

    try {
      const existingSessionId = localStorage.getItem('blog_session_id');
      const sessionTimestamp = localStorage.getItem('blog_session_timestamp');
      const currentTime = Date.now();
      const sessionTimeout = 30 * 60 * 1000;

      if (
        existingSessionId &&
        sessionTimestamp &&
        currentTime - parseInt(sessionTimestamp) < sessionTimeout
      ) {
        localStorage.setItem('blog_session_timestamp', currentTime.toString());
        return existingSessionId;
      }

      const newSessionId = `session_${currentTime}_${Math.random().toString(36).substring(2, 11)}`;
      localStorage.setItem('blog_session_id', newSessionId);
      localStorage.setItem('blog_session_timestamp', currentTime.toString());
      return newSessionId;
    } catch (error) {
      console.error('Failed to manage session ID:', error);
      return `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    }
  }
}

const analytics = new Analytics();
export default analytics;
