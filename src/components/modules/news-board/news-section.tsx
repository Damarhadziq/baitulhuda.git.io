'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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
  Volume2,
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
  const [activeTab, setActiveTab] = React.useState<string>('semua');

  const urgentPost = mockNews.find((n) => n.isUrgent);

  const filteredNews = React.useMemo(() => {
    if (activeTab === 'semua') return mockNews;
    if (activeTab === 'pengumuman') return mockNews.filter((n) => n.category === 'Pengumuman');
    if (activeTab === 'kajian') return mockNews.filter((n) => n.category === 'Kajian');
    if (activeTab === 'lelayu') return mockNews.filter((n) => n.category === 'Kabar Duka (Lelayu)');
    return mockNews;
  }, [activeTab]);

  return (
    <section aria-labelledby="warta-heading" className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h2
            id="warta-heading"
            className="font-heading font-semibold text-xl md:text-2xl text-text-primary tracking-tight"
          >
            Warta & Kabar Jamaah
          </h2>
          <p className="mt-1 text-sm text-text-secondary font-normal">
            Informasi terkini kegiatan taklim, pengumuman warga, dan kabar duka cita kampung.
          </p>
        </div>

        {/* Category Tabs using shadcn Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList>
            <TabsTrigger value="semua">Semua</TabsTrigger>
            <TabsTrigger value="pengumuman">Pengumuman</TabsTrigger>
            <TabsTrigger value="kajian">Kajian</TabsTrigger>
            <TabsTrigger value="lelayu">Kabar Duka</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Urgent Banner (Pinned Post) */}
      {urgentPost && activeTab !== 'kajian' && activeTab !== 'pengumuman' && (
        <div className="rounded-xl border border-primary/20 bg-primary-pastel p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-none">
          <div className="flex items-start sm:items-center gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-white">
              <Volume2 className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                  Pemberitahuan Utama
                </span>
                <span className="text-[11px] text-text-secondary font-normal">
                  {urgentPost.date}
                </span>
              </div>
              <p className="text-sm font-medium text-text-primary mt-0.5">
                {urgentPost.title} ({urgentPost.address})
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedNews(urgentPost)}
            className="self-end sm:self-auto text-xs font-medium border-primary/30 text-primary hover:bg-surface"
          >
            <span>Rincian Warta</span>
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      )}

      {/* Grid of News Cards (3 Columns Desktop, 1 Mobile) */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {filteredNews.map((item) => {
          const isLelayu = item.category === 'Kabar Duka (Lelayu)';

          if (isLelayu) {
            // Specialized Kabar Duka Card
            const waTakziahUrl = getWhatsAppUrl(
              siteConfig.contacts.whatsappDkm,
              `Inna lillahi wa inna ilaihi raji’un. Turut berduka cita atas wafatnya ${item.deceasedName} ${item.binBinti}. Semoga husnul khotimah.`
            );

            return (
              <Card
                key={item.id}
                className="border border-destructive/30 bg-destructive-subtle/30 flex flex-col justify-between"
              >
                <div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="destructive" className="font-medium text-[11px]">
                        Lelayu Warga
                      </Badge>
                      <span className="text-[11px] text-text-muted font-normal">{item.date}</span>
                    </div>
                    <CardTitle className="mt-2 text-base font-semibold leading-snug text-text-primary">
                      {item.deceasedName}
                    </CardTitle>
                    <p className="text-xs font-medium text-text-secondary mt-0.5">
                      {item.binBinti} (Usia {item.age} tahun)
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-2 text-xs text-text-secondary font-normal">
                    <p className="flex items-start gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-destructive flex-shrink-0 mt-0.5" />
                      <span>{item.funeralTime}</span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-destructive flex-shrink-0 mt-0.5" />
                      <span>{item.address}</span>
                    </p>
                  </CardContent>
                </div>

                <div className="p-5 pt-0 border-t border-destructive/20 mt-2 flex items-center justify-between gap-2">
                  {item.mapUrl && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="text-xs font-medium border-border/80 text-text-secondary hover:text-text-primary"
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
                    className="text-xs font-medium border-destructive/30 text-destructive hover:bg-destructive-subtle flex-1 justify-center"
                  >
                    <a href={waTakziahUrl} target="_blank" rel="noopener noreferrer">
                      <Share2 className="h-3 w-3 mr-1" />
                      <span>Kirim Takziah via WA</span>
                    </a>
                  </Button>
                </div>
              </Card>
            );
          }

          // Regular News & Kajian Card
          return (
            <Card key={item.id} className="flex flex-col justify-between">
              <div>
                {/* Thumbnail header */}
                <div className="h-36 w-full rounded-t-xl bg-surface-subtle border-b border-border flex items-center justify-center text-text-muted">
                  <BookOpen className="h-7 w-7 text-primary/40" />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant={item.category === 'Kajian' ? 'default' : 'subtle'} className="font-medium text-[11px]">
                      {item.category}
                    </Badge>
                    <span className="text-[11px] text-text-muted font-normal">{item.date}</span>
                  </div>
                  <CardTitle className="mt-2 text-base font-semibold leading-snug text-text-primary line-clamp-2">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed font-normal">
                    {item.excerpt}
                  </p>
                </CardContent>
              </div>

              <div className="p-5 pt-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedNews(item)}
                  className="w-full justify-between text-xs font-medium text-primary hover:bg-primary-pastel"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </Card>
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
              <div className="rounded-lg border border-border bg-surface-subtle p-3.5 space-y-1.5 text-xs text-text-secondary font-normal">
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

            <div className="pt-2 border-t border-border flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedNews(null)}
                className="text-xs font-medium"
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
