'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/constants/site-config';
import { Button } from '@/components/ui/button';
import {
  Compass,
  Menu,
  X,
  ScanLine,
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
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md transition-colors duration-200 ${
          isScrolled ? 'border-b border-[#ececec]' : 'border-b border-transparent'
        }`}
      >
        {/* Top micro-bar: Left = Arah Kiblat, Right = Kota Semarang */}
        <div className="hidden bg-surface-subtle/70 py-1.5 px-4 text-xs text-text-secondary sm:block">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="flex items-center gap-1.5 text-text-secondary">
              <Compass className="h-3.5 w-3.5 text-accent-gold" />
              <span className="font-normal text-xs">Arah Kiblat: 294.8° Barat Laut</span>
            </div>
            <div className="text-text-muted">
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

          {/* Desktop Navigation Links - STRICTLY ONLY 4 ITEMS, Active = Text Primary Only */}
          <nav className="hidden md:flex items-center gap-6">
            {siteConfig.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-1 text-sm transition-colors ${
                    isActive
                      ? 'text-primary font-medium'
                      : 'text-text-secondary hover:text-text-primary font-normal'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA Action: Scan Infaq Only */}
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => setQrisOpen(true)}
              className="inline-flex text-xs font-medium rounded-lg px-3.5"
            >
              <ScanLine className="h-3.5 w-3.5 mr-1.5" />
              <span>Scan Infaq</span>
            </Button>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-surface-subtle text-text-primary md:hidden"
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
          <div className="bg-white px-4 py-4 md:hidden shadow-none">
            <nav className="flex flex-col space-y-1">
              {siteConfig.navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'text-primary font-medium'
                        : 'text-text-secondary hover:text-text-primary font-normal'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 pt-3 flex flex-col gap-2">
              <Button
                variant="default"
                size="mobile"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setQrisOpen(true);
                }}
                className="w-full justify-center text-xs font-medium rounded-lg"
              >
                <ScanLine className="h-4 w-4 mr-1.5" />
                <span>Scan Infaq</span>
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

          <div className="my-2 flex flex-col items-center justify-center rounded-2xl bg-surface-subtle p-5">
            <div className="flex h-44 w-44 items-center justify-center rounded-xl bg-white text-primary">
              <QrCode className="h-36 w-36 text-primary" />
            </div>
            <p className="mt-3 text-xs font-semibold text-text-primary">
              NMID: ID1020268899120
            </p>
            <p className="text-[11px] text-text-muted">
              a.n. DKM Masjid Baitul Huda Semarang
            </p>
          </div>

          <div className="rounded-xl bg-surface-subtle p-3.5 text-left text-xs space-y-1.5">
            <span className="text-text-muted text-[11px]">Nomor Rekening Resmi:</span>
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
