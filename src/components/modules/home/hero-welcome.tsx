'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Clock, Newspaper } from 'lucide-react';

export function HeroWelcome() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-6 pb-10 md:pt-12 md:pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Big Headline, Concise Description, Taller CTA */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-text-primary leading-[1.12]">
              Ketenangan Ibadah Dan Kebersamaan Warga
            </h1>

            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal max-w-xl">
              Menyediakan ruang ibadah yang bersih, tenang, dan ramah untuk sholat berjamaah serta kegiatan kemaslahatan warga kampung.
            </p>

            {/* Exactly 2 Taller CTA Buttons (No chips above, 1 icon each, no arrow down) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Button
                variant="default"
                size="default"
                onClick={() => scrollToSection('jadwal-sholat')}
                className="h-12 px-6 rounded-lg text-sm font-medium inline-flex items-center"
              >
                <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>Jadwal Sholat Hari Ini</span>
              </Button>

              <Button
                variant="outline"
                size="default"
                onClick={() => scrollToSection('warta-jamaah')}
                className="h-12 px-6 rounded-lg text-sm font-medium inline-flex items-center"
              >
                <Newspaper className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                <span>Warta & Kabar Jamaah</span>
              </Button>
            </div>
          </div>

          {/* Right Column: Mosque Image */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-none" style={{ position: 'relative', isolation: 'isolate' }}>
              <Image
                src="/images/hero-mosque.jpg"
                alt="Masjid Baitul Huda"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
