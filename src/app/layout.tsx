import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nils sin test',
  description: 'Første Next.js-side',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}