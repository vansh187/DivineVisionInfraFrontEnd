import type { Metadata } from 'next';
import { Fraunces, Bricolage_Grotesque, IBM_Plex_Mono } from 'next/font/google';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import './globals.css';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
});

const plexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Divine Vision Infratech — Townships Along the NH-1 Corridor',
  description:
    'Divine Vision Infratech — ultra-luxury townships along the NH-1 corridor from Delhi to Kurukshetra. RERA & DDJAY approved. Est. 2005.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${bricolage.variable} ${plexMono.variable}`}
    >
      <body className="bg-obsidian text-ivory font-sans antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
