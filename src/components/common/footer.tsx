import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/constants/site-config';
import { MapPin, Phone, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white pb-20 pt-12 md:pb-10 text-sm shadow-none">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand & Address */}
          <div className="space-y-3">
            <div className="relative h-9 w-40">
              <Image
                src="/logo-baitul-huda.svg"
                alt="Logo Masjid Baitul Huda"
                width={180}
                height={60}
                className="h-8 w-auto object-contain"
                priority
              />
            </div>
            <p className="text-xs text-text-secondary max-w-sm leading-relaxed font-normal">
              Pusat ibadah berjamaah, pembinaan keimanan, dan gotong royong warga kampung di Kota Semarang.
            </p>
            <div className="space-y-1 text-xs text-text-muted font-normal pt-1">
              <p className="flex items-start gap-1.5">
                <MapPin className="h-3.5 w-3.5 mt-0.5 text-primary flex-shrink-0" />
                <span>{siteConfig.address.street}, {siteConfig.address.village}, {siteConfig.address.city}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                <span>WhatsApp DKM: {siteConfig.contacts.whatsappDkm}</span>
              </p>
            </div>
          </div>

          {/* Quick Menu (Strict 4 Items, Title Case) */}
          <div className="space-y-3 md:pl-8">
            <h3 className="font-heading text-xs font-semibold text-text-primary tracking-normal">
              Menu Utama
            </h3>
            <ul className="space-y-2 text-xs text-text-secondary font-normal">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/warta" className="hover:text-primary transition-colors">
                  Kegiatan
                </Link>
              </li>
              <li>
                <Link href="/umkm" className="hover:text-primary transition-colors">
                  UMKM Warga Jamaah
                </Link>
              </li>
              <li>
                <Link href="/transparansi-kas" className="hover:text-primary transition-colors">
                  Transparansi Kas
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-primary transition-colors">
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Clean Infaq Bank Account */}
          <div className="space-y-3">
            <h3 className="font-heading text-xs font-semibold text-text-primary tracking-normal">
              Rekening Kas Infaq
            </h3>
            <div className="rounded-xl bg-surface-subtle p-3.5 space-y-1">
              <p className="text-xs text-text-muted font-normal">{siteConfig.treasury.bankName}</p>
              <p className="font-mono text-sm font-semibold text-text-primary">
                {siteConfig.treasury.accountNumber}
              </p>
              <p className="text-[11px] text-text-secondary font-normal">
                a.n. {siteConfig.treasury.accountHolder}
              </p>
            </div>
            <p className="text-[11px] text-text-muted font-normal">
              ID Simas Kemenag: {siteConfig.simasId}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-text-muted font-normal">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Khidmah Untuk Umat.</p>
          <p className="flex items-center gap-1">
            <span>Dikelola dengan ikhlas oleh DKM & Jamaah</span>
            <Heart className="h-3 w-3 text-destructive fill-destructive" />
          </p>
        </div>
      </div>
    </footer>
  );
}
