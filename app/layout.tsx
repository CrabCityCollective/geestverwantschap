import { cookies } from 'next/headers';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import InlogBeheer from './components/InlogBeheer';
import { INLOG_COOKIE_NAAM } from '../lib/auth';
import './globals.css';

export const metadata: Metadata = {
  title: 'Geestverwantschap - Boekenclub',
  description: 'Administratie van de boekenclub: welke boeken zijn gelezen en wat vond iedereen ervan.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Geestverwantschap',
  },
};

export const viewport: Viewport = {
  themeColor: '#1c1006',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const ingelogd = cookies().get(INLOG_COOKIE_NAAM)?.value === '1';

  return (
    <html lang="nl">
      <body>
        <InlogBeheer ingelogd={ingelogd} />
        {children}
      </body>
    </html>
  );
}
