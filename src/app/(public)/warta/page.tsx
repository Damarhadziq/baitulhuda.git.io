import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/constants/site-config';
import { getWhatsAppUrl } from '@/lib/utils';
import { Volume2, Share2, Calendar, User, MessageSquarePlus } from 'lucide-react';

export default function WartaPage() {
  const waSubmitNews = getWhatsAppUrl(
    siteConfig.contacts.whatsappDkm,
    'Assalamu’alaikum DKM, saya ingin mengirimkan informasi/warta warga untuk dimuat di web masjid.'
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Badge variant="default" className="mb-2">
            Papan Pengumuman Digital
          </Badge>
          <h1 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
            Papan Warta & Kabar Duka (Lelayu)
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Kabar silih asih, silih asuh antar warga Kampung Baitul Huda Asri.
          </p>
        </div>

        <Button asChild variant="pastel" size="sm">
          <a href={waSubmitNews} target="_blank" rel="noopener noreferrer">
            <MessageSquarePlus className="h-4 w-4" />
            <span>Kirim Berita Warga ke DKM</span>
          </a>
        </Button>
      </div>

      {/* Lelayu Urgent Section */}
      <section className="space-y-4">
        <h2 className="font-heading text-lg font-semibold text-destructive flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          <span>Kabar Duka Cita (Lelayu Warga)</span>
        </h2>

        <div className="rounded-xl border border-destructive/25 bg-destructive-subtle/30 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <span className="text-xs font-mono text-destructive">Warta Lelayu No. 04/IX/2026</span>
              <h3 className="font-heading text-xl font-semibold text-text-primary mt-1">
                Telah Berpulang ke Rahmatullah: Ibu Hj. Siti Aminah binti K.H. Syarif (Usia 68 Tahun)
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                Alamat Duka: RT 02 / RW 02, Kampung Huda Asri.
              </p>
            </div>
            <Badge variant="destructive" className="self-start">
              Duka Cita
            </Badge>
          </div>

          <div className="rounded-lg border border-border/80 bg-surface p-4 text-xs text-text-secondary space-y-2">
            <p>
              <strong className="text-text-primary font-semibold">Waktu Wafat:</strong> Senin pagi, 21 September 2026, Pukul 05.15 WIB di kediaman.
            </p>
            <p>
              <strong className="text-text-primary font-semibold">Sholat Jenazah:</strong> Diselenggarakan berjamaah di Masjid Baitul Huda ba&apos;da Sholat Dzuhur.
            </p>
            <p>
              <strong className="text-text-primary font-semibold">Pemakaman:</strong> Diberangkatkan ke TPU Kampung Asri pukul 13.30 WIB.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <span className="text-xs text-text-muted italic">
              &quot;Semoga almarhumah diampuni segala dosanya dan keluarga yang ditinggalkan diberikan ketabahan.&quot;
            </span>
            <Button asChild variant="outline" size="sm" className="border-destructive/30 text-destructive hover:bg-destructive-subtle">
              <a
                href={getWhatsAppUrl(
                  siteConfig.contacts.whatsappDkm,
                  'Inna lillahi wa inna ilaihi raji’un. Turut berduka cita atas wafatnya Ibu Hj. Siti Aminah. Semoga husnul khotimah.'
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Bagikan Takziah ke Grup Warga</span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Regular Warta Cards Grid */}
      <section className="space-y-4">
        <h2 className="font-heading text-lg font-semibold text-text-primary">
          Agenda Kegiatan & Warta Terkini
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="default">Kajian Rutin</Badge>
                <span className="text-xs text-text-muted">Ahad, 27 Sept 2026</span>
              </div>
              <CardTitle className="mt-2">Kajian Tematik Fiqih Muamalah & Perniagaan Berkah</CardTitle>
              <CardDescription>
                Bersama Ustadz Ir. H. Ahmad Ridwan, M.Ag. Terbuka untuk umum jamaah pria dan wanita.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-text-secondary">
              <p>📍 Tempat: Ruang Utama Masjid Baitul Huda</p>
              <p>⏰ Waktu: 08.30 - 10.30 WIB (Disediakan konsumsi dan sarapan pagi bersama)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline">Kebersihan</Badge>
                <span className="text-xs text-text-muted">Sabtu, 26 Sept 2026</span>
              </div>
              <CardTitle className="mt-2">Gotong Royong Perapihan Taman & Area Wudhu</CardTitle>
              <CardDescription>
                Khidmah santai bersama Remaja Masjid dan bapak-bapak warga RT 01-04.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-text-secondary">
              <p>📍 Titik Kumpul: Halaman Selatan Masjid</p>
              <p>⏰ Waktu: 07.00 - Selesai (Bawa peralatan kebersihan masing-masing)</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
