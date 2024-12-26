'use client';

import Script from 'next/script';
import { analyticsConfig } from '@/config/analytics';
import { useEffect } from 'react';

// Clarity script for lazy loading
const loadClarity = (trackingId: string) => {
  const w = window as any;
  w.clarity = w.clarity || function() {
    (w.clarity.q = w.clarity.q || []).push(arguments);
  };
  const d = document;
  const s = d.createElement('script');
  s.async = true;
  s.src = "https://www.clarity.ms/tag/" + trackingId;
  const firstScript = d.getElementsByTagName('script')[0];
  firstScript?.parentNode?.insertBefore(s, firstScript);
};

export function Analytics() {
  useEffect(() => {
    // Load all analytics after page load
    const loadAnalytics = () => {
      // Load Clarity
      if (analyticsConfig.clarity?.enabled) {
        loadClarity(analyticsConfig.clarity.trackingId);
      }

      // Load Baidu
      if (analyticsConfig.baidu?.enabled) {
        const hm = document.createElement("script");
        hm.src = `https://hm.baidu.com/hm.js?${analyticsConfig.baidu.trackingId}`;
        document.body.appendChild(hm);
      }

      // Load Google Analytics
      if (analyticsConfig.google?.enabled) {
        const ga = document.createElement("script");
        ga.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.google.trackingId}`;
        ga.async = true;
        document.body.appendChild(ga);
        
        interface Window {
          dataLayer: any[];
          gtag: (...args: any[]) => void;
        }
        
        (window as any).dataLayer = (window as any).dataLayer || [];
        function gtag(...args: any[]) {(window as any).dataLayer.push(arguments);}
        (window as any).gtag = gtag;
        gtag('js', new Date());
        gtag('config', analyticsConfig.google.trackingId);
      }
    };

    // Delay analytics loading
    const timer = setTimeout(loadAnalytics, 3000);
    return () => clearTimeout(timer);
  }, []);

  return null;
} 