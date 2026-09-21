import * as React from 'react';
import { getPrayerSchedule } from '@/lib/api/kemenag';
import { HeroWelcome } from '@/components/modules/home/hero-welcome';
import { PrayerWidget } from '@/components/modules/prayer-times/prayer-widget';
import { NewsSection } from '@/components/modules/news-board/news-section';
import { VolunteerSection } from '@/components/modules/volunteer/volunteer-section';
import { TreasuryTeaser } from '@/components/modules/treasury/treasury-teaser';

export default async function HomePage() {
  const prayerSchedule = await getPrayerSchedule();

  return (
    <div className="space-y-12 md:space-y-20 pb-16">
      {/* Welcome Screen Hero */}
      <HeroWelcome />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-16 md:space-y-20">
        {/* SECTION A: Integrated Waktu Ibadah Widget */}
        <section id="jadwal-sholat" aria-label="Jadwal Sholat & Waktu Ibadah">
          <PrayerWidget schedule={prayerSchedule} />
        </section>

        {/* SECTION B: Warta & Kabar Jamaah */}
        <section id="warta-jamaah" aria-label="Warta & Kabar Jamaah">
          <NewsSection />
        </section>

        {/* SECTION C: Direktori Relawan Khidmah */}
        <section id="relawan-khidmah" aria-label="Relawan Khidmah">
          <VolunteerSection />
        </section>

        {/* SECTION D: Transparansi Ringkas & Infaq Cepat */}
        <section id="transparansi-teaser" aria-label="Transparansi Kas & Infaq">
          <TreasuryTeaser />
        </section>
      </div>
    </div>
  );
}
