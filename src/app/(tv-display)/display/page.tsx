'use client';

import * as React from 'react';
import { DailyPrayerSchedule, PrayerItem } from '@/types/prayer';
import { calculateNextPrayer, getPrayerTimesList } from '@/lib/api/kemenag';
import { siteConfig } from '@/lib/constants/site-config';
import { Sparkles, Clock, Compass } from 'lucide-react';

const fallbackSchedule: DailyPrayerSchedule = {
  tanggal: 'Senin, 21 September 2026',
  date: '2026-09-21',
  imsak: '04:15',
  subuh: '04:25',
  terbit: '05:39',
  dhuha: '06:03',
  dzuhur: '11:45',
  ashar: '14:58',
  maghrib: '17:48',
  isya: '18:57',
};

export default function TvDisplayPage() {
  const [schedule, setSchedule] = React.useState<DailyPrayerSchedule>(fallbackSchedule);
  const [currentTime, setCurrentTime] = React.useState<string>('--:--:--');
  const [currentDateStr, setCurrentDateStr] = React.useState<string>('');
  const [nextInfo, setNextInfo] = React.useState(() =>
    calculateNextPrayer(fallbackSchedule)
  );

  React.useEffect(() => {
    // Fetch live prayer schedule via proxy API
    fetch('/api/sholat')
      .then((res) => res.json())
      .then((data) => {
        if (data?.schedule) {
          setSchedule(data.schedule);
          setNextInfo(calculateNextPrayer(data.schedule));
        }
      })
      .catch(() => {});

    // Clock ticker every second
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
      setCurrentDateStr(
        now.toLocaleDateString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      );
      setNextInfo(calculateNextPrayer(schedule, now));
    }, 1000);

    return () => clearInterval(interval);
  }, [schedule]);

  const prayerList = getPrayerTimesList(schedule, nextInfo.nextPrayer.key);

  return (
    <div className="flex h-screen w-screen flex-col justify-between overflow-hidden bg-background p-8 select-none">
      {/* Top TV Bar */}
      <header className="flex items-center justify-between border-b border-border pb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-white">
            <Sparkles className="h-8 w-8" />
          </div>
          <div>
            <h1 className="font-heading text-3xl font-semibold tracking-tight text-text-primary">
              {siteConfig.name}
            </h1>
            <p className="text-sm font-medium text-text-secondary">
              {siteConfig.address.street}, {siteConfig.address.city} • Arah Kiblat: 294.8°
            </p>
          </div>
        </div>

        {/* Big Live Clock */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="font-mono text-4xl font-semibold tracking-tight text-primary">
              {currentTime}
            </p>
            <p className="text-xs font-medium text-text-secondary">
              {currentDateStr || schedule.tanggal}
            </p>
          </div>
        </div>
      </header>

      {/* Main Countdown Center Banner */}
      <div className="my-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-pastel px-6 py-2 text-sm font-medium text-primary">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span>Menuju Waktu Sholat {nextInfo.nextPrayer.name}</span>
        </div>

        <div className="font-mono text-7xl font-semibold tracking-tight text-text-primary">
          {nextInfo.timeRemaining}
        </div>

        <p className="text-sm text-text-secondary">
          Harap menonaktifkan nada dering ponsel saat berada di ruang sholat utama
        </p>
      </div>

      {/* Large 6-Prayer Grid Cards */}
      <div className="grid grid-cols-6 gap-4">
        {prayerList.map((item) => {
          const isNext = item.isNext;

          return (
            <div
              key={item.key}
              className={`flex flex-col items-center justify-center rounded-xl p-6 text-center border transition-all ${
                isNext
                  ? 'bg-primary text-white border-primary scale-105'
                  : 'bg-surface border-border text-text-primary'
              }`}
            >
              <span
                className={`text-sm font-semibold uppercase tracking-wider ${
                  isNext ? 'text-primary-pastel' : 'text-text-muted'
                }`}
              >
                {item.name}
              </span>
              <span
                className={`my-2 font-mono text-3xl font-semibold ${
                  isNext ? 'text-white' : 'text-text-primary'
                }`}
              >
                {item.time}
              </span>
              <span
                className={`text-sm font-arabic ${
                  isNext ? 'text-white/80' : 'text-text-muted'
                }`}
              >
                {item.arabicName}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom Running News Ticker */}
      <footer className="mt-6 flex items-center gap-4 rounded-xl border border-border bg-surface px-6 py-3 text-xs">
        <span className="flex-shrink-0 rounded-md bg-primary-pastel px-2.5 py-1 font-semibold text-primary">
          WARTA MASJID
        </span>
        <div className="overflow-hidden whitespace-nowrap text-text-secondary">
          <span>
            • Warta Lelayu: Telah berpulang Ibu Hj. Siti Aminah (RT 02), pemakaman pukul 13.30 WIB • Saldo Kas Masjid Pekan Ini: Rp 24.850.000 • Kajian Ahad Pagi Pukul 06.00 WIB bersama Ust. Farhan, Lc. • Lumbung Beras Warga telah terkumpul 185 Kg •
          </span>
        </div>
      </footer>
    </div>
  );
}
