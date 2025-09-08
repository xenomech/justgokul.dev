import mixpanel from 'mixpanel-browser';

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
      if (!this.isProduction) {
        console.warn('Analytics already initialized');
      }
      return;
    }

    try {
      this.mixpanel.init(token, {
        debug: !this.isProduction,
        track_pageview: true,
        persistence: 'localStorage',
        batch_requests: true,
        batch_size: 50,
        batch_flush_interval_ms: 10000,
      });

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
        console.warn('Analytics not initialized. Call init() first.');
      }
      return;
    }

    try {
      this.mixpanel.track(event, properties);
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
}

export const analytics = new Analytics();
export default analytics;
