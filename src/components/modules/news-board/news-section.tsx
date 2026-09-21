'use client';

import * as React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { siteConfig } from '@/lib/constants/site-config';
import { getWhatsAppUrl } from '@/lib/utils';
import {
  Calendar,
  Share2,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Info,
} from 'lucide-react';

interface NewsItemData {
  id: string;
  title: string;
  category: 'Pengumuman' | 'Kajian' | 'Kabar Duka (Lelayu)';
  date: string;
  excerpt: string;
  content: string;
  isUrgent?: boolean;
  // Specific for lelayu
  deceasedName?: string;
  binBinti?: string;
  age?: number;
  funeralTime?: string;
  address?: string;
  mapUrl?: string;
}

const mockNews: NewsItemData[] = [
  {
    id: 'duka-1',
    title: 'Kabar Duka: Telah Berpulang Ibu Hj. Siti Aminah',
    category: 'Kabar Duka (Lelayu)',
    date: 'Hari ini, 07:30 WIB',
    excerpt: 'Inna lillahi wa inna ilaihi raji’un. Warga RT 02 / RW 02 berpulang ke Rahmatullah.',
    content: 'Telah berpulang ke Rahmatullah, Ibu Hj. Siti Aminah binti K.H. Syarif dalam usia 68 tahun. Jenazah saat ini disemayamkan di rumah duka RT 02 / RW 02. Sholat jenazah akan diselenggarakan berjamaah di Masjid Baitul Huda ba’da Sholat Dzuhur. Pemakaman akan diberangkatkan menuju TPU Kampung Asri pukul 13.30 WIB.',
    isUrgent: true,
    deceasedName: 'Ibu Hj. Siti Aminah',
    binBinti: 'binti K.H. Syarif',
    age: 68,
    funeralTime: 'Hari ini, Ba’da Dzuhur (Pemakaman 13.30 WIB)',
    address: 'Jl. Huda Melati No. 12, RT 02 / RW 02',
    mapUrl: 'https://maps.google.com/?q=-6.9932,110.4203',
  },
  {
    id: 'kajian-1',
    title: 'Kajian Ahad Pagi: Menata Hati & Keberkahan Perniagaan',
    category: 'Kajian',
    date: 'Ahad, 27 September 2026',
    excerpt: 'Pembahasan Fiqih Muamalah bersama Ust. Ir. H. Ahmad Ridwan, M.Ag. Terbuka untuk umum.',
    content: 'Kajian Ahad Pagi edisi akhir bulan September akan membedah prinsip perniagaan yang bersih, halal, dan bebas dari syubhat. Diselenggarakan di Ruang Utama Masjid Baitul Huda mulai pukul 06.00 hingga 07.30 WIB, dilanjutkan sarapan bubur bersama jamaah. Disediakan modul materi gratis dan sesi tanya jawab interaktif.',
  },
  {
    id: 'umum-1',
    title: 'Kerja Bakti Kebersihan Sanitasi & Perapihan Karpet Masjid',
    category: 'Pengumuman',
    date: 'Sabtu, 26 September 2026',
    excerpt: 'Gotong royong pembersihan area wudhu, filter air, dan vakum karpet bersama Remaja Masjid.',
    content: 'Dalam rangka menjaga kenyamanan dan aroma harum masjid, DKM mengundang seluruh bapak-bapak dan pemuda RT 01-04 untuk hadir pada kerja bakti berkala. Dimulai pukul 07.00 WIB. DKM menyediakan konsumsi dan peralatan cuci. Mari kita jaga rumah Allah agar tetap bersih dan menenangkan bagi seluruh jamaah.',
  },
  {
    id: 'kajian-2',
    title: 'Bimbingan Tahsin & Tajwid Al-Qur’an Khusus Dewasa',
    category: 'Kajian',
    date: 'Setiap Selasa Malam',
    excerpt: 'Kelas tartil Al-Qur’an ba’da Maghrib dibimbing oleh Ustadz Farhan, Lc. Gratis tanpa biaya.',
    content: 'Kelas pembinaan bacaan Al-Qur’an terbuka bagi jamaah yang ingin memperlancar makharijul huruf dan tajwid. Metode praktis talaqqi langsung satu per satu setiap Selasa malam antara waktu Maghrib dan Isya.',
  },
];

