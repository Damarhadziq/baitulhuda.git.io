import * as React from 'react';
import Link from 'next/link';
import { getPrayerSchedule } from '@/lib/api/kemenag';
import { siteConfig } from '@/lib/constants/site-config';
import { Button } from '@/components/ui/button';
import { PrayerWidget } from '@/components/modules/prayer-times/prayer-widget';
import { NewsSection } from '@/components/modules/news-board/news-section';
import { VolunteerSection } from '@/components/modules/volunteer/volunteer-section';
import { TreasuryTeaser } from '@/components/modules/treasury/treasury-teaser';
import { Sparkles, ShoppingBag, Wallet, Info } from 'lucide-react';

export default async function HomePage() {
  const prayerSchedule = await getPrayerSchedule();

  return (
    <div className="space-y-12 md:space-y-16 py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12 md:space-y-16">
        {/* SECTION A: Header & Integrated Waktu Ibadah Widget */}
        <section aria-label="Salam & Jadwal Ibadah" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-border pb-6">
            <div className="space-y-1.5 max-w-2xl">
              <span className="text-xs font-medium text-primary tracking-wide">
                Assalamu’alaikum Warahmatullahi Wabarakatuh
              </span>
              <h1 className="font-heading font-semibold text-2xl sm:text-3xl text-text-primary tracking-tight">
                {siteConfig.name}
              </h1>
              <p className="text-sm text-text-secondary leading-relaxed font-normal">
                {siteConfig.tagline}. Pusat ibadah berjamaah, pembinaan umat, serta wadah gotong royong ekonomi warga {siteConfig.address.village}, {siteConfig.address.city}.
              </p>
            </div>

            {/* Quick Portal Navigation Links */}
            <div className="flex flex-wrap items-center gap-2">
              <Button asChild variant="outline" size="sm" className="text-xs font-medium">
                <Link href="/etalase">
                  <ShoppingBag className="h-3.5 w-3.5 mr-1 text-primary" />
                  <span>Etalase & Lumbung</span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="text-xs font-medium">
                <Link href="/transparansi-kas">
                  <Wallet className="h-3.5 w-3.5 mr-1 text-primary" />
                  <span>Transparansi Kas</span>
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="text-xs font-medium text-text-secondary hover:text-text-primary">
                <Link href="/tentang">
                  <Info className="h-3.5 w-3.5 mr-1" />
                  <span>Tentang Kami</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Integrated Waktu Ibadah Widget with Live Clock & Horizontal Strip */}
          <PrayerWidget schedule={prayerSchedule} />
        </section>

        {/* SECTION B: Warta & Kabar Jamaah */}
        <NewsSection />

        {/* SECTION C: Direktori Relawan Khidmah */}
        <VolunteerSection />

        {/* SECTION D: Transparansi Ringkas & Infaq Cepat (Teaser) */}
        <TreasuryTeaser />
      </div>
    </div>
  );
}
