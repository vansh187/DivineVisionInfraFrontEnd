import type { Metadata } from 'next';
import { Merriweather, Open_Sans } from 'next/font/google';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import './globals.css';

const merriweather = Merriweather({
  variable: '--font-merriweather',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Divine Vision Infratech — Townships Along the NH-1 Corridor',
  description:
    'Divine Vision Infratech — spaces for your happiness and safety. Townships along the NH-1 corridor from Delhi to Kurukshetra. RERA & DDJAY approved. Est. 2005.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${merriweather.variable} ${openSans.variable}`}>
      <body className="bg-bg text-ink font-sans antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
