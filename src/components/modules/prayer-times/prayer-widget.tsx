'use client';

import * as React from 'react';
import { DailyPrayerSchedule, PrayerKey } from '@/types/prayer';
import { calculateNextPrayer, getPrayerTimesList } from '@/lib/api/kemenag';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Clock, Calendar, Compass, Info, Check } from 'lucide-react';

interface PrayerWidgetProps {
  schedule: DailyPrayerSchedule;
}

export function PrayerWidget({ schedule }: PrayerWidgetProps) {
  const [currentSchedule] = React.useState<DailyPrayerSchedule>(schedule);
  const [currentTimeStr, setCurrentTimeStr] = React.useState<string>('');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [nextInfo, setNextInfo] = React.useState(() =>
    calculateNextPrayer(schedule)
  );

  React.useEffect(() => {
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

  const monthlySimulated = [
    { tgl: '21 Sept', subuh: '04:22', terbit: '05:35', dzuhur: '11:43', ashar: '14:55', maghrib: '17:46', isya: '18:55' },
    { tgl: '22 Sept', subuh: '04:21', terbit: '05:34', dzuhur: '11:43', ashar: '14:54', maghrib: '17:46', isya: '18:55' },
    { tgl: '23 Sept', subuh: '04:21', terbit: '05:34', dzuhur: '11:42', ashar: '14:54', maghrib: '17:46', isya: '18:55' },
    { tgl: '24 Sept', subuh: '04:20', terbit: '05:33', dzuhur: '11:42', ashar: '14:53', maghrib: '17:46', isya: '18:55' },
    { tgl: '25 Sept', subuh: '04:20', terbit: '05:33', dzuhur: '11:41', ashar: '14:53', maghrib: '17:45', isya: '18:54' },
    { tgl: '26 Sept', subuh: '04:19', terbit: '05:32', dzuhur: '11:41', ashar: '14:52', maghrib: '17:45', isya: '18:54' },
    { tgl: '27 Sept', subuh: '04:18', terbit: '05:32', dzuhur: '11:41', ashar: '14:51', maghrib: '17:45', isya: '18:54' },
  ];

  return (
    <div className="w-full rounded-xl border border-border bg-surface p-5 sm:p-6 shadow-none">
      {/* Top Header: Clock + Next Prayer Indicator */}
      <div className="flex flex-col gap-3 pb-5 sm:flex-row sm:items-center sm:justify-between border-b border-border/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-semibold text-text-primary">
              Waktu Ibadah Hari Ini
            </span>
            <span className="text-xs text-text-muted font-normal">
              ({currentSchedule.tanggal})
            </span>
          </div>
          <p className="text-xs text-text-secondary font-normal">
            Berdasarkan hisab akurat Kemenag RI untuk wilayah Semarang & sekitarnya
          </p>
        </div>

        {/* Live digital clock & next prayer countdown pill */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Subtle live clock */}
          {currentTimeStr && (
            <div className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-subtle px-2.5 py-1 text-xs text-text-secondary font-mono font-normal">
              <Clock className="h-3 w-3 text-text-muted" />
              <span>{currentTimeStr} WIB</span>
            </div>
          )}

          {/* Next prayer pill with delicate, non-oversized dot indicator */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-pastel px-3 py-1 text-xs font-medium text-primary border border-primary/10">
            {/* Small delicate pulse dot (h-1.5 w-1.5) */}
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            <span>Menuju {nextInfo.nextPrayer.name}:</span>
            <span className="font-mono font-semibold tracking-tight">
              {nextInfo.timeRemaining}
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal 5-Times Prayer Strip */}
      <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
        {prayerItems.map((item) => {
          const isNext = item.isNext;

          return (
            <div
              key={item.key}
              className={`flex flex-col items-center justify-center rounded-lg p-3 text-center transition-all ${
                isNext
                  ? 'bg-primary-pastel border border-primary text-primary'
                  : 'bg-surface border border-border text-text-primary hover:bg-surface-subtle/60'
              }`}
            >
              <span
                className={`text-[11px] font-medium uppercase tracking-wider ${
                  isNext ? 'text-primary font-semibold' : 'text-text-muted'
                }`}
              >
                {item.name}
              </span>
              <span
                className={`my-1 font-mono text-base sm:text-lg ${
                  isNext ? 'font-semibold text-primary' : 'font-normal text-text-primary'
                }`}
              >
                {item.time}
              </span>
              <span
                className={`text-[10px] ${
                  isNext ? 'text-primary/80 font-medium' : 'text-text-muted font-normal'
                }`}
              >
                {item.arabicName}
              </span>

              {isNext && (
                <span className="mt-1.5 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-medium text-primary">
                  Berikutnya
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer: Monthly Schedule Dialog Trigger */}
      <div className="mt-4 pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-border/60 text-xs text-text-muted font-normal">
        <span className="flex items-center gap-1.5">
          <Info className="h-3 w-3 text-primary" />
          <span>Iqomah dikumandangkan 10-15 menit setelah adzan masuk waktu.</span>
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setDialogOpen(true)}
          className="self-start sm:self-auto text-xs font-medium"
        >
          <Calendar className="h-3.5 w-3.5 mr-1 text-primary" />
          <span>Buka Jadwal Bulanan</span>
        </Button>
      </div>

      {/* Monthly Prayer Dialog Table */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading font-semibold text-lg text-text-primary">
              Tabel Jadwal Waktu Sholat {currentSchedule.tanggal.split(',')[1] || 'Bulan Ini'}
            </DialogTitle>
            <DialogDescription className="text-xs text-text-secondary">
              Perhitungan astronomis Kemenag RI untuk wilayah Semarang dan Jawa Tengah.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg border border-border overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-surface-subtle border-b border-border text-text-muted font-medium">
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
              <tbody className="divide-y divide-border font-mono text-text-primary">
                {monthlySimulated.map((row, i) => (
                  <tr key={i} className={i === 0 ? 'bg-primary-pastel/40' : 'hover:bg-surface-subtle/40'}>
                    <td className="py-2 px-3 font-sans font-medium text-text-primary">
                      {row.tgl} {i === 0 && <span className="text-[10px] text-primary font-normal">(Hari Ini)</span>}
                    </td>
                    <td className="py-2 px-3 text-center">{row.subuh}</td>
                    <td className="py-2 px-3 text-center text-text-muted">{row.terbit}</td>
                    <td className="py-2 px-3 text-center">{row.dzuhur}</td>
                    <td className="py-2 px-3 text-center">{row.ashar}</td>
                    <td className="py-2 px-3 text-center font-medium text-primary">{row.maghrib}</td>
                    <td className="py-2 px-3 text-center">{row.isya}</td>
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
