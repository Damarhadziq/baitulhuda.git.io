import * as React from 'react';
import { getPrayerSchedule } from '@/lib/api/kemenag';
import { siteConfig } from '@/lib/constants/site-config';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PrayerBar } from '@/components/modules/prayer-times/prayer-bar';
import { Compass, Calendar, Info, Volume2 } from 'lucide-react';

export default async function JadwalSholatPage() {
  const schedule = await getPrayerSchedule();

  const fullPrayers = [
    { name: 'Imsak', time: schedule.imsak, desc: 'Waktu menahan diri sebelum fajar bagi yang berpuasa' },
    { name: 'Subuh', time: schedule.subuh, desc: 'Awal waktu sholat fajar, fardhu 2 rakaat' },
    { name: 'Terbit / Syuruq', time: schedule.terbit, desc: 'Batas akhir waktu subuh, dilarang sholat hingga meninggi' },
    { name: 'Dhuha', time: schedule.dhuha, desc: 'Mulai waktu sholat dhuha (kira-kira 20 menit pasca syuruq)' },
    { name: 'Dzuhur', time: schedule.dzuhur, desc: 'Waktu tergelincirnya matahari, fardhu 4 rakaat' },
    { name: 'Ashar', time: schedule.ashar, desc: 'Waktu bayangan sama panjang, fardhu 4 rakaat' },
    { name: 'Maghrib', time: schedule.maghrib, desc: 'Terbenam matahari, awal berbuka puasa, fardhu 3 rakaat' },
    { name: 'Isya\'', time: schedule.isya, desc: 'Hilangnya mega merah, fardhu 4 rakaat dilanjut tarawih/witir' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 space-y-8">
      {/* Header */}
      <div>
        <Badge variant="gold" className="mb-2">
          Hisab Resmi Kemenag RI
        </Badge>
        <h1 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
          Jadwal Sholat & Waktu Ibadah
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Wilayah {siteConfig.address.city}, Jawa Tengah dan sekitarnya (Kordinat Kiblat: 294.8° Barat Laut).
        </p>
      </div>

      {/* Live Prayer Strip */}
      <PrayerBar initialSchedule={schedule} />

      {/* Detail Table Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Rincian Waktu Ibadah Hari Ini</CardTitle>
            <span className="text-xs text-text-muted font-mono">{schedule.tanggal}</span>
          </div>
          <CardDescription>
            Jeda Iqomah di Masjid Baitul Huda: Subuh (15 menit), Dzuhur (10 menit), Ashar (10 menit), Maghrib (7 menit), Isya (10 menit).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
            {fullPrayers.map((p) => (
              <div
                key={p.name}
                className="flex items-center justify-between p-3.5 bg-surface hover:bg-surface-subtle transition-colors"
              >
                <div>
                  <span className="font-medium text-sm text-text-primary">{p.name}</span>
                  <p className="text-xs text-text-muted">{p.desc}</p>
                </div>
                <span className="font-mono text-base font-semibold text-primary">
                  {p.time} WIB
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Kiblat and Iqomah info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-surface p-4 flex items-start gap-3">
          <Compass className="h-5 w-5 text-accent-gold flex-shrink-0 mt-0.5" />
          <div className="text-xs text-text-secondary space-y-1">
            <span className="font-semibold text-text-primary block">Arah Kiblat Akurat</span>
            <p>
              Masjid Baitul Huda telah terkalibrasi oleh Kemenag dengan sudut azimut 294° 48&apos; dari titik utara sejati.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 flex items-start gap-3">
          <Volume2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-xs text-text-secondary space-y-1">
            <span className="font-semibold text-text-primary block">Adzan & Pengingat Masuk Waktu</span>
            <p>
              Sirine dan adzan dikumandangkan tepat waktu dengan sistem sound masjid yang terawat, jernih, dan menenangkan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
