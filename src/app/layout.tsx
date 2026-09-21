import type { Metadata, Viewport } from 'next';
import { Commissioner, Inter } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/constants/site-config';

// 1. Header Font: Commissioner (max weight 600 - NO BOLD ALLOWED)
const commissioner = Commissioner({
  subsets: ['latin'],
  variable: '--font-commissioner',
  display: 'swap',
  weight: ['400', '500', '600'],
});

// 2. Body Font: Inter (weight 400, 500, 600)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.motto}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `${siteConfig.tagline}. ${siteConfig.address.street}, ${siteConfig.address.village}, ${siteConfig.address.city}. Jadwal sholat akurat, papan warta warga, lelayu, transparansi kas, dan lumbung pangan UMKM.`,
  icons: {
    icon: '/logo-baitul-huda.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#2D6A4F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${commissioner.variable} ${inter.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-background font-sans text-text-primary selection:bg-primary-pastel selection:text-primary">
        {children}
      </body>
    </html>
  );
}
