import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { Analytics } from '@/components/analytics';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://hm.baidu.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        
        <link rel="preconnect" href="https://hm.baidu.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        <Analytics />
      </head>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
