export interface AnalyticsConfig {
  baidu?: {
    trackingId: string;
    enabled: boolean;
  };
  google?: {
    trackingId: string;
    enabled: boolean;
  };
  clarity?: {
    trackingId: string;
    enabled: boolean;
  };
}

export const analyticsConfig: AnalyticsConfig = {
  baidu: {
    trackingId: 'd8e8ecf669c47dc2512d3f1417e761f9',
    enabled: true
  },
  google: {
    trackingId: 'G-ST044Q6YQN',
    enabled: true
  },
  clarity: {
    trackingId: 'piwq6ck464',
    enabled: true
  }
  // umami: {
  //   websiteId: 'xxxxx-xxxxx-xxxxx',
  //   src: 'https://analytics.example.com/script.js',
  //   enabled: false
  // }
}; 