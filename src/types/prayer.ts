export type PrayerKey = 'imsak' | 'subuh' | 'terbit' | 'dhuha' | 'dzuhur' | 'ashar' | 'maghrib' | 'isya';

export interface DailyPrayerSchedule {
  tanggal: string; // e.g., "Senin, 21/09/2026"
  date: string; // "YYYY-MM-DD"
  imsak: string; // "04:12"
  subuh: string; // "04:22"
  terbit: string; // "05:35"
  dhuha: string; // "06:01"
  dzuhur: string; // "11:43"
  ashar: string; // "14:55"
  maghrib: string; // "17:46"
  isya: string; // "18:55"
}

export interface PrayerItem {
  key: PrayerKey;
  name: string; // Indonesian display name e.g. "Subuh"
  arabicName?: string;
  time: string; // "04:22"
  isNext?: boolean;
  isPassed?: boolean;
}

export interface PrayerStatus {
  schedule: DailyPrayerSchedule;
  nextPrayer: PrayerItem;
  currentPrayer?: PrayerItem;
  timeRemaining: string; // e.g. "01:24:10"
  minutesRemaining: number;
}
