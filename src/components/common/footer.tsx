import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/constants/site-config';
import { MapPin, Phone, Mail, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#FAFCFA] pb-20 pt-14 md:pb-12 text-sm shadow-none">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand and identity with official Logo */}
          <div className="md:col-span-2 space-y-3">
            <div className="relative h-10 w-44">
              <Image
                src="/logo-baitul-huda.svg"
                alt="Logo Masjid Baitul Huda"
                width={190}
                height={65}
                className="h-9 w-auto object-contain"
                priority
              />
            </div>
            <p className="text-sm text-text-secondary max-w-md leading-relaxed font-normal">
              {siteConfig.motto}. Wadah kebersamaan, ibadah berjamaah, penguatan
              ekonomi warga, serta transparansi amanah infaq dan sedekah.
            </p>
            <div className="space-y-1.5 pt-1 text-xs text-text-muted font-normal">
              <p className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 mt-0.5 text-primary flex-shrink-0" />
                <span>
                  {siteConfig.address.street}, {siteConfig.address.village},{' '}
                  {siteConfig.address.city}, Jawa Tengah
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                <span>WhatsApp DKM: {siteConfig.contacts.whatsappDkm}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                <span>Email: {siteConfig.contacts.email}</span>
              </p>
            </div>
          </div>

          {/* Navigasi Cepat (Strict 4 Items) */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-text-primary">
              Menu Utama
            </h4>
            <ul className="space-y-2 text-sm text-text-secondary font-normal">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Beranda
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

          {/* Rekening Infaq */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-text-primary">
              Rekening Kas Infaq
            </h4>
            <div className="rounded-2xl bg-surface-subtle p-4 space-y-1">
              <p className="text-xs text-text-muted font-normal">{siteConfig.treasury.bankName}</p>
              <p className="font-mono text-sm font-semibold text-text-primary">
                {siteConfig.treasury.accountNumber}
              </p>
              <p className="text-[11px] text-text-secondary font-normal">
                a.n {siteConfig.treasury.accountHolder}
              </p>
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed font-normal">
              Nomor ID Simas Kemenag: {siteConfig.simasId}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted font-normal">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Khidmah untuk umat.</p>
          <p className="flex items-center gap-1">
            <span>Dikelola dengan ikhlas oleh DKM & Jamaah</span>
            <Heart className="h-3 w-3 text-destructive fill-destructive" />
          </p>
        </div>
      </div>
    </footer>
  );
}
