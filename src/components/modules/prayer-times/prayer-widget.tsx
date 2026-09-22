'use client';

import * as React from 'react';
import Image from 'next/image';
import { DailyPrayerSchedule } from '@/types/prayer';
import { calculateNextPrayer, getPrayerTimesList } from '@/lib/api/kemenag';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Clock, Calendar, Info } from 'lucide-react';

interface PrayerWidgetProps {
  schedule: DailyPrayerSchedule;
}

export function PrayerWidget({ schedule }: PrayerWidgetProps) {
  const [currentSchedule] = React.useState<DailyPrayerSchedule>(schedule);
  const [currentTimeStr, setCurrentTimeStr] = React.useState<string>('');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [nextInfo, setNextInfo] = React.useState(() =>
    calculateNextPrayer(schedule)
  );

  React.useEffect(() => {
    setMounted(true);
    const update = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
      setNextInfo(calculateNextPrayer(currentSchedule, now));
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [currentSchedule]);

  const prayerItems = getPrayerTimesList(currentSchedule, nextInfo.nextPrayer.key);

  // Format date with hyphens strictly: e.g. 21-09-2026
  const formattedDateHyphen = currentSchedule.tanggal.replace(/\//g, '-');

  const monthlySimulated = [
    { tgl: '21-09-2026', subuh: '04:22', terbit: '05:35', dzuhur: '11:43', ashar: '14:55', maghrib: '17:46', isya: '18:55' },
    { tgl: '22-09-2026', subuh: '04:21', terbit: '05:34', dzuhur: '11:43', ashar: '14:54', maghrib: '17:46', isya: '18:55' },
    { tgl: '23-09-2026', subuh: '04:21', terbit: '05:34', dzuhur: '11:42', ashar: '14:54', maghrib: '17:46', isya: '18:55' },
    { tgl: '24-09-2026', subuh: '04:20', terbit: '05:33', dzuhur: '11:42', ashar: '14:53', maghrib: '17:46', isya: '18:55' },
    { tgl: '25-09-2026', subuh: '04:20', terbit: '05:33', dzuhur: '11:41', ashar: '14:53', maghrib: '17:45', isya: '18:54' },
    { tgl: '26-09-2026', subuh: '04:19', terbit: '05:32', dzuhur: '11:41', ashar: '14:52', maghrib: '17:45', isya: '18:54' },
    { tgl: '27-09-2026', subuh: '04:18', terbit: '05:32', dzuhur: '11:41', ashar: '14:51', maghrib: '17:45', isya: '18:54' },
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl p-6 sm:p-8 shadow-none" style={{ position: 'relative', isolation: 'isolate' }}>
      {/* Atmospheric Background Image with Deep High-Contrast Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/prayer-bg.jpg"
          alt="Latar Arsitektur Masjid"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Deep emerald-charcoal overlay for pristine readability (zero dark-on-dark text) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#132A1E]/95 via-[#163625]/90 to-[#0F2218]/95 z-0" />
      </div>

      {/* Content Container Directly Over Background */}
      <div className="relative z-10 space-y-6">
        {/* Top Header: Title, Hyphenated Date, Monthly Schedule Button */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg sm:text-xl font-semibold text-white">
                Waktu Ibadah Hari Ini
              </span>
              <span className="rounded-lg bg-white/15 px-2.5 py-0.5 text-xs text-emerald-200 font-mono">
                {formattedDateHyphen}
              </span>
            </div>
            <p className="text-xs text-white/70 font-normal">
              Berdasarkan hisab akurat Kemenag RI untuk wilayah Semarang dan sekitarnya
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setDialogOpen(true)}
            className="self-start sm:self-auto text-xs font-medium rounded-lg px-3.5 bg-white/15 text-white hover:bg-white/25 border-0"
          >
            <Calendar className="h-3.5 w-3.5 mr-1.5 text-emerald-300" />
            <span>Buka Jadwal Bulanan</span>
          </Button>
        </div>

        {/* Eye-Catching Center Spotlight directly on image */}
        <div className="text-center space-y-2.5 pt-2">
          <div className="inline-flex items-center gap-2 rounded-lg bg-white/15 backdrop-blur-sm px-3.5 py-1 text-xs font-medium text-emerald-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>Waktu Sholat Berikutnya: {nextInfo.nextPrayer.name} ({nextInfo.nextPrayer.arabicName})</span>
          </div>

          {/* Prominent Large Time in Center */}
          <div>
            <p className="font-mono text-5xl sm:text-6xl font-semibold text-white tracking-tight">
              {nextInfo.nextPrayer.time} <span className="text-base font-sans font-normal text-emerald-200/80">WIB</span>
            </p>
          </div>

          {/* Live Running Time / Countdown Underneath */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs pt-1">
            <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3.5 py-1 text-emerald-100 font-mono">
              <Clock className="h-3.5 w-3.5 text-emerald-300" />
              <span>Menuju Masuk Waktu: </span>
              <span suppressHydrationWarning className="font-semibold text-white">
                {mounted ? nextInfo.timeRemaining : nextInfo.timeRemaining}
              </span>
              {currentTimeStr && (
                <span suppressHydrationWarning className="text-white/60 text-[11px] ml-1">
                  • Waktu Saat Ini: {currentTimeStr} WIB
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 6-Times Prayer List with Vertical Divider Lines Below Big Time */}
        <div className="rounded-xl bg-white/10 backdrop-blur-md p-1 border border-white/15">
          <div className="grid grid-cols-3 sm:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
            {prayerItems.map((item) => {
              const isNext = item.isNext;

              return (
                <div
                  key={item.key}
                  className={`flex flex-col items-center justify-center p-3 text-center transition-colors ${
                    isNext ? 'bg-white/15 rounded-lg' : ''
                  }`}
                >
                  <span
                    className={`text-xs font-medium tracking-normal ${
                      isNext ? 'text-emerald-300' : 'text-white/70'
                    }`}
                  >
                    {item.name}
                  </span>
                  <span
                    className={`my-1 font-mono text-base sm:text-xl ${
                      isNext ? 'font-semibold text-white' : 'font-medium text-white/95'
                    }`}
                  >
                    {item.time}
                  </span>
                  <span
                    className={`text-[10px] ${
                      isNext ? 'text-emerald-200/90 font-medium' : 'text-white/50 font-normal'
                    }`}
                  >
                    {item.arabicName}
                  </span>

                  {isNext && (
                    <span className="mt-1.5 inline-block rounded-md bg-emerald-400/25 px-2 py-0.5 text-[9px] font-medium text-emerald-200">
                      Berikutnya
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="flex items-center gap-1.5 text-xs text-white/70 font-normal pt-1">
          <Info className="h-3.5 w-3.5 text-emerald-300 flex-shrink-0" />
          <span>Iqomah dikumandangkan 10-15 menit setelah adzan masuk waktu.</span>
        </div>
      </div>

      {/* Monthly Prayer Dialog Table */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading font-semibold text-lg text-text-primary">
              Tabel Jadwal Waktu Sholat {formattedDateHyphen}
            </DialogTitle>
            <DialogDescription className="text-xs text-text-secondary">
              Perhitungan astronomis Kemenag RI untuk wilayah Semarang dan Jawa Tengah.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-2xl bg-surface-subtle/50 p-2 overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-text-muted font-medium">
                <tr>
                  <th className="py-2.5 px-3 text-left">Tanggal</th>
                  <th className="py-2.5 px-3 text-center">Subuh</th>
                  <th className="py-2.5 px-3 text-center">Syuruq</th>
                  <th className="py-2.5 px-3 text-center">Dzuhur</th>
                  <th className="py-2.5 px-3 text-center">Ashar</th>
                  <th className="py-2.5 px-3 text-center">Maghrib</th>
                  <th className="py-2.5 px-3 text-center">Isya</th>
                </tr>
              </thead>
              <tbody className="font-mono text-text-primary">
                {monthlySimulated.map((row, i) => (
                  <tr key={i} className={`rounded-lg transition-colors ${i === 0 ? 'bg-primary-pastel/60' : 'hover:bg-white/80'}`}>
                    <td className="py-2 px-3 font-sans font-medium text-text-primary rounded-l-lg">
                      {row.tgl} {i === 0 && <span className="text-[10px] text-primary font-normal">(Hari Ini)</span>}
                    </td>
                    <td className="py-2 px-3 text-center">{row.subuh}</td>
                    <td className="py-2 px-3 text-center text-text-muted">{row.terbit}</td>
                    <td className="py-2 px-3 text-center">{row.dzuhur}</td>
                    <td className="py-2 px-3 text-center">{row.ashar}</td>
                    <td className="py-2 px-3 text-center font-medium text-primary">{row.maghrib}</td>
                    <td className="py-2 px-3 text-center rounded-r-lg">{row.isya}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-[11px] text-text-muted pt-1 font-normal">
            <span>Arah Kiblat: 294.8° Barat Laut (Azimut Kompas)</span>
            <span className="text-primary font-medium">Waktu Indonesia Barat (WIB)</span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
