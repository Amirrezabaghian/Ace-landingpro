import type { Metadata } from 'next';

import favIconX192 from '@assets/logo/android-chrome-192x192.png';
import favIconX512 from '@assets/logo/android-chrome-512x512.png';
import appFavIcon from '@assets/logo/apple-touch-icon.png';
import favIconX16 from '@assets/logo/favicon-16x16.png';
import favIconX32 from '@assets/logo/favicon-32x32.png';
import favIconX48 from '@assets/logo/favicon-48x48.png';

import './globals.css';

import MainLayout from '@design/layout/MainLayout';
import { GoogleAnalytics } from '@next/third-parties/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Ace Studio - Your creative powerhouse for standout design',
  description: `From 3D design and illustrations to animations, motion graphics, websites, apps, and branding, we craft designs that leave a lasting impression. Whether you’re shaping an idea or redefining your brand, Ace transforms your vision into reality with precision and artistry.\n\nCreativity reimagined. Excellence delivered.`,
  openGraph: {
    title: 'Ace studio – Your creative powerhouse for standout design',
    description: `\nFrom 3D design and illustrations to animations, motion graphics, websites, apps, and branding, we craft designs that leave a lasting impression. Whether you’re shaping an idea or redefining your brand, Ace transforms your vision into reality with precision and artistry.\n\nCreativity reimagined. Excellence delivered.`,
    url: 'https://aceframe.pro',
    siteName: 'Ace studio',
    type: 'website',
    images: [
      {
        url: 'https://aceframe.pro/og/ace-og.png', // Must be an absolute URL
        width: 900,
        height: 675,
      },
    ],
  },
  twitter: {
    creator: '@amirbaqian',
    creatorId: '1722945935037083648',
    site: 'https://aceframe.pro',
    card: 'summary_large_image',
    images: 'https://aceframe.pro/og/ace-twitter-og.png',
    title: 'Ace studio – Your creative powerhouse for standout design',
    description: `From 3D design and illustrations to animations, motion graphics, websites, apps, and branding, we craft designs that leave a lasting impression. Whether you’re shaping an idea or redefining your brand, Ace transforms your vision into reality with precision and artistry.\n\nCreativity reimagined. Excellence delivered.`,
  },
  icons: [
    {
      rel: 'icon',
      type: 'image/x-ico',
      url: '/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '512x512',
      url: favIconX512.src,
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      url: favIconX192.src,
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '48x48',
      url: favIconX48.src,
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: favIconX32.src,
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: favIconX16.src,
    },
    {
      rel: 'apple-touch-icon',
      url: appFavIcon.src,
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <GoogleAnalytics gaId="G-NWK41NREJC" />

      <body className={`${inter.className} overflow-x-hidden antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <MainLayout>{children}</MainLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