export function NewsSection() {
  const [selectedNews, setSelectedNews] = React.useState<NewsItemData | null>(null);

  return (
    <section id="warta-jamaah" aria-labelledby="warta-heading" className="space-y-6">
      {/* Header Section without filter tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h2
            id="warta-heading"
            className="font-heading font-semibold text-xl md:text-2xl text-text-primary tracking-tight"
          >
            Warta & Agenda Mingguan
          </h2>
          <p className="mt-1 text-sm text-text-secondary font-normal">
            Informasi kegiatan taklim, pengumuman gotong royong, dan kabar duka cita sepekan ini.
          </p>
        </div>
      </div>

      {/* Grid of News Cards (3 Columns Desktop, 1 Mobile) - Directly without urgent banner */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {mockNews.map((item) => {
          const isLelayu = item.category === 'Kabar Duka (Lelayu)';

          if (isLelayu) {
            // Specialized Kabar Duka Card: Dark background image, bottom-aligned text
            const waTakziahUrl = getWhatsAppUrl(
              siteConfig.contacts.whatsappDkm,
              `Inna lillahi wa inna ilaihi raji’un. Turut berduka cita atas wafatnya ${item.deceasedName} ${item.binBinti}. Semoga husnul khotimah.`
            );

            return (
              <div
                key={item.id}
                onClick={() => setSelectedNews(item)}
                className="relative overflow-hidden rounded-2xl flex flex-col justify-end p-5 min-h-[340px] text-white cursor-pointer group shadow-none"
              >
                {/* Dark Atmospheric Background Image */}
                <Image
                  src="/images/kabar-duka-bg.jpg"
                  alt="Latar Kabar Duka"
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                {/* Dark Vignette Overlay for High Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/40 z-0" />

                {/* Bottom Aligned Content */}
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="destructive" className="font-medium text-[11px] rounded-lg bg-destructive text-white">
                      Lelayu Warga
                    </Badge>
                    <span className="text-[11px] text-white/70 font-normal">{item.date}</span>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold leading-snug text-white">
                      {item.deceasedName}
                    </h3>
                    <p className="text-xs font-medium text-white/80 mt-0.5">
                      {item.binBinti} (Usia {item.age} tahun)
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs text-white/85 font-normal">
                    <p className="flex items-start gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-red-300 flex-shrink-0 mt-0.5" />
                      <span>{item.funeralTime}</span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-red-300 flex-shrink-0 mt-0.5" />
                      <span>{item.address}</span>
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                    {item.mapUrl && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="text-xs font-medium text-white hover:bg-white/20 rounded-lg px-3 bg-white/10 border-0"
                      >
                        <a href={item.mapUrl} target="_blank" rel="noopener noreferrer">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>Peta</span>
                        </a>
                      </Button>
                    )}
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="text-xs font-medium text-white hover:bg-white/20 flex-1 justify-center rounded-lg px-3 bg-white/10 border-0"
                    >
                      <a href={waTakziahUrl} target="_blank" rel="noopener noreferrer">
                        <Share2 className="h-3 w-3 mr-1" />
                        <span>Kirim Takziah via WA</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            );
          }

          // Regular News & Kajian Card: Clickable Whole Card, Right-Aligned Button
          return (
            <div
              key={item.id}
              onClick={() => setSelectedNews(item)}
              className="rounded-2xl bg-surface-subtle/70 flex flex-col justify-between overflow-hidden cursor-pointer transition-colors hover:bg-surface-subtle"
            >
              <div>
                {/* Thumbnail header */}
                <div className="h-36 w-full bg-[#EBF0EC] flex items-center justify-center text-text-muted">
                  <BookOpen className="h-7 w-7 text-primary/40" />
                </div>
                <div className="p-5 pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant={item.category === 'Kajian' ? 'default' : 'subtle'} className="font-medium text-[11px] rounded-lg">
                      {item.category}
                    </Badge>
                    <span className="text-[11px] text-text-muted font-normal">{item.date}</span>
                  </div>
                  <h3 className="mt-2 text-base font-semibold leading-snug text-text-primary line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-text-secondary line-clamp-2 leading-relaxed font-normal">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              {/* Right-Aligned "Baca Selengkapnya" with Icon Together */}
              <div className="p-5 pt-2 flex justify-end">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-hover">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* News Detail In-Place Dialog (No Refresh) */}
      <Dialog open={Boolean(selectedNews)} onOpenChange={(open) => !open && setSelectedNews(null)}>
        {selectedNews && (
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  variant={
                    selectedNews.category === 'Kabar Duka (Lelayu)'
                      ? 'destructive'
                      : selectedNews.category === 'Kajian'
                      ? 'default'
                      : 'subtle'
                  }
                >
                  {selectedNews.category}
                </Badge>
                <span className="text-xs text-text-muted font-normal">
                  {selectedNews.date}
                </span>
              </div>
              <DialogTitle className="font-heading font-semibold text-xl text-text-primary leading-snug">
                {selectedNews.title}
              </DialogTitle>
            </DialogHeader>

            {selectedNews.category === 'Kabar Duka (Lelayu)' && (
              <div className="rounded-2xl bg-surface-subtle p-4 space-y-1.5 text-xs text-text-secondary font-normal">
                <p>
                  <strong className="font-semibold text-text-primary">Nama Almarhum/ah:</strong> {selectedNews.deceasedName} {selectedNews.binBinti}
                </p>
                <p>
                  <strong className="font-semibold text-text-primary">Waktu Pemakaman:</strong> {selectedNews.funeralTime}
                </p>
                <p>
                  <strong className="font-semibold text-text-primary">Alamat Rumah Duka:</strong> {selectedNews.address}
                </p>
              </div>
            )}

            <div className="text-sm text-text-secondary leading-relaxed font-normal space-y-3 py-2">
              <p>{selectedNews.content}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedNews(null)}
                className="text-xs font-medium rounded-lg px-4"
              >
                Tutup Warta
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
