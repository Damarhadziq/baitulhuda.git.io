'use client';

import * as React from 'react';
import { DailyPrayerSchedule, PrayerItem } from '@/types/prayer';
import { calculateNextPrayer, getPrayerTimesList } from '@/lib/api/kemenag';
import { Badge } from '@/components/ui/badge';
import { Clock, Bell, Sparkles } from 'lucide-react';

interface PrayerBarProps {
  initialSchedule: DailyPrayerSchedule;
}

export function PrayerBar({ initialSchedule }: PrayerBarProps) {
  const [schedule] = React.useState<DailyPrayerSchedule>(initialSchedule);
  const [nextInfo, setNextInfo] = React.useState(() =>
    calculateNextPrayer(initialSchedule)
  );

  // Update countdown every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setNextInfo(calculateNextPrayer(schedule));
    }, 1000);

    return () => clearInterval(timer);
  }, [schedule]);

  const prayerList = getPrayerTimesList(schedule, nextInfo.nextPrayer.key);

  return (
    <div className="w-full rounded-xl border border-border bg-surface p-4 sm:p-5">
      {/* Top Header: Next Prayer info & countdown badge */}
      <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/70">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-pastel text-primary border border-primary/20">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading text-base font-semibold text-text-primary">
                Waktu Sholat Hari Ini
              </h3>
              <Badge variant="gold" className="text-[11px] font-medium">
                {schedule.tanggal}
              </Badge>
            </div>
            <p className="text-xs text-text-secondary">
              Berdasarkan hisab akurat Kemenag RI untuk wilayah Semarang & sekitarnya
            </p>
          </div>
        </div>

        {/* Live Countdown Chip */}
        <div className="flex items-center gap-2 self-start rounded-lg border border-primary/20 bg-primary-pastel px-3 py-1.5 sm:self-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-xs font-medium text-text-secondary">
            Menuju <span className="font-semibold text-primary">{nextInfo.nextPrayer.name}</span>:
          </span>
          <span className="font-mono text-sm font-semibold text-primary tracking-wide">
            {nextInfo.timeRemaining}
          </span>
        </div>
      </div>

      {/* 5-Time Prayer Grid Strip */}
      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
        {prayerList.map((item) => {
          const isNext = item.isNext;

          return (
            <div
              key={item.key}
              className={`flex flex-col items-center justify-center rounded-lg p-3 text-center transition-all ${
                isNext
                  ? 'bg-primary text-white border border-primary font-medium'
                  : 'bg-surface-subtle/70 border border-border text-text-primary hover:bg-surface-subtle'
              }`}
            >
              <span
                className={`text-[11px] font-medium tracking-wide ${
                  isNext ? 'text-primary-pastel font-semibold' : 'text-text-muted'
                }`}
              >
                {item.name}
              </span>
              <span
                className={`my-0.5 font-mono text-base sm:text-lg font-semibold ${
                  isNext ? 'text-white' : 'text-text-primary'
                }`}
              >
                {item.time}
              </span>
              <span
                className={`text-[10px] font-arabic opacity-70 ${
                  isNext ? 'text-white/80' : 'text-text-muted'
                }`}
              >
                {item.arabicName}
              </span>

              {isNext && (
                <span className="mt-1.5 inline-block rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-medium text-white">
                  Berikutnya
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
