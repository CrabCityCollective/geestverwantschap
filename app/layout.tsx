import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
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
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
