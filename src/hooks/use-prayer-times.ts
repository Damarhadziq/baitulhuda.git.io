'use client';

import * as React from 'react';
import { DailyPrayerSchedule, PrayerItem } from '@/types/prayer';
import { calculateNextPrayer, getPrayerTimesList } from '@/lib/api/kemenag';

export function usePrayerTimes(initialSchedule?: DailyPrayerSchedule) {
  const [schedule, setSchedule] = React.useState<DailyPrayerSchedule | undefined>(
    initialSchedule
  );
  const [isLoading, setIsLoading] = React.useState(!initialSchedule);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!schedule) {
      setIsLoading(true);
      fetch('/api/sholat')
        .then((res) => res.json())
        .then((data) => {
          if (data.schedule) {
            setSchedule(data.schedule);
          } else {
            setError('Jadwal tidak ditemukan');
          }
        })
        .catch((err) => setError(err.message))
        .finally(() => setIsLoading(false));
    }
  }, [schedule]);

  const nextInfo = React.useMemo(() => {
    if (!schedule) return null;
    return calculateNextPrayer(schedule);
  }, [schedule]);

  const prayerList = React.useMemo(() => {
    if (!schedule) return [];
    return getPrayerTimesList(schedule, nextInfo?.nextPrayer.key);
  }, [schedule, nextInfo]);

  return {
    schedule,
    prayerList,
    nextInfo,
    isLoading,
    error,
  };
}
