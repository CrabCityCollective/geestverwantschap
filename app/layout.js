import './globals.css';

export const metadata = {
  title: 'Geestverwantschap - Boekenclub',
  description: 'Administratie van de boekenclub: welke boeken zijn gelezen en wat vond iedereen ervan.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
