'use client';

import * as React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/lib/constants/site-config';
import { Button } from '@/components/ui/button';
import { getWhatsAppUrl } from '@/lib/utils';
import {
  Clock,
  Newspaper,
  Compass,
  Sparkles,
  HeartHandshake,
  ArrowDown,
  MessageCircle,
} from 'lucide-react';

export function HeroWelcome() {
  const waUrl = getWhatsAppUrl(
    siteConfig.contacts.whatsappDkm,
    'Assalamu’alaikum DKM Masjid Baitul Huda, saya ingin bertanya tentang kegiatan dan layanan masjid.'
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-6 pb-8 md:pt-12 md:pb-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Main Welcome Container with gentle soft wash background */}
        <div className="relative rounded-3xl bg-surface-subtle/70 p-6 sm:p-10 md:p-14 overflow-hidden">
          {/* Subtle decorative ambient blobs */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary-pastel/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-[#FAF3EB]/50 blur-3xl" />

          <div className="relative z-10 max-w-3xl space-y-6">
            {/* Top serene badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-pastel px-3.5 py-1 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span>{siteConfig.motto}</span>
            </div>

            {/* Welcome Heading */}
            <div className="space-y-3">
              <p className="text-xs sm:text-sm font-medium text-primary tracking-wide">
                Assalamu’alaikum Warahmatullahi Wabarakatuh
              </p>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-text-primary leading-[1.15]">
                Selamat Datang di <br />
                <span className="text-primary">{siteConfig.name}</span>
              </h1>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal pt-1 max-w-2xl">
                Oase ibadah berjamaah, ketenangan jiwa, dan kebersamaan warga di jantung {siteConfig.address.village}, {siteConfig.address.city}. Ruang yang senantiasa terbuka untuk ibadah sholat lima waktu, majelis ilmu, dan gotong royong kemanusiaan.
              </p>
            </div>

            {/* Micro feature pills (Not crowded, delicate chips) */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-text-secondary">
              <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs">
                <Compass className="h-3.5 w-3.5 text-accent-gold" />
                <span>Kiblat 294.8° Barat Laut</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span>Fasilitas Bersih & Sejuk</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs">
                <HeartHandshake className="h-3.5 w-3.5 text-primary" />
                <span>Ramah Lansia & Musafir</span>
              </div>
            </div>

            {/* Quick Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Button
                variant="default"
                size="default"
                onClick={() => scrollToSection('jadwal-sholat')}
                className="rounded-full px-5 text-xs sm:text-sm font-medium"
              >
                <Clock className="h-4 w-4 mr-1.5" />
                <span>Jadwal Sholat Hari Ini</span>
                <ArrowDown className="h-3.5 w-3.5 ml-1 opacity-70" />
              </Button>

              <Button
                variant="outline"
                size="default"
                onClick={() => scrollToSection('warta-jamaah')}
                className="rounded-full px-5 text-xs sm:text-sm font-medium"
              >
                <Newspaper className="h-4 w-4 mr-1.5 text-primary" />
                <span>Warta & Kabar Warga</span>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="default"
                className="rounded-full px-4 text-xs sm:text-sm font-medium text-text-secondary hover:text-text-primary"
              >
                <a href={waUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-1.5 text-primary" />
                  <span>Hubungi DKM</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
