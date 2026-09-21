'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/constants/site-config';
import { Button } from '@/components/ui/button';
import { getWhatsAppUrl } from '@/lib/utils';
import {
  Compass,
  MessageCircle,
  Menu,
  X,
  QrCode,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [qrisOpen, setQrisOpen] = React.useState(false);

  const waUrl = getWhatsAppUrl(
    siteConfig.contacts.whatsappDkm,
    'Assalamu’alaikum DKM Masjid Baitul Huda, saya ingin bertanya mengenai layanan masjid.'
  );

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/95 backdrop-blur-sm shadow-none">
        {/* Top micro-bar for date & calmness reminder */}
        <div className="hidden border-b border-border/60 bg-surface-subtle py-1.5 px-4 text-xs text-text-secondary sm:block">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-normal text-xs">{siteConfig.motto}</span>
            </div>
            <div className="flex items-center gap-4 text-text-muted">
              <span className="flex items-center gap-1.5">
                <Compass className="h-3 w-3 text-accent-gold" />
                <span className="font-normal text-xs">Arah Kiblat: 294.8° Barat Laut</span>
              </span>
              <span className="text-border">|</span>
              <span className="font-normal text-xs">{siteConfig.address.city}</span>
            </div>
          </div>
        </div>

        {/* Main navigation container */}
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Brand identity with official Logo SVG */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <div className="relative h-9 w-32 sm:h-10 sm:w-40 flex items-center">
              <Image
                src="/logo-baitul-huda.svg"
                alt="Logo Masjid Baitul Huda"
                width={180}
                height={60}
                className="h-8 sm:h-9 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links - STRICTLY ONLY 4 ITEMS */}
          <nav className="hidden md:flex items-center gap-1">
            {siteConfig.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-pastel text-primary'
                      : 'text-text-secondary hover:bg-surface-subtle hover:text-text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA Actions */}
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex text-xs font-medium"
            >
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-3.5 w-3.5 text-primary" />
                <span>Layanan DKM</span>
              </a>
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={() => setQrisOpen(true)}
              className="inline-flex text-xs font-medium"
            >
              <QrCode className="h-3.5 w-3.5 mr-1" />
              <span>Infaq QRIS</span>
            </Button>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-primary md:hidden"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-surface px-4 py-4 md:hidden">
            <nav className="flex flex-col space-y-1">
              {siteConfig.navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-pastel text-primary'
                        : 'text-text-primary hover:bg-surface-subtle'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 pt-3 border-t border-border flex flex-col gap-2">
              <Button asChild variant="outline" size="mobile" className="w-full justify-center">
                <a href={waUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 text-primary mr-1.5" />
                  <span>Hubungi DKM via WhatsApp</span>
                </a>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Global Infaq QRIS Modal Dialog */}
      <Dialog open={qrisOpen} onOpenChange={setQrisOpen}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="font-heading font-semibold text-lg text-text-primary">
              Infaq QRIS Masjid Baitul Huda
            </DialogTitle>
            <DialogDescription className="text-xs text-text-secondary">
              Mendukung seluruh aplikasi perbankan digital & e-wallet nasional (BSI, BCA, Mandiri, GoPay, OVO, ShopeePay).
            </DialogDescription>
          </DialogHeader>

          <div className="my-2 flex flex-col items-center justify-center rounded-xl border border-border bg-surface p-4">
            <div className="flex h-44 w-44 items-center justify-center rounded-lg border border-border bg-white text-primary">
              <QrCode className="h-36 w-36 text-primary" />
            </div>
            <p className="mt-3 text-xs font-semibold text-text-primary">
              NMID: ID1020268899120
            </p>
            <p className="text-[11px] text-text-muted">
              a.n. DKM Masjid Baitul Huda Semarang
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface-subtle p-3 text-left text-xs space-y-1">
            <span className="text-text-muted">Nomor Rekening Resmi:</span>
            <div className="flex justify-between items-center">
              <span className="font-medium text-text-primary">{siteConfig.treasury.bankName}</span>
              <span className="font-mono font-semibold text-primary">{siteConfig.treasury.accountNumber}</span>
            </div>
            <p className="text-[11px] text-text-muted">Seluruh dana tercatat otomatis dalam laporan kas terbuka.</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
