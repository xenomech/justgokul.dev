import mixpanel from 'mixpanel-browser';
import { track } from '@vercel/analytics/react';

class Analytics {
  private mixpanel: typeof mixpanel;
  private initialized: boolean = false;
  private isProduction: boolean;

  constructor() {
    this.mixpanel = mixpanel;
    this.initialized = false;
    this.isProduction = process.env.NODE_ENV === 'production';
  }

  init(token: string): void {
    if (this.initialized) {
      console.log('Analytics already initialized');
      return;
    }

    try {
      console.log('Initializing analytics with token:', token, this.isProduction);
      this.mixpanel.init(token, {
        debug: !this.isProduction,
        track_pageview: true,
        persistence: 'localStorage',
        ignore_dnt: false,
        secure_cookie: true,
        cross_site_cookie: false,
        disable_persistence: false,
        opt_out_tracking_by_default: false,
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
      throw error;
    }
  }

  track(event: string, properties?: Record<string, any>): void {
    if (!this.initialized) {
      if (!this.isProduction) {
        console.log('Analytics not initialized. Call init() first.');
      }
      this.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN as string);
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

  trackPageView(properties?: Record<string, any>): void {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams: Record<string, string> = {};

    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    utmKeys.forEach(key => {
      const value = urlParams.get(key);
      if (value) {
        utmParams[key] = value;
      }
    });

    const eventName = `page_view_${window.location.pathname.replace(/\s+/g, '_').toLowerCase()}`;
    const eventProperties = {
      page: window.location.pathname,
      url: window.location.href,
      ...utmParams,
      ...properties,
    };

    this.track(eventName, eventProperties);

    if (!this.isProduction) {
      console.log(`Analytics page view tracked: ${eventName}`, eventProperties);
    }
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  private getOrCreateSessionId(): string {
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
  }
}

export const analytics = new Analytics();
export default analytics;
