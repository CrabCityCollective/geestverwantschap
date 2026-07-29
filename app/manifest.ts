import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Geestverwantschap - Boekenclub',
    short_name: 'Geestverwantschap',
    description: 'Administratie van de boekenclub: welke boeken zijn gelezen en wat vond iedereen ervan.',
    start_url: '/',
    display: 'standalone',
    background_color: '#140d06',
    theme_color: '#1c1006',
    icons: [
      { src: '/icon-192', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512', sizes: '512x512', type: 'image/png' },
    ],
  };
}
