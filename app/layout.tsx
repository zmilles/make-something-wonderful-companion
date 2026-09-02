import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Make Something Wonderful — A Recorded Companion',
  description: 'Read the words. Hear the moment. A section-by-section companion to Make Something Wonderful.',
  openGraph: {
    title: 'Make Something Wonderful',
    description: 'A recorded companion. Read the words, then hear the moment.',
    type: 'website',
    images: [{ url: '/og.png', width: 1730, height: 909, alt: 'Make Something Wonderful — A recorded companion' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Make Something Wonderful',
    description: 'A recorded companion. Read the words, then hear the moment.',
    images: ['/og.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
